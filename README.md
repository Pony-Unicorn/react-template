# Bolt

> A fast, modular Web3 starter built with **React Router**, **shadcn/ui**, **Tailwind CSS**, **Motion**, and the latest in wallet tooling: **Wagmi**, **viem**, and **@reown/appkit**.

Bolt 基于 React Router、shadcn/ui、Tailwind CSS、Motion 以及最新钱包工具（Wagmi、viem 和 @reown/appkit）构建的前端模板。

---

## 🚀 Quick Start

- Clone project

```bash
pnpm dlx degit Pony-Unicorn/web3-template my-project

cd my-project

pnpm i
```

- Development

```bash
pnpm dev
```

### 常用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本（TypeScript 类型检查 + Vite 构建）
pnpm preview      # 本地预览生产构建
pnpm format       # 检查代码格式
pnpm format-fix   # 自动修复代码格式
pnpm deploy       # 部署到 Cloudflare Pages
```

### 依赖管理

```bash
pnpm outdated       # 查看过时的依赖
pnpm up             # 升级到 semver 范围内的最新版本
pnpm up -L [package]    # 将指定依赖升级到最新版本（忽略 semver）
pnpm up -L --interactive  # 交互式选择升级依赖
```

---

## ⚡️ 特性 Features

- 🧱 **React Router 7** — 现代化的客户端路由解决方案
- 🎨 **shadcn/ui + Tailwind CSS v4** — 基于 Radix 原语的可定制组件库，配合原子化 CSS
- 🌀 **Motion** — 炫酷且顺滑的动画体验（Framer Motion 的轻量级替代）
- 🔐 **Wagmi + viem** — 下一代 EVM 钱包交互工具
- 🚀 **@reown/appkit** — 一站式 DApp 钱包连接集成方案
- 🧹 **Prettier** — 代码风格统一
- 📦 **TanStack Query** — 强大的服务端状态管理
- 🛡️ **TypeScript + Zod** — 类型安全与运行时校验
- ⚙️ **约定式目录结构** — 支持合约 ABI、ENV 环境变量、类型声明等规范组织
- ⏱ **开箱即用** — 快速启动，支持拓展与定制

面向 Web3 应用的现代前端模板，开箱即用且可扩展。

---

## 📁 Project directory structure

```
src/
├── app.css                    # 全局样式与主题变量
├── main.tsx                   # 应用入口
├── App.tsx                    # 根组件（Providers + Routes）
├── Root.tsx                   # 布局组件（Header/Outlet/Footer）

├── routes/                    # 页面路由组件
│   ├── Home.tsx              # 首页
│   ├── About.tsx             # 关于页
│   ├── Contract.tsx          # 合约交互示例页
│   └── Preview.tsx           # 组件预览页

├── features/                  # 业务模块
│   └── demo/                 # 示例模块
│       ├── Home.tsx          # 模块首页
│       ├── components/       # 模块专属组件
│       ├── hooks/            # 模块专属 Hooks
│       ├── api.ts            # 模块专属接口
│       └── types.ts          # 模块专属类型

├── components/                # 通用组件
│   ├── ui/                   # shadcn/ui 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   └── separator.tsx
│   ├── shared/               # 全局共享组件（Header、NotFound 等）
│   │   ├── SiteHeader.tsx
│   │   ├── Footer.tsx
│   │   └── NotFound.tsx
│   ├── elements/             # 原子级小组件（按钮、图标、工具等）
│   │   ├── CopyButton.tsx
│   │   └── ScreenSize.tsx
│   └── react-bits/           # 动画组件或第三方扩展
│       └── FuzzyText.tsx

├── lib/                       # 工具库
│   └── utils.ts              # cn() 等

├── context/                   # React Context Providers
│   └── AppKitProvider.tsx    # Wagmi + TanStack Query + AppKit

├── constants/                 # 配置与常量
│   ├── env.ts                # 环境变量（@t3-oss/env-core + Zod）
│   ├── app.ts                # 应用配置（模式、主题等）
│   ├── api.ts                # API 地址配置
│   └── USDT.abi.ts           # 合约 ABI（如 ERC20 合约）

├── hooks/                     # 自定义 React Hooks
│   ├── useComputedState.ts   # 原始值与 UI 值
│   └── useScroll.ts          # 滚动相关

├── store/                     # Zustand 状态管理
│   └── person.ts             # 示例 store

├── services/                  # API 与业务封装
│   └── auth.ts               # 认证接口

├── types/                     # TypeScript 类型
│   └── api.d.ts              # API 响应类型

└── utils/                     # 纯工具函数
    ├── common.ts             # 通用工具
    ├── format.ts             # 格式化（地址、时间、金额等）
    ├── validate.ts           # 校验
    └── result.ts             # Result 封装（neverthrow）

public/                        # 静态资源
├── fonts/                    # 字体文件
└── images/                   # 图片资源

docs/                          # 项目文档
├── overview.md               # 项目概述
└── architecture.md           # 架构说明

llms/                          # AI 辅助开发文档
└── [library]-llms.txt        # 各类库提示词文档

openspec/                      # OpenSpec 变更与规范产物
```

---

## ⌨️ 开发规范

- 命名规范
  - 不强制匈牙利命名法，类型安全交由 TypeScript 的类型检查机制处理
  - 目录一般使用复数，例如 constants、components、routes。特殊情况酌情处理
  - 页面/组件文件使用 PascalCase，路由路径使用小写（建议 kebab-case）
    - 配置文件名全小写，使用点号分隔后缀，例如 vite.config.ts
  - PascalCase 命名法: 页面名、组件名，例如 UserProfile.tsx、NavBar.tsx
  - camelCase 命名法: 变量名、函数名、对象字段，例如 userName、getUserProfile
  - kebab-case 命名法: 路由路径与普通文件（如样式、静态资源）例如 user-profile、user-profile.module.css
  - Hooks 命名: useXxx，文件名与导出保持一致，例如 useScroll.ts
  - snake_case 命名法: querystring 中按后端约定使用，例如 ?page=2&page_size=100
  - 全大写+下划线: 全局常量，例如 API_BASE_URL
- UI 中显示的值建议单独设置 UI 值，例 `tokenPrice => uiTokenPrice`
- UI 中的网络请求必须使用 TanStack Query
  - 读（useQuery、useQueries）不准使用 Toast 提示
  - 读失败应在整个区域或卡片中显示错误信息
  - 读需要手动刷新（refetch）可使用 Toast 作为提示
  - 需要手动触发刷新的需要设置 `enabled: false`
  - 写（useMutation），可使用 Toast 提示
- UI 中数据获取的最佳实践
  - 加载中：应使用 Skeleton 组件占位
  - 失败：应在整个区域或卡片中显示错误信息
  - 成功：直接显示或格式化显示（尽量在原始值中做格式化处理）

  ```typescript
  const { data: tokenPrice } = useQuery({
    queryKey: ['getTokenPrice'],
    queryFn: async () => {
      return Promise.resolve(7.25)
    },
    staleTime: 60 * 1000,
  })

  const uiTokenPrice = useMemo(() => {
    return tokenPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }, [tokenPrice])
  ```

---

## 🏗️ 项目架构 Architecture

### 技术栈概览

```
┌─────────────────────────────────────────────────────┐
│                  User Interface                      │
│              React 19 + React Router 7               │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│                  UI Components                       │
│        shadcn/ui + Tailwind CSS v4                   │
│        Motion (Animations)                           │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│              State Management Layer                  │
│   Zustand (Client)  │  TanStack Query (Server)      │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│                 Web3 Integration                     │
│   Wagmi + viem  │  @reown/appkit (Wallet Connect)   │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────┐
│            Blockchain & Backend APIs                 │
│       Ethereum RPC  │  RESTful/GraphQL APIs          │
└─────────────────────────────────────────────────────┘
```

---

## 🧩 Stack & Tooling

### Core Dependencies

- [React 19](https://react.dev/) - The library for web and native user interfaces
- [React Router 7](https://reactrouter.com/) - 声明式路由库，支持嵌套路由与数据加载
- [shadcn/ui](https://ui.shadcn.com/) - 基于 Radix 原语的可复制粘贴组件库
- [Tailwind CSS v4](https://tailwindcss.com/) - 原子化 CSS 框架
- [Remix Icon](https://remixicon.com/) - 开源图标库
- [Motion](https://motion.dev/) - 现代化动画库（Framer Motion 的继任者）
- [Font animation reference](https://variantvault.chrisabdo.dev/text-variants) - 字体动画参考
- [Simple Icons](https://simpleicons.org/) - 流行品牌 SVG 图标

### Tooling

- Node.js: Use `.nvmrc` for version management. Target `lts/iron`. `fnm` is recommended.
- [pnpm](https://pnpm.io/) - The package manager must be pnpm; use the LTS version.
- [.gitignore](https://git-scm.com/docs/gitignore/zh_HANS-CN) - Git ignore files
- [Prettier](https://prettier.io/) - Opinionated code formatter

### Environment Configuration

- [.env](https://env.t3.gg/docs/core) - Define environment variables validation for your app.
- Development: `.env.development.local`
- Production: `.env.production.local`

### Third-Party Libraries

- [ky](https://github.com/sindresorhus/ky) - Tiny & elegant JavaScript HTTP client based on the Fetch API
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) - 强大的异步状态管理，用于数据获取、缓存与同步
- [dayjs](https://day.js.org/zh-CN/) - 轻量级时间日期处理库
- [Zod](https://zod.dev/) - TypeScript-first 模式验证与静态类型推断
- [Zustand](https://zustand-demo.pmnd.rs/) - 小巧、快速、可扩展的状态管理方案
- [Sonner](https://sonner.emilkowal.ski/) - 优雅的 Toast 通知组件
- [neverthrow](https://github.com/supermacro/neverthrow) - 类型安全的错误处理（Result 模式）

### Web3 Domain-Specific

- [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum，类型安全的 EVM 交互
- [viem](https://viem.sh/) - 轻量、模块化的 TypeScript Ethereum 库
- [@reown/appkit](https://docs.reown.com/appkit/react/core/installation) - 开箱即用的钱包连接 UI 与管理（原 WalletConnect）

### Useful Resources

- [Fontsource](https://fontsource.org) - 自托管开源字体库，支持 npm 安装，提供可变字体与子集优化

---

## 🎨 shadcn/ui 主题定制

项目使用 **shadcn/ui**（base-vega 风格）作为组件库，配合 **Tailwind CSS v4**：

- **主题配置位置**：`src/app.css`
- **组件配置**：`components.json`
- **可配置项**：
  - CSS 变量定义主题色（amber 主题）
  - 支持明暗模式切换（通过 `dark` class）
  - 圆角、间距等通过 Tailwind 类控制

### 添加新组件

```bash
pnpm dlx shadcn@latest add [component]
pnpm dlx shadcn@latest diff [component]
```

参考文档：[shadcn/ui - Components](https://ui.shadcn.com/docs/components)

---

## 🛰️ Deployment

- [Vercel](https://vercel.com/docs/project-configuration) - Vercel project configuration
- [Cloudflare Pages](https://developers.cloudflare.com/pages/) - Cloudflare Pages
  - Recommend using Cloudflare Pages for deployment
  - Download your Pages project config `npx wrangler pages download config [project-name]`
- Static hosting: Deploy React Router like any other React SPA.

---

## 📦 更新策略

- 每月 10 号更新依赖（安全补丁 / 小版本更新 / 依赖适配）
- 重大版本会评估影响并视情况延后
- 欢迎在更新日前提交建议或 PR 🙌

## ✅ Todo List

### 核心功能增强

- [ ] **TanStack Query 优化**
  - [ ] 集成 [@lukemorales/query-key-factory](https://github.com/lukemorales/query-key-factory) 统一管理 queryKey
  - [ ] 提供完整示例：useQuery、useQueries、useMutation
  - [ ] 实现基于 Zod schema 的接口类型自动生成（替代手写类型）
  - [ ] 完善错误处理 UI 模式（Skeleton → 错误组件 / Toast）

- [ ] **Web3 钱包交互优化**
  - [ ] 根据连接状态类型推断 address 和 chainId（TypeScript 类型收窄）
  - [ ] 添加钱包未连接时的友好 UI 提示组件
  - [ ] 优化 useComputedState Hook 示例与文档

### 组件库完善

- [ ] **Callout 组件封装**
  - 支持类型：info / success / warning / error / default
  - 基于 shadcn/ui Alert 组件实现统一样式
- [ ] dark 主题使用是否正确？

### AI 辅助开发完善

- [ ] **项目配置文件**
  - [ ] 创建 `AGENTS.md` 和 `CLAUDE.md` - 定义项目规范、架构约定、最佳实践
    - 命名规范、目录规范、React Hooks、ky、TanStack Query、React Hook Form 三方库的使用文档
  - [ ] 补充需求文档模板与示例
  - [agents.md 规范](https://github.com/agentsmd/agents.md)

### 安全性增强

- [ ] **认证安全**
  - [ ] 实现基于 HttpOnly Cookie 的 Token 管理
  - [ ] 添加 CSRF 防护示例
  - [ ] 完善环境变量敏感信息处理文档
