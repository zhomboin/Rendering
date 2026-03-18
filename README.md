# Rendering

[English](./README.en.md)

`Rendering` 是一个基于 `Next.js 15` 的技术博客项目，当前已经完成一套可运行的前台原型，并接入了本地 `MDX` 内容源与 `Pagefind` 静态全文搜索。

项目当前的视觉方向是“冷峻终端风”赛博科技风，强调：

- 长文阅读体验
- 冷色调系统感视觉
- 本地 MDX 内容管理
- 静态搜索与可扩展 SEO

## 当前能力

- 首页、博客列表、文章详情、标签页、About 页面
- `content/posts/*.mdx` 本地内容源
- frontmatter 驱动的文章元数据
- 文章详情页动态 SEO metadata
- `Pagefind` 全站搜索弹层
- 构建后自动生成搜索索引

## 技术栈

- `Next.js 15`
- `React 19`
- `TypeScript`
- `MDX`
- `gray-matter`
- `@mdx-js/mdx`
- `remark-gfm`
- `Pagefind`

## 目录结构

```text
app/                  App Router 页面
components/           站点与内容组件
content/posts/        本地 MDX 文章
lib/                  内容仓储、MDX 解析、站点配置
public/               静态资源
scripts/              构建辅助脚本
docs/                 设计说明与实现计划
```

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

运行内容层测试：

```bash
npm test
```

执行生产构建：

```bash
npm run build
```

说明：

- `npm run build` 会先执行 `next build`
- 然后运行 `scripts/build-search-index.mjs`
- 最终将 Pagefind 索引生成到 `public/pagefind/`

## 内容编写

文章位于：

```text
content/posts/*.mdx
```

每篇文章使用文件名作为默认 slug，例如：

```text
content/posts/designing-a-terminal-first-blog.mdx
-> /blog/designing-a-terminal-first-blog
```

frontmatter 目前支持：

```yaml
---
title: 示例标题
description: 示例摘要
publishedAt: 2026-03-18
tags:
  - nextjs
  - rendering
draft: false
---
```

规则：

- `draft: true` 的文章不会出现在公开页面中
- `description` 同时用于列表摘要和 SEO description
- `tags` 会参与标签聚合和搜索上下文

## 搜索

项目使用 `Pagefind` 提供静态全文搜索能力，但 UI 不是默认组件，而是自定义的全站搜索弹层。

触发方式：

- 点击顶部 `Search Index`
- 按 `/`
- 按 `Ctrl/Cmd + K`

搜索结果会展示：

- 标题
- 命中摘要
- 标签上下文
- 对应文章路径

## SEO

当前已接入基础 SEO：

- 全站 `metadataBase`
- 首页、博客列表、标签页、About 页静态 metadata
- 文章详情页动态 metadata
- canonical URL
- Open Graph 基础字段
- Twitter 基础字段

暂未接入：

- `sitemap.xml`
- `robots.txt`
- JSON-LD
- 动态 OG 图片

## 备注

当前仓库仍处于前台优先阶段，后台管理、数据库、鉴权等能力尚未接入到现有运行版本中。现阶段更适合作为：

- 博客前台原型
- 内容与视觉风格基线
- 后续接数据库、评论、部署与 SEO 扩展的基础仓库
