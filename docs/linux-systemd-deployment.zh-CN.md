# Rendering Linux + systemd 自动部署说明

这份说明面向 `Linux server + systemd` 的部署方式。

目标：
- 每天定时从 GitHub 拉取 `origin/main`
- 在服务器本地重新安装依赖并重新构建
- 构建成功后重启站点服务
- 每次部署写入独立日志，并保留失败现场

## 1. 部署文件

仓库中已提供这些文件：

- `deploy/rendering-deploy.sh`
- `deploy/rendering-deploy.env.example`
- `deploy/rendering-web.env.example`
- `deploy/rendering-web.service`
- `deploy/rendering-deploy.service`
- `deploy/rendering-deploy.timer`

## 2. 服务器前置条件

需要提前准备：

- 已安装 `git`
- 已安装 `node` 与 `npm`
- 已安装 `curl`
- 已创建应用用户，例如 `rendering`
- 代码仓库已克隆到固定目录，例如 `/srv/rendering`

建议目录：

```bash
/srv/rendering
/etc/rendering
/var/log/rendering
/var/lock/rendering
```

## 3. 环境文件

不要直接使用仓库里的示例文件作为正式配置。
建议复制到 `/etc/rendering/` 后再修改。

### 3.1 部署环境

复制：

```bash
sudo mkdir -p /etc/rendering
sudo cp /srv/rendering/deploy/rendering-deploy.env.example /etc/rendering/rendering-deploy.env
```

至少确认这些变量：

- `APP_NAME`
- `APP_USER`
- `REPO_DIR`
- `BRANCH_NAME=main`
- `WEB_SERVICE_NAME`
- `HEALTHCHECK_URL`
- `LOG_DIR`
- `LOCK_DIR`

### 3.2 运行环境

复制：

```bash
sudo cp /srv/rendering/deploy/rendering-web.env.example /etc/rendering/rendering-web.env
```

最少确认：

- `NODE_ENV=production`
- `PORT=3000`
- `HOSTNAME=0.0.0.0`

## 4. 安装 systemd 单元

复制 unit 文件：

```bash
sudo cp /srv/rendering/deploy/rendering-web.service /etc/systemd/system/
sudo cp /srv/rendering/deploy/rendering-deploy.service /etc/systemd/system/
sudo cp /srv/rendering/deploy/rendering-deploy.timer /etc/systemd/system/
```

给脚本执行权限：

```bash
sudo chmod +x /srv/rendering/deploy/rendering-deploy.sh
```

重新加载 systemd：

```bash
sudo systemctl daemon-reload
```

## 5. 启用站点服务

```bash
sudo systemctl enable --now rendering-web.service
```

检查服务状态：

```bash
sudo systemctl status rendering-web.service
```

## 6. 启用定时部署

```bash
sudo systemctl enable --now rendering-deploy.timer
```

检查 timer：

```bash
sudo systemctl list-timers rendering-deploy.timer
```

默认计划：

- 每天 `03:15:00` 执行一次
- `Persistent=true`，如果服务器在定时点关机，开机后会补跑一次

如果要改时间，修改：

- `/etc/systemd/system/rendering-deploy.timer`

然后执行：

```bash
sudo systemctl daemon-reload
sudo systemctl restart rendering-deploy.timer
```

## 7. 手动执行一次部署

第一次部署建议手动跑一遍：

```bash
sudo systemctl start rendering-deploy.service
```

查看结果：

```bash
sudo systemctl status rendering-deploy.service
```

## 8. 日志查看

### 8.1 systemd journal

查看部署日志：

```bash
sudo journalctl -u rendering-deploy.service -n 200 --no-pager
```

查看站点日志：

```bash
sudo journalctl -u rendering-web.service -n 200 --no-pager
```

### 8.2 脚本日志文件

脚本会在 `LOG_DIR` 中写入：

- `deploy-YYYYMMDD-HHMMSS.log`
- `latest.log`

示例：

```bash
sudo tail -n 200 /var/log/rendering/latest.log
```

## 9. 部署脚本行为

`rendering-deploy.sh` 的流程是：

1. 加载 `/etc/rendering/rendering-deploy.env`
2. 创建日志目录和锁文件
3. 校验 `git` / `node` / `npm` / `curl` / `runuser`
4. 读取当前仓库提交
5. `git fetch origin main`
6. 如果没有新提交，直接退出
7. 有新提交时，执行 `git reset --hard origin/main`
8. 执行 `npm ci`
9. 执行 `npm run check`
10. 重启 `rendering-web.service`
11. 访问健康检查地址
12. 成功或失败都写入日志

## 10. 失败处理说明

脚本包含这些保护：

- `set -Eeuo pipefail`
- `trap` 捕获错误并记录失败命令
- 锁文件防止并发部署
- 只有在依赖安装、校验、构建都成功后才会重启服务
- 健康检查失败会让部署任务返回非零状态
- 保留失败现场，不自动回滚

## 11. 常见问题

### 11.1 定时器没有触发

检查：

```bash
sudo systemctl status rendering-deploy.timer
sudo systemctl list-timers --all | grep rendering
```

### 11.2 部署脚本无法重启服务

确认：

- `rendering-deploy.service` 以 root 运行
- `WEB_SERVICE_NAME` 与实际 service 名一致

### 11.3 健康检查失败

检查：

- `PORT` 是否和 `HEALTHCHECK_URL` 一致
- 服务是否真正监听 `0.0.0.0`
- 反向代理或防火墙是否影响本地回环访问

### 11.4 脚本提示无更新

这是正常行为。
当 `origin/main` 与当前部署提交一致时，脚本会跳过重装、重建和重启。