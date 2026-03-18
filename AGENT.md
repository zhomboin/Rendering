# AGENT.md — Next.js 全栈博客项目

## 项目概述

这是一个基于 Next.js 15 App Router 的全栈技术博客系统。

- **框架**：Next.js 15 + React 19 + TypeScript (strict)
- **样式**：Tailwind CSS v4
- **数据库**：PostgreSQL (Neon) + Prisma v6 ORM
- **鉴权**：NextAuth.js v5 (GitHub OAuth)
- **部署**：Vercel（自动 CI/CD）
- **内容**：MDX + next-mdx-remote + rehype-pretty-code

---

## 目录结构

```
app/
  (public)/          读者端页面（layout 含 header/footer）
  admin/             管理端（受 middleware 保护）
  api/               Route Handlers（auth、og 图片）
components/
  ui/                Button, Card, Badge 等通用组件
  blog/              PostCard, TOC, CodeBlock 等博客组件
  admin/             Editor, MediaUpload 等管理组件
lib/
  prisma.ts          单例 Prisma client（避免 dev hot-reload 泄漏连接）
  mdx.ts             MDX 序列化/反序列化工具函数
  utils.ts           cn(), formatDate(), readingTime() 等
prisma/
  schema.prisma      数据库模型定义
```

---

## 常用命令

```bash
pnpm dev                        # 开发服务器（localhost:3000）
pnpm build                      # 生产构建
pnpm lint                       # ESLint 检查
pnpm typecheck                  # tsc --noEmit
pnpm db:migrate                 # prisma migrate dev
pnpm db:studio                  # Prisma Studio（可视化数据库）
pnpm db:seed                    # 导入测试数据
```

---

## 代码规范

### TypeScript
- 启用 strict mode，禁止使用 `any`
- 所有 async 函数必须有明确返回类型
- Prisma 生成的类型直接复用，不要重复声明相同 interface

### 组件规范
- Server Component 优先，只在需要交互时加 `"use client"`
- 客户端组件放在 `components/` 下，文件名后缀约定为 `*.client.tsx`（可选）
- 所有组件 props 用 interface 声明，不用 type alias

### 数据获取
- 页面级数据获取在 `page.tsx` 的 async 函数中完成（Server Component）
- 数据库查询统一通过 `lib/` 下的函数封装，不在组件内直接调用 prisma
- 使用 `unstable_cache` 或 `revalidatePath` 管理缓存

### 样式
- 使用 Tailwind 工具类，避免内联 style
- 复杂组件用 `cn()`（clsx + tailwind-merge）合并类名
- 响应式断点：sm(640) / md(768) / lg(1024) / xl(1280)

---

## 环境变量

```bash
# .env.local（本地开发）
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="..."
```

**规则**：.env.local 不提交 git。生产环境变量通过 Vercel Dashboard 配置。

---

## 数据库操作

### 获取已发布文章列表
```typescript
// lib/posts.ts
export async function getPosts(page = 1, tag?: string) {
  return prisma.post.findMany({
    where: { published: true, ...(tag && { tags: { some: { tag: { slug: tag } } } }) },
    include: { tags: { include: { tag: true } } },
    orderBy: { publishedAt: 'desc' },
    take: 10,
    skip: (page - 1) * 10,
  });
}
```

### Prisma 客户端单例（避免 dev 模式连接泄漏）
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

---

## 鉴权

管理端由 `middleware.ts` 统一保护：

```typescript
// middleware.ts
export { auth as middleware } from '@/lib/auth';
export const config = { matcher: ['/admin/:path*'] };
```

Session 中判断管理员：
```typescript
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') ?? [];
// auth.ts callbacks.signIn 中验证 user.email
```

---

## MDX 渲染流程

1. 从数据库读取文章 body（MDX 字符串）
2. `next-mdx-remote/rsc` 的 `compileMDX` 序列化
3. rehype 插件链：rehype-slug → rehype-autolink-headings → rehype-pretty-code
4. 自定义 components 映射：`<pre>` → `<CodeBlock>`，`<img>` → `<Image>`（next/image）

---

## 部署检查清单

- [ ] 所有环境变量已在 Vercel 配置
- [ ] `DATABASE_URL` 指向 Neon Production 分支
- [ ] `NEXTAUTH_URL` 已更新为生产域名
- [ ] `prisma migrate deploy` 已在 CI 步骤中执行
- [ ] Plausible 域名已配置
- [ ] sitemap / robots.txt 可访问
- [ ] OG 图片路由 /api/og 正常返回

---

## 常见问题

**Q: 本地 Prisma 连接失败**
确认 `.env.local` 中 `DATABASE_URL` 格式正确，Neon 连接串需加 `?sslmode=require`。

**Q: MDX 渲染报错 "Cannot read properties of undefined"**
检查 MDX 中是否使用了未在 `components` 映射中注册的自定义组件。

**Q: 管理端一直重定向到登录页**
确认 `NEXTAUTH_SECRET` 和 `NEXTAUTH_URL` 环境变量已正确设置，GitHub OAuth App 的 callback URL 已更新。

**Q: 图片在生产环境不显示**
检查 `next.config.ts` 的 `images.remotePatterns` 是否包含 Cloudinary 域名。