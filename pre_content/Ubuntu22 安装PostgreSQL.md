# Ubuntu 22.04 安装 PostgreSQL 全流程（含踩坑 + 优化 + 远程连接）

> 适用于：个人开发 / 小型服务 / 云服务器部署
>  环境：Ubuntu 22.04 + PostgreSQL

------

# 📌 一、为什么选择 PostgreSQL？

PostgreSQL 是一个**企业级开源关系型数据库**，相比 MySQL：

- 更强的 SQL 标准支持
- 更适合复杂查询 / 分析
- JSON / GIS / 扩展能力强
- 数据一致性更严谨

👉 适合场景：

- Web 后端（Django / Node / Go）
- 数据分析系统
- 日志 / 监控存储
- 小型 SaaS 项目

------

# 🛠️ 二、安装 PostgreSQL

## 1. 更新系统

```
sudo apt update && sudo apt upgrade -y
```

## 2. 安装 PostgreSQL

```
sudo apt install postgresql postgresql-contrib -y
```

------

# ✅ 三、验证安装

```
sudo systemctl status postgresql
```

👉 正常状态：

```
active (running)
```

------

# ⚠️ 四、重要认知（新手必踩坑）

## ❗ sudo 要的不是数据库密码！

执行：

```
sudo systemctl restart postgresql
```

提示输入密码时：

👉 输入的是 **Linux 系统用户密码**
 ❌ 不是 PostgreSQL 的密码

------

## ❗ postgres 默认没有密码

默认登录方式是：

```
sudo -u postgres psql
```

原因：

👉 使用的是 **peer 认证（系统用户信任）**

------

# 🧑‍💻 五、进入数据库

```
sudo -i -u postgres
psql
```

退出：

```
\q
```

------

# 🏗️ 六、创建数据库 & 用户（推荐）

```
-- 创建用户
CREATE USER myuser WITH PASSWORD 'mypassword';

-- 创建数据库
CREATE DATABASE mydb OWNER myuser;

-- 授权
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
```

------

# 🔐 七、修改认证方式（关键）

默认是 peer（本地免密），需要改成密码登录。

## 编辑配置：

```
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

找到：

```
local   all   all   peer
```

改为：

```
local   all   all   md5
```

------

# 🌐 八、开启远程访问（服务器必做）

## 1. 修改监听地址

```
sudo nano /etc/postgresql/14/main/postgresql.conf
```

修改：

```
listen_addresses = '*'
```

------

## 2. 配置访问规则

```
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

新增：

```
host    all    all    0.0.0.0/0    md5
```

------

## 3. 重启服务

```
sudo systemctl restart postgresql
```

------

## 4. 开放端口

```
sudo ufw allow 5432/tcp
```

------

# 🧪 九、连接测试

本地：

```
psql -U myuser -d mydb -h localhost
```

远程：

```
psql -U myuser -d mydb -h 服务器IP
```

------

# 💡 十、1核1G服务器优化（实战重点）

👉 小内存机器必须优化，否则容易卡死

## 推荐配置

编辑：

```
sudo nano /etc/postgresql/14/main/postgresql.conf
```

修改：

```
max_connections = 20
shared_buffers = 128MB
work_mem = 2MB
maintenance_work_mem = 32MB
effective_cache_size = 512MB
```

------

## 开启 swap（强烈建议）

```
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

持久化：

```
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

------

# 🚨 十一、常见问题（踩坑合集）

## ❌ 1. 连接失败（Connection refused）

排查：

```
ss -lntp | grep 5432
```

检查：

- listen_addresses
- 防火墙
- 服务是否启动

------

## ❌ 2. 密码不生效

👉 90% 原因：

- `pg_hba.conf` 还是 peer
- 忘记重启服务

------

## ❌ 3. sudo 要密码但不知道

👉 解决：

```
whoami
```

确认当前用户，然后使用该用户密码。

------

## ❌ 4. 服务器卡死 / OOM

👉 原因：

- 连接数太多
- 内存配置过大
- 没有 swap