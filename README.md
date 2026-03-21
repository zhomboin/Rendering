# Rendering

[English](./README.en.md)

`Rendering` 是一个基于 `Next.js 15` 的个人技术博客项目，当前已经完成一套可运行的公开前台，并接入了本地 `MDX` 内容源与 `Pagefind` 静态全文搜索。

当前产品方向不是 CMS，而是一个强调个人表达、图文长文阅读体验和趣味编辑气质的博客站点。

## 当前产品方向

- 趣味化、编辑型、黏土拟态灵感的个人博客
- 默认亮色主题，同时支持暗色主题切换
- 鲜艳但受控的高饱和配色
- 适合长文与图文混排的阅读体验
- 本地 MDX 内容工作流
- 静态搜索与可扩展 SEO 基线

## 当前能力

- 首页、博客归档、文章详情、标签页、About 页面
- `content/posts/*.mdx` 本地内容源
- frontmatter 驱动的文章元数据
- 草稿过滤、标签聚合、上一篇 / 下一篇文章导航
- `figure / caption / gallery` 图文模块与图片 lightbox
- 文章阅读进度跟踪
- `Pagefind` 全站搜索弹层
- 基础 metadata、Open Graph、Twitter metadata
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
npm test
npm run build
```

## 当前阶段不做

- 登录
- 作者鉴权
- 后台管理
- 数据库化内容编辑
- 媒体库
- 多作者发布

这些能力会保留为未来 CMS 阶段扩展，而不是当前阶段前置实现。