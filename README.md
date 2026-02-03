# Bolt

> A fast, modular Web3 starter built with **React Router**, **shadcn/ui**, **Tailwind CSS**, **Motion**, and the latest in wallet tooling: **Wagmi**, **viem**, and **@reown/appkit**.

Bolt 基于 React Router、shadcn/ui、Tailwind CSS、Motion 以及钱包工具（Wagmi、viem 和 @reown/appkit）构建的前端模板。

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

## 🤖 AI Coding Support

本项目已内置 AI coding 支持，适配常见开发工具与协作流程：

- **Codex** — 通过 `AGENTS.md` 约束项目规范与工作流
- **Claude Code** — 通过 `CLAUDE.md` 提供编码指引
- **Gemini CLI** — 通过 `AGENTS.md` 约束项目规范与工作流

建议在使用 AI 辅助开发前先阅读上述文件，确保输出符合项目规范。

---

## 📦 更新策略

- 每月 10 号更新依赖（安全补丁 / 小版本更新 / 依赖适配）
- 重大版本会评估影响并视情况延后
- 欢迎在更新日前提交建议或 PR 🙌

## ✅ Todo List

### 核心功能增强

- [ ] **TanStack Query 优化**
  - [ ] 实现基于 Zod schema 的接口类型自动生成（替代手写类型）

- [ ] **Web3 钱包交互优化**
  - [ ] 根据连接状态类型推断 address 和 chainId（TypeScript 类型收窄）
  - [ ] 添加钱包未连接时的友好 UI 提示组件

### 组件库完善

- [ ] **Callout 组件封装**
  - 支持类型：info / success / warning / error / default
  - 基于 shadcn/ui Alert 组件实现统一样式
- [ ] ky 封装

### AI 辅助开发完善

- [ ] **项目配置文件**
  - [ ] 创建 `AGENTS.md` 和 `CLAUDE.md` - 定义项目规范、架构约定、最佳实践
  - [ ] 补充需求文档模板与示例

### 安全性增强

- [ ] **认证安全**
  - [ ] 实现基于 HttpOnly Cookie 的 Token 管理
  - [ ] 添加 CSRF 防护示例
  - [ ] 完善环境变量敏感信息处理文档
