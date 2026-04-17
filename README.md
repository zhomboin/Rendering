# Rendering

[English](./README.en.md)

`Rendering` 是一个基于 `Next.js 15` 的个人技术博客项目。

当前仓库已经完成“个人博客实现阶段”的交付，定位是公开个人博客前台，而不是 CMS、后台管理系统或数据库驱动的内容平台。

## 当前项目状态

- 当前阶段：已完成当前个人博客实现
- 当前仓库角色：公开站点前台 + 本地内容仓库 + 发布/部署辅助脚本
- 当前内容工作流：`Git + MDX + 自动构建发布`
- 当前剩余工作：正式域名与部署、最终作者/品牌文案、首批公开内容确认

## 当前已具备的能力

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
- Linux + systemd 自动部署脚本与 unit/timer 模板

## 当前范围边界

当前仓库明确包含：

- 公开博客页面与站点壳层
- 本地 MDX 发文与内容校验
- 搜索、SEO、Feed、Manifest、OG 等分发基础设施
- 阅读体验、主题切换与响应式表现

当前仓库明确不包含：

- 登录与鉴权
- 后台管理页面
- 数据库驱动的内容编辑
- CMS 作者端
- 多作者协作工作流
- 评论、统计后台、媒体库等完整平台能力

如果未来进入 CMS / 管理后台阶段，应作为新的项目阶段单独立项，而不是提前把这些依赖塞回当前仓库。

## 当前路由模型

- 中文：`/`、`/blog`、`/blog/[slug]`、`/about`
- 英文：`/en`、`/en/blog`、`/en/blog/[slug]`、`/en/about`
- 标签统一通过博客页筛选处理，不再维护独立 `/tags` 页面作为当前对外信息架构

## 技术栈

- `Next.js 15`
- `React 19`
- `TypeScript`
- `MDX`
- `gray-matter`
- `@mdx-js/mdx`
- `remark-gfm`
- `Pagefind`

## 关键目录

```text
app/                  App Router 页面、布局与 metadata 路由
components/           页面组件、交互组件、阅读体验组件
content/posts/        本地 MDX 文章仓库
content/templates/    新文章模板
lib/                  内容层、i18n、SEO、站点文案、测试
scripts/              内容校验、类型检查、建索引、建文章脚本
deploy/               Linux + systemd 部署脚本与示例配置
docs/                 PRD、开发计划、上线清单、设计与 superpowers 记录
public/               静态资源、预览文件、Pagefind 索引输出
```

## 本地开发与校验

```bash
npm install
npm run dev
npm run lint
npm test
npm run typecheck
npm run build
npm run check
```

其中 `npm run check` 会串联：

- 内容校验
- Node 侧回归测试
- 类型检查
- 生产构建

## 发文方式

标准流程：

```bash
npm run create-post -- <slug> [tag1,tag2]
```

然后：

1. 在 `content/posts/*.mdx` 中填写 frontmatter 与正文
2. 将文章配图放到 `public/images/blog/<slug>/`，并在 MDX 中使用 `/images/blog/<slug>/<文件名>` 引用
3. 本地运行 `npm run dev` 预览
4. 运行 `npm run check`
5. 将 `draft` 改为 `false`
6. 提交并推送到 `main`

## 部署与运营文档

- [上线 Checklist + 发文 SOP](./docs/site-launch-checklist-and-publishing-sop.zh-CN.md)
- [Linux + systemd 自动部署说明](./docs/linux-systemd-deployment.zh-CN.md)
- [内容迁移指南](./docs/content-migration-guide.zh-CN.md)
- [趣味黏土风格设计指南](./docs/playful-clay-design-guide.zh-CN.md)

## 当前阶段的权威文档

以下文档应视为当前仓库事实的主要来源：

- [AGENTS.md](./AGENTS.md)
- [PRD.zh-CN.md](./docs/PRD.zh-CN.md)
- [development-plan.zh-CN.md](./docs/development-plan.zh-CN.md)
- [PRD.md](./docs/PRD.md)
- [development-plan.md](./docs/development-plan.md)

## 历史文档说明

仓库根目录下的 `Rendering.docx` 是更早期的方案草稿，包含全栈/CMS 方向设想，与当前已实现仓库并不一致。

在判断当前项目范围、技术栈与交付状态时，请以本 README、`AGENTS.md` 与 `docs/` 下的当前阶段文档为准，而不要把 `Rendering.docx` 当作现状说明。
