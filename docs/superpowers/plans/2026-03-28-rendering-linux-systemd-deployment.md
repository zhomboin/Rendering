# Rendering Linux Systemd Deployment Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a production-oriented Linux deployment bundle that can pull `origin/main` on a daily schedule, rebuild the site, restart the systemd web service, and keep timestamped logs with failure handling.

**Architecture:** Ship a small `deploy/` bundle inside the repo. A root-owned `systemd` timer triggers a oneshot deployment service, which runs a hardened Bash script. The script performs fetch/reset, dependency install, verification, build, service restart, and health check while executing repository commands as the app user and writing logs to a configurable directory.

**Tech Stack:** Bash, systemd service/timer units, git, npm, Next.js production build

---

### Task 1: Add deployment artifacts

**Files:**
- Create: `deploy/rendering-deploy.sh`
- Create: `deploy/rendering-deploy.env.example`
- Create: `deploy/rendering-web.env.example`
- Create: `deploy/rendering-web.service`
- Create: `deploy/rendering-deploy.service`
- Create: `deploy/rendering-deploy.timer`

- [ ] **Step 1: Write the deployment script skeleton**
- [ ] **Step 2: Add fetch/reset/install/check/restart/healthcheck flow**
- [ ] **Step 3: Execute repository commands as the application user**
- [ ] **Step 4: Add web service, deploy service, and daily timer unit files**
- [ ] **Step 5: Add example environment files**

### Task 2: Add operator documentation

**Files:**
- Create: `docs/linux-systemd-deployment.zh-CN.md`

- [ ] **Step 1: Document prerequisites and directories**
- [ ] **Step 2: Document environment file installation**
- [ ] **Step 3: Document systemd installation and enablement**
- [ ] **Step 4: Document manual deploy and log inspection**

### Task 3: Add deployment bundle verification

**Files:**
- Modify: `lib/tooling.test.js`

- [ ] **Step 1: Assert the deployment files exist**
- [ ] **Step 2: Assert the timer remains on a daily schedule**
- [ ] **Step 3: Run `node lib/tooling.test.js`**
- [ ] **Step 4: Run `npm run check`**