# Rendering

[English](./README.en.md)

`Rendering` 是一个基于 `Next.js 15` 的个人技术博客项目。

它当前的核心特征是：默认中文路由、`/en` 英文镜像 UI、本地 `MDX` 发文流程、博客页内标签筛选、Pagefind 搜索、阅读进度、图文混排组件、RSS/Manifest/JSON-LD/OG 等静态分发与 SEO 基础设施。

## 当前状态

- 当前个人博客实现阶段：已完成
- 当前仓库定位：公开个人博客前台
- 当前内容工作流：`Git + MDX + 自动构建发布`

## 当前功能

- 首页、博客归档、文章详情、About 页面
- 中文默认路由与 `/en` 英文镜像 UI
- 博客页内标签筛选：`/blog?tag=...`
- 本地 `content/posts/*.mdx` 内容仓库
- frontmatter 驱动的标题、摘要、日期、标签、草稿状态
- 上一篇 / 下一篇导航
- 文章目录、阅读进度、图文混排、`figure / caption / gallery / lightbox`
- 明暗主题切换
- 全站 Pagefind 搜索
- `sitemap.xml`、`robots.txt`、`feed.xml`、`manifest.webmanifest`
- 站点级与文章级 JSON-LD、动态 OG 图
- GitHub Actions CI

## 当前路由模型

- 中文：`/`、`/blog`、`/blog/[slug]`、`/about`
- 英文：`/en`、`/en/blog`、`/en/blog/[slug]`、`/en/about`
- 标签不再有独立页面，统一收口到博客页筛选

## 技术栈

- `Next.js 15`
- `React 19`
- `TypeScript`
- `MDX`
- `gray-matter`
- `@mdx-js/mdx`
- `remark-gfm`
- `Pagefind`

## 本地开发

```bash
npm install
npm run dev
npm run lint
npm test
npm run typecheck
npm run build
npm run check
```

## 发文方式

标准流程是：

```bash
npm run create-post -- <slug> [tag1,tag2]
```

然后：

1. 在 `content/posts/*.mdx` 中填写 frontmatter 与正文
2. 本地运行 `npm run dev` 预览
3. 运行 `npm run check`
4. 将 `draft` 改为 `false`
5. 提交并推送到 `main`

## 上线前仍需确认的事项

这些不是当前实现阶段的缺口，而是正式对外发布前的运营配置项：

- 正式域名与部署平台
- 最终作者信息与品牌文案
- About 页最终公开内容
- 首批公开文章的最终确认

详见：
- [docs/site-launch-checklist-and-publishing-sop.zh-CN.md](/D:/Code/Project/Rendering/Rendering/docs/site-launch-checklist-and-publishing-sop.zh-CN.md)
- [docs/PRD.zh-CN.md](/D:/Code/Project/Rendering/Rendering/docs/PRD.zh-CN.md)
- [docs/development-plan.zh-CN.md](/D:/Code/Project/Rendering/Rendering/docs/development-plan.zh-CN.md)