# Bolt

> A fast, modular Web3 starter built with **React Router**, **shadcn/ui**, **Tailwind CSS**, **Motion**, and the latest in wallet tooling: **Wagmi**, **viem**, and **@reown/appkit**.

Bolt 基于 React Router、shadcn/ui、Tailwind CSS、Motion 以及最新钱包工具（Wagmi、viem和@reown/appkit）构建的前端模版。

---

## ⚡️ 特性 Features

- 🧱 **React Router + shadcn/ui** — 强大且现代的全栈 UI 架构
- 🎨 **Tailwind CSS** — 原子化 CSS，快速搭建响应式 UI
- 🌀 **Framer Motion** — 炫酷且顺滑的动画体验
- 🔐 **Wagmi + viem** — 下一代 EVM 钱包交互工具
- 🚀 **@reown/appkit** — 一站式 DApp 构建集成方案
- 🧹 **Prettier** — 代码风格统一
- ⚙️ **约定式目录结构** — 支持合约 ABI、env 环境变量、类型声明等规范组织
- ⏱ **开箱即用** — 快速启动，支持拓展与定制
- [编码规范](https://www.yuque.com/pony13500815917/computer/1556e1e356e8b8d24ea1540304921f61)

快速启动，模块清晰，组件现代，Bolt 是你构建下一代 Web3 应用的理想起点。

---

## 📦 更新策略

- 每月 10 号定期更新所安装的前端依赖（如 npm 包等），以保持项目的安全性和兼容性。更新内容包括但不限于：
  - 安全补丁与漏洞修复
  - 小版本功能更新
  - 与主要依赖库的适配更新
- 如遇重大版本更新，会根据变更内容评估其影响，并视情况推迟合并。
- 欢迎社区成员在该日之前提交依赖更新的建议或 PR 🙌

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
pnpm run dev
```

- Deploy - cloudflare page

```bash
pnpm run deploy
```

---

## ⌨️ 开发规范

- 强烈推荐需要 UI 中显示的值，单独设置一个 UI 值，例 `tokenPrice => uiTokenPrice`
- UI 中的网络请求必须使用 Tanstack Query
  - 读（useQuery、useQueries）不准使用 Toast 提示
  - 读失败应在整个区域或卡片中显示错误信息
  - 读需要手动刷新（refetch）可使用 Toast 作为提示
  - 需要手动触发刷新的需要设置 enabled: false
  - 写（useMutation），可使用 toast 提示
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

## 🧱 Core Dependencies

- [react](https://react.dev/) - The library for web and native user interfaces
- [react router](https://reactrouter.com/start/framework/routing) - React Router
- [TailwindCSS](https://tailwindcss.com) – Utility-first CSS framework for rapid UI development
- [Radix](https://www.radix-ui.com/) – Primitives like modal, popover, etc. to build a stellar user experience
- [shadcn/ui](https://ui.shadcn.com) - components are included in the `/components/ui` folder
- [lucide](https://lucide.dev/) – Beautiful & consistent icons Made by the community.
- [Motion](https://www.framer.com/motion/) – A modern animation library
- [Font animation reference](https://variantvault.chrisabdo.dev/text-variants)
- [Simple Icons](https://simpleicons.org/) - popular brands svg

## 🛠️ Tooling

- Node Js: Use .nvmrc file for management, the version is lts/iron, it is recommended to use fnm as version management
- [pnpm](https://pnpm.io/) - The package manager must be pnpm, and the recommended version is the LTS version.
- [.gitignore](https://git-scm.com/docs/gitignore/zh_HANS-CN) - Git ignore files
- [prettier](https://prettier.io/) - Prettier is an opinionated code formatter

## ⚙️ Environment Configuration

- [.env](https://env.t3.gg/docs/core) - define environment variables validation for your app.
- development .env.development.local
- production .env.production.local

## Third-Party Libraries

- [ky](https://github.com/sindresorhus/ky) - Tiny & elegant JavaScript HTTP client based on the Fetch API
- [TanStack Query](https://tanstack.com/query/v5/docs/framework/react/quick-start) - React Hooks library for data requests
- [dayjs](https://day.js.org/zh-CN/) - Lightweight processing time and date library
- [react-hook-form](https://react-hook-form.com/) - Form validation library
- [zod](https://zod.dev/) - TypeScript-first schema validation with static type inference
- [zustand](https://zustand-demo.pmnd.rs/) A small, fast, and scalable bearbones state management solution.

## 🌐 Domain-specific

- [Wagmi](https://wagmi.sh/) - Wagmi Reactivity for Ethereum apps
- [viem](https://viem.sh/) - Ethereum library
- [@reown/appkit](https://docs.reown.com/appkit/next/core/installation) - Wallet connection manager

## 🤖 AI Development

- [rules](https://cursor.directory/rules) - 规则参考
- [cursor](https://www.cursor.com/cn) - AI Code Editor
  - `.cursor/rules`: [Rules](https://docs.cursor.com/context/rules#domain-specific-guidance) for Cursor AI-assisted development

## 🛰️ Deployment

- [vercel](https://vercel.com/docs/project-configuration) - vercel Configuring projects
- [Cloudflare Pages](https://developers.cloudflare.com/pages/) - Cloudflare Pages
  - Recommend using Cloudflare Pages for deployment
  - Download your Pages project config `npx wrangler pages download config <PROJECT_NAME>`
- Static Hosting, When deploying to static hosting, you can deploy React Router the same as any other single page application with React.

## Shadcn/ui Theme Tooling

- [tweakcn](https://tweakcn.com/) - 近乎完美的主题生成器，自定义颜色、字体和布局，以及 AI 生成并实时预览
- [tinte](https://www.tinte.dev/shadcn) - 自带 4000+ 主题同时支持 AI 生成
- [rlabs generate](https://shadcn.rlabs.art/generate) - 功能单一的主题生成器，默认也有很多主题可选
- [10000+ Themes](https://ui.jln.dev/) - 10000+ 的主题

## 📁 Project directory structure

```
app/
├── app.css # 全局样式文件，只允许有这一个 css 文件

├── features/ # 业务模块。例如首页、登录、用户中心等，小型项目分散到 routes hooks 等中
│ └── dashboard/
│ ├── index.tsx # 页面
│ ├── ChartPanel.tsx # 专属组件
│ ├── StatsCard.tsx # 专属组件
│ ├── useProfile.ts # 专属 hook
│ ├── api.ts        # 专属接口
│ └── types.ts # 专属类型定义

├── components/ # 通用组件
│ ├── ui/ # shadcn/ui 自动生成的 UI 组件
│ ├── react-bits/ # react-bits 自动生成的 UI 组件
│ ├── shared/ # 多页面复用组件（如 Header、Footer）
│ └── elements/ # 小型功能组件（如 Modal、Toast、Loading）

├── constants/ # 所有配置文件和常量
│ ├── api.ts # 接口地址配置
│ ├── MyToken.abi.json/ts # 合约 ABI 文件
│ ├── app.ts # 应用配置（如主题、模式）
│ ├── env.ts # 环境变量
│ └── uiLabels.ts # 按钮/标题等文案常量

├── context/ # 所有 Context/Provider 相关的逻辑
│ └── AppKitProvider.tsx # AppKit evm wallet

├── hooks/ # 自定义 Hook
│ ├── useComputedState.ts # 维护「真实值」与「派生显示值」
│ └── useDebounce.ts

├── services/ # 按领域聚合接口（auth、user、order、dashboard…）和少量业务处理
│ ├── auth.ts # 登录相关接口 & 业务操作
│ └── user.ts # 用户相关接口操作

├── lib/ # 第三方库的封装（如 ky、shadcn/ui 工具函数的封装）属于“外部库的适配器”
│ ├── ky.ts # ky 实例，对 ky 的二次封装
│ └── utils.ts # shadcn/ui 的 `cn` 函数自动生成

├── types/ # 类型声明与接口定义
│ ├── user.d.ts # 全局声明类型
│ └── api.d.ts # 接口响应结构，api 接口声明在这里

├── utils/ # 通用工具函数，例如格式化地址、校验邮箱等，属于“业务无关的自定义纯工具”
│ ├── common.ts # 通用工具函数
│ ├── format.ts # 日期/金额、钱包地址等所有格式化工具类
│ └── validate.ts # 所有验证工具类

docs/
├── api.md # api 文档
├── overview.md # 项目概述
├── architecture.md # 项目架构

llms/ # llms 文档目录
├── shadcn-ui-llms.txt # shadcn/ui 例 curl -L https://ui.shadcn.com/llms.txt -o shadcn-ui-llms.txt
```

## 常用命令

- 使用 shadcn 命令行安装其他组件，自定义安装路径 `-p app/components/react-bits`
- 查看当前有哪些包已过时 `pnpm outdated`
- 升级到 semver 范围内的最新版本 `pnpm up`
- 将依赖升级到最新版本 `pnpm up -L axios`

## ✅ Todo List

- [ ] 部署 cf 命令
- [ ] 修复控制台错误
- [ ] 增加对应的 mcp 服务
- [ ] ky，对幂等请求加自动重试（useQuery好像带自动重试），结合后端库，TypeScript：给返回值一个“强类型出口”
- [ ] 优化 tanstack query，添加 @lukemorales/query-key-factory 的支持和例子
  - 读操作不要使用 toast 提示（可使用静态组件显示错误），刷新读取可使用 toast
  - 写操作手动触发，可使用 toast 提示，参考 https://tanstack.com/query/latest/docs/framework/react/quick-start
  - 需要手动点击刷新，需要 enabled: false 设置
  - useQuery、useQueries、useMutation 常用 hooks 给出示例
- [ ] react 自定义组件、hooks
  - useComputedState
  - react 问题，根据是否链接推断出 address 和 chainid 是否拥有
  - 添加专门钱包没有链接的处理UI显示
- [ ] UI
  - 优化 UI 和一些描述文字
- [ ] 字体: 字体下载到本地使用避免开发中获取不到谷歌字体问题
- [ ] 安全性，token 基于 only Cookie
