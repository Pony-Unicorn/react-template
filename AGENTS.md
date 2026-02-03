# AGENTS.md

## 项目概述

Bolt 前端模板（Web3 + AppKit）。

- 固定栈详见下文 Stack & Tooling
- 禁止替代：axios、MUI、Chakra、React Spring（除非明确批准）
- 交互与样式优先使用 shadcn/ui 体系
- 网络请求使用 ky，数据获取遵循 query key 规则

## 常用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本（TypeScript 类型检查 + Vite 构建）
pnpm preview      # 本地预览生产构建
pnpm format       # 检查代码格式
pnpm format-fix   # 自动修复代码格式
pnpm deploy       # 部署到 Cloudflare Pages
```

---

## Project directory structure

关键入口与配置（建议优先关注）：

- `src/main.tsx` 应用入口
- `src/App.tsx` Providers + Routes
- `src/Root.tsx` 布局（Header/Outlet/Footer）
- `src/app.css` 全局样式 + 主题变量
- `components.json` shadcn/ui 配置

```
src/
├── app.css            # 全局样式与主题变量
├── main.tsx           # 应用入口
├── App.tsx            # Providers + Routes
├── Root.tsx           # 布局（Header/Outlet/Footer）
├── assets/            # 静态资源（构建内联/优化用）
├── routes/            # 页面路由
├── features/          # 业务模块（示例：demo）
├── components/        # 通用组件（ui/shared/elements/react-bits）
├── lib/               # 工具库（cn 和三方库的二次封装，例如 kv 等）
├── context/           # Providers（AppKit/Wagmi 等）
├── constants/         # 配置与常量
├── hooks/             # 自定义 Hooks
├── store/             # Zustand 状态
├── services/          # API 与业务封装
├── types/             # TypeScript 类型
└── utils/             # 纯工具函数

public/                # 静态资源
docs/                  # 项目文档
llms/                  # AI 辅助开发文档
openspec/              # OpenSpec 变更与规范产物
```

常见任务位置索引：

- 路由页面：`src/routes`
- 共享布局/组件：`src/components/shared`
- shadcn/ui 组件：`src/components/ui`
- 全局样式/主题：`src/app.css`
- AppKit/Wagmi Provider：`src/context/AppKitProvider.tsx`

---

## 命名规范

- 文件/组件：`PascalCase`（页面/组件/组件文件名）
- 路由与普通文件：小写 `kebab-case`（如样式/静态资源）
- 变量/函数/对象字段：`camelCase`
- Hooks：`useXxx`（文件名与导出一致）
- 常量：`UPPER_SNAKE_CASE`
- querystring：按后端约定（常见 `snake_case`）
- 目录：通常使用复数（如 `constants`, `components`）

---

## Data Fetching & State

- **核心要求**：所有 UI 数据请求必须使用 TanStack Query。
- **反馈机制**：
  - **读 (Query)**：严禁使用 Toast。使用 Skeleton 或局部 Error 状态。
  - **写 (Mutation)**：允许使用 Toast (Sonner) 反馈结果。成功后应自动 `invalidateQueries`。
- **触发逻辑**：默认开启，需交互触发时设置 `enabled: false` 并调用 `refetch`。
- **数据流控制**：
  - 优先使用 `select` 进行数据派生。
  - 若需“展示值”与“真实值”分离（如表单），使用 `useComputedState`。
  - **空值约定**：`undefined` (加载中), `null` (明确为空)。
- **代码组织**：
  - **Query Key 工厂**：禁止手动拼写字符串 key，统一管理。
  - **Hooks 封装**：禁止在组件内直接写 `useQuery`，必须封装为 Custom Hook。

```typescript
// 1. 定义 Key (src/constants/query-keys.ts)
export const tokenKeys = {
  all: ['tokens'] as const,
  price: (id: string) => [...tokenKeys.all, 'price', id] as const,
}

// 2. 封装 Hook (src/hooks/useTokenPrice.ts)
export function useTokenPrice(id: string) {
  const { data: price } = useQuery({
    queryKey: tokenKeys.price(id),
    queryFn: () => ky.get(`api/price/${id}`).json<number>(),
    staleTime: 60 * 1000,
  })

  // 3. UI 派生 (结合 useComputedState)
  const { displayValue } = useComputedState<number | undefined>(
    undefined,
    (v) => (v === undefined ? '--' : `$${v}`)
  )

  useEffect(() => {
    setRealValue(price)
  }, [price])

  return { price, displayValue }
}
```

---

## Form Handling

- **核心要求**：所有表单必须使用 **React Hook Form** 配合 **Zod** 和 **shadcn/ui**。
- **架构模式**：
  - **Schema First**：优先定义 Zod Schema，通过 `z.infer` 导出 TS 类型。
  - **Controller Pattern**：使用 `Controller` (RHF) 配合 `Field` (shadcn) 组件，手动绑定状态。
- **最佳实践**：
  - **Default Values**：必须提供完整默认值，禁止 `undefined`。
  - **Loading State**：使用 `form.formState.isSubmitting`。
  - **Server Data**：编辑场景使用 `values` 属性自动同步数据。

```typescript
// 1. Schema & Type
const formSchema = z.object({
  username: z.string().min(2),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={form.control}
        name="username"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Username</FieldLabel>
            <Input
              {...field}
              placeholder="shadcn"
              aria-invalid={fieldState.invalid}
            />
            <FieldDescription>
              This is your public display name.
            </FieldDescription>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Button type="submit">Submit</Button>
    </form>
  )
}
```

---

## 常用代码模式 (Patterns)

### API 请求 (ky)

```typescript
import ky from 'ky'

// 简单 GET
const data = await ky.get('/api/users').json<User[]>()

// 带 Headers 的 POST
await ky
  .post('/api/auth', {
    json: { token },
    headers: { Authorization: `Bearer ${token}` },
  })
  .json()
```

### 错误处理 (utils/result)

使用 `src/utils/result.ts` 中的封装工具，而非手动 `try/catch`。

```typescript
import { toResult, safeJsonParse, safeSync } from '@/utils/result'

// 1. 异步：包装 Promise (返回 ResultAsync)
// 自动将 unknown 异常转换为标准 Error
const result = await toResult(ky.get('/api/data').json<UserResponse>())

if (result.isErr()) {
  // result.error 是标准 Error 对象
  console.error(result.error.message)
  return
}
const data = result.value

// 2. 同步：安全解析 JSON
const jsonResult = safeJsonParse<MyType>(rawString)

// 3. 同步：通用包装
const syncResult = safeSync(() => riskySyncOperation())
```

### 修改偏好

- 修改代码时，优先保持现有的导出接口不变。
- 仅修改内部逻辑，除非必须重构。

---

## shadcn/ui 主题定制

- 主题与变量：`src/app.css`（CSS 变量）
- 组件配置：`components.json`
- 明暗模式：通过 `dark` class 切换
- 组件管理：`pnpm dlx shadcn@latest add|diff [component]`

---

## Stack & Tooling

- UI: React 19 + React Router 7
- Components: shadcn/ui + Tailwind CSS v4 (配置位于 src/app.css，无 tailwind.config.js)
- Animation: Motion（不要使用 Framer Motion）
- HTTP: ky（禁止替代 fetch wrapper）
- Server state: TanStack Query（UI 数据请求必须用）
- State/validation/util: Zustand / Zod / dayjs / neverthrow / Sonner
- Web3: Wagmi / viem / `@reown/appkit`

### Environment

- Env validation: .env（@t3-oss/env-core）
- Development: `.env.development.local`
- Production: `.env.production.local`
