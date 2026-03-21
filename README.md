# Rendering

[English](./README.en.md)

`Rendering` 是一个基于 `Next.js 15` 的个人技术博客项目。当前阶段它已经具备可运行的公开前台、本地 `MDX` 内容源、标签归档/筛选、Pagefind 搜索，以及中文默认 + 英文镜像的站点 UI 结构。

当前产品方向不是 CMS，而是一个强调个人表达、图文长文阅读体验与趣味编辑气质的博客站点。

## 当前产品方向

- 趣味编辑型、黏土拟态灵感的个人博客
- 默认亮色主题，同时支持暗色切换
- 适合长文、代码块与图片混排的阅读体验
- 本地 MDX 内容工作流
- 静态搜索与可扩展 SEO 基础
- 中文默认站点与 `/en` 英文镜像 UI

## 当前能力

- 首页、博客归档、文章详情、标签页、标签归档、About 页面
- `content/posts/*.mdx` 本地内容源
- frontmatter 驱动的文章元数据
- 草稿过滤、标签聚合、上一篇/下一篇导航
- `figure / caption / gallery` 图文模块与 lightbox
- 文章阅读进度跟踪
- 全站 Pagefind 搜索弹层
- `sitemap.xml`、`robots.txt`、JSON-LD
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

## 本地开发

```bash
npm install
npm run dev
npm run lint
npm run test
npm run typecheck
npm run build
npm run check
```

## 当前阶段不做

- 登录
- 作者鉴权
- 后台管理
- 数据库化内容编辑
- 评论系统
- 多作者发布
- 数据分析后台

这些能力保留给未来 CMS 阶段，而不是当前阶段提前实现。

## 下一阶段重点

- 发布基线收口与 CI
- 作者工作流和迁移模板
- Feed / manifest 等分发能力
- 从用户自己的 CSDN 原创博客中精选迁移 3-5 篇文章