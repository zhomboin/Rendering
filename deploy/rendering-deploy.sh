#!/usr/bin/env bash

set -Eeuo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_ENV_FILE="/etc/rendering/rendering-deploy.env"
ENV_FILE="${RENDERING_DEPLOY_ENV:-$DEFAULT_ENV_FILE}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing deployment env file: $ENV_FILE" >&2
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

: "${APP_NAME:?APP_NAME is required}"
: "${APP_USER:?APP_USER is required}"
: "${REPO_DIR:?REPO_DIR is required}"
: "${REMOTE_NAME:=origin}"
: "${BRANCH_NAME:=main}"
: "${NODE_BIN:=/usr/bin/node}"
: "${NPM_BIN:=/usr/bin/npm}"
: "${GIT_BIN:=/usr/bin/git}"
: "${CURL_BIN:=/usr/bin/curl}"
: "${WEB_SERVICE_NAME:=rendering-web.service}"
: "${LOG_DIR:=/var/log/rendering}"
: "${LOCK_DIR:=/var/lock/rendering}"
: "${HEALTHCHECK_URL:=http://127.0.0.1:3000/}"
: "${HEALTHCHECK_RETRIES:=10}"
: "${HEALTHCHECK_DELAY_SECONDS:=3}"
: "${KEEP_LOG_DAYS:=30}"

mkdir -p "$LOG_DIR" "$LOCK_DIR"

RUN_TIMESTAMP="$(date '+%Y%m%d-%H%M%S')"
LOG_FILE="$LOG_DIR/deploy-$RUN_TIMESTAMP.log"
LATEST_LOG="$LOG_DIR/latest.log"
LOCK_FILE="$LOCK_DIR/${APP_NAME}-deploy.lock"

exec > >(tee -a "$LOG_FILE") 2>&1

log() {
  local level="$1"
  shift
  printf '[%s] [%s] %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$level" "$*"
}

fail() {
  log "ERROR" "$*"
  exit 1
}

cleanup() {
  local exit_code=$?
  # flock 会在文件描述符关闭时自动释放锁，此处仅清理锁文件
  rm -f "$LOCK_FILE"
  cp "$LOG_FILE" "$LATEST_LOG" 2>/dev/null || true
  find "$LOG_DIR" -maxdepth 1 -type f -name 'deploy-*.log' -mtime +"$KEEP_LOG_DAYS" -delete 2>/dev/null || true
  if [[ $exit_code -eq 0 ]]; then
    log "INFO" "Deployment finished successfully."
  else
    log "ERROR" "Deployment finished with exit code $exit_code."
  fi
}

trap cleanup EXIT
trap 'fail "Command failed at line $LINENO: $BASH_COMMAND"' ERR

# 使用 flock 实现原子锁，避免 TOCTOU 竞态条件
LOCK_FD=9
acquire_lock() {
  exec 9>"$LOCK_FILE"
  if ! flock -n "$LOCK_FD"; then
    fail "Another deployment is already running. Lock file: $LOCK_FILE"
  fi
  echo "$$" >&9
  log "INFO" "Lock acquired (PID: $$)"
}

require_tool() {
  local tool_path="$1"
  [[ -x "$tool_path" ]] || fail "Required executable not found: $tool_path"
}

# 注意：$command 仅由脚本内部受控变量拼接，不接受外部用户输入
run_as_app_user() {
  local command="$1"
  runuser -u "$APP_USER" -- /bin/bash -lc "cd '$REPO_DIR' && $command"
}

wait_for_healthcheck() {
  local attempt
  for ((attempt = 1; attempt <= HEALTHCHECK_RETRIES; attempt++)); do
    if "$CURL_BIN" --fail --silent --show-error --max-time 10 "$HEALTHCHECK_URL" >/dev/null; then
      log "INFO" "Health check passed: $HEALTHCHECK_URL"
      return 0
    fi
    log "WARN" "Health check failed on attempt $attempt/$HEALTHCHECK_RETRIES."
    sleep "$HEALTHCHECK_DELAY_SECONDS"
  done
  fail "Health check did not succeed after $HEALTHCHECK_RETRIES attempts."
}

log "INFO" "Starting deployment for $APP_NAME"
acquire_lock

require_tool "$NODE_BIN"
require_tool "$NPM_BIN"
require_tool "$GIT_BIN"
require_tool "$CURL_BIN"
require_tool /usr/sbin/runuser
require_tool /bin/systemctl

id "$APP_USER" >/dev/null 2>&1 || fail "Application user does not exist: $APP_USER"
[[ -d "$REPO_DIR/.git" ]] || fail "REPO_DIR is not a git repository: $REPO_DIR"

current_commit="$(run_as_app_user "$GIT_BIN rev-parse HEAD")"
log "INFO" "Current commit: $current_commit"

log "INFO" "Fetching $REMOTE_NAME/$BRANCH_NAME"
run_as_app_user "$GIT_BIN fetch --prune $REMOTE_NAME $BRANCH_NAME"

remote_commit="$(run_as_app_user "$GIT_BIN rev-parse $REMOTE_NAME/$BRANCH_NAME")"
log "INFO" "Remote commit: $remote_commit"

if [[ "$current_commit" == "$remote_commit" ]]; then
  log "INFO" "No new commit detected. Skipping install, build, and restart."
  exit 0
fi

log "INFO" "Resetting working tree to $REMOTE_NAME/$BRANCH_NAME"
run_as_app_user "$GIT_BIN reset --hard $REMOTE_NAME/$BRANCH_NAME"

log "INFO" "Cleaning untracked files and directories"
run_as_app_user "$GIT_BIN clean -fd"

# git reset/clean 可能覆盖脚本的可执行权限，在此恢复
log "INFO" "Restoring deploy script permissions"
chmod +x "$SCRIPT_DIR/rendering-deploy.sh"

log "INFO" "Installing dependencies with npm ci"
run_as_app_user "$NPM_BIN ci"

log "INFO" "Running project verification"
run_as_app_user "$NPM_BIN run check"

log "INFO" "Building project"
run_as_app_user "$NPM_BIN run build"

log "INFO" "Restarting service $WEB_SERVICE_NAME"
/bin/systemctl restart "$WEB_SERVICE_NAME"

log "INFO" "Waiting for application health check"
wait_for_healthcheck

new_commit="$(run_as_app_user "$GIT_BIN rev-parse HEAD")"
log "INFO" "Deployment updated $current_commit -> $new_commit"
