# 网站正式上线 Checklist + 发文 SOP

这份文档面向当前阶段的 `Rendering` 个人博客。

适用前提：

- 当前个人博客实现阶段已完成
- 站点默认中文，`/en` 为英文镜像 UI
- 标签通过博客页 `?tag=` 进行筛选，不存在独立标签页
- 内容发布方式为 `Git + MDX + 自动构建发布`

## 1. 文档目标

这份文档解决两件事：

- 当前代码已经完成后，正式上线前还要确认哪些运营条件
- 上线之后，如何用当前仓库稳定发文

## 2. 当前完成与未完成的边界

### 已完成

- 公开站点实现
- 中英双语站点壳层
- 本地 MDX 发文工作流
- Pagefind 搜索
- Feed、Manifest、Sitemap、Robots、JSON-LD、OG
- GitHub Actions CI

### 尚未完成但属于上线运营事项

- 正式域名
- 正式部署平台
- 最终作者公开信息
- 最终品牌文案与 About 内容
- 首批上线文章清单确认

## 3. 上线前必须确认的条件

### 3.1 品牌与站点信息

- [ ] 确认正式域名
- [ ] 确认 `lib/seo.js` 中的站点 origin 与正式域名一致
- [ ] 确认作者名、站点描述、About 页面文案为最终公开版本
- [ ] 确认 favicon、分享图、manifest 文案符合当前品牌

重点核对文件：

- `lib/seo.js`
- `lib/messages/zh.js`
- `lib/messages/en.js`
- `app/manifest.ts`

### 3.2 部署与自动发布

- [ ] 选定正式部署平台
- [ ] 域名解析完成
- [ ] `main` push 后可自动构建与发布
- [ ] GitHub Actions 最新工作流为绿色
- [ ] `feed.xml`、`sitemap.xml`、`robots.txt`、`manifest.webmanifest` 可在线访问

### 3.3 内容与公开状态

- [ ] 首批公开文章已确认
- [ ] 不应公开的文章仍然保持 `draft: true`
- [ ] 每篇公开文章都具备完整 title / description / publishedAt / tags
- [ ] 博客页标签筛选结果符合预期

### 3.4 体验与质量

- [ ] 桌面端检查首页、博客页、文章页、About 页
- [ ] 移动端检查首页、博客页、文章页
- [ ] 明暗主题切换正常
- [ ] 中英文路由切换正常
- [ ] 搜索、阅读进度、图库预览正常

### 3.5 工程校验

正式上线前至少运行一次：

```bash
npm run check
```

它会覆盖：

- 内容校验
- 回归测试
- 类型检查
- 生产构建

## 4. 上线执行 Checklist

### 4.1 上线前一天

- [ ] 复核 `README`、PRD、开发计划与仓库实现是否一致
- [ ] 复核 `lib/seo.js` 与作者信息
- [ ] 确认首批公开文章列表
- [ ] 运行 `npm run check`
- [ ] 确认最新 GitHub Actions 为绿色

### 4.2 上线当天

- [ ] 合并并推送最终代码到 `main`
- [ ] 等待部署平台完成构建
- [ ] 检查 `/`
- [ ] 检查 `/blog`
- [ ] 检查 `/about`
- [ ] 检查至少 2 篇文章详情页
- [ ] 检查 `/feed.xml`
- [ ] 检查 `/sitemap.xml`
- [ ] 检查 `/robots.txt`
- [ ] 检查 `/manifest.webmanifest`
- [ ] 检查分享图

### 4.3 上线后 24 小时内

- [ ] 手机端复查首页与文章页
- [ ] 检查 `/en`、`/en/blog`、`/en/about`
- [ ] 检查搜索是否可返回文章
- [ ] 检查博客页内标签筛选是否正常
- [ ] 检查 RSS 是否可被正确抓取
- [ ] 检查 favicon 是否正常显示

## 5. 当前网站的发文方式

当前网站不是 CMS，没有后台发文入口。

当前标准发文方式是：

`本地编写 MDX -> 本地校验 -> Git 提交 -> push 到 main -> 自动构建发布`

## 6. 发文 SOP

### 6.1 新建文章

```bash
npm run create-post -- <slug> [tag1,tag2]
```

示例：

```bash
npm run create-post -- mysql-locking-read mysql,innodb
```

生成位置：

- `content/posts/<slug>.mdx`

### 6.2 填写 frontmatter

每篇文章至少需要：

```yaml
---
title: "文章标题"
description: "用于列表页和 SEO 的摘要"
publishedAt: "2026-03-23"
tags:
  - mysql
  - innodb
draft: true
---
```

要求：

- `title` 必填
- `description` 必填
- `publishedAt` 必须是 `YYYY-MM-DD`
- `tags` 对公开文章不能为空
- 发布前将 `draft` 改为 `false`

### 6.3 编写正文

正文直接使用 `MDX`。

当前支持：

- 普通 Markdown 正文
- 代码块
- 图片
- `figure / caption / gallery / lightbox`

### 6.4 本地预览

```bash
npm run dev
```

重点检查：

- 标题与摘要
- 图文混排
- 目录与阅读进度
- 标签是否合理
- 中英文壳层是否正常

### 6.5 本地校验

```bash
npm run check
```

### 6.6 发布文章

1. 将 `draft` 改为 `false`
2. 运行 `npm run check`
3. 提交代码
4. push 到 `main`
5. 等待自动部署

发布后，文章会自动进入：

- 首页内容区
- 博客归档页
- 博客页标签筛选结果
- `feed.xml`
- `sitemap.xml`
- 搜索索引

### 6.7 发布后检查

- [ ] 文章详情页可正常打开
- [ ] 标题与摘要正确
- [ ] 标签筛选跳转正常
- [ ] 分享图正常
- [ ] Feed 中出现新文章
- [ ] 搜索可以搜到该文章

## 7. 旧文迁移原则

当前已经确认的迁移口径：

- 可从已有原创内容渠道迁移文章
- 本站作为首发站使用
- 迁移后默认保留原文表达，不再做模板化改写
- 迁移时只清理平台噪声与排版问题

## 8. 一句话流程

当前最短发文流程是：

1. `npm run create-post -- <slug> [tags]`
2. 填写 frontmatter 和正文
3. `npm run dev` 预览
4. `npm run check`
5. 改为 `draft: false`
6. 提交并 push 到 `main`
7. 发布后检查文章、Feed、搜索与标签筛选