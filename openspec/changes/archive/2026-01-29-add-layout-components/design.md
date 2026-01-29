## Context
当前项目使用 Tailwind CSS 进行样式开发。虽然灵活，但缺乏一套标准的布局组件，导致代码中充斥着重复的布局类名（如 `flex items-center justify-between`）。为了提升开发体验和代码语义化，我们将实现一套模仿 Radix UI Themes API 的布局组件。

## Goals / Non-Goals

**Goals:**
*   实现 `Box`, `Flex`, `Grid` 三个核心布局组件。
*   提供严格的 Props 到 Tailwind Classes 的映射，确保类型安全和构建工具（Tailwind Compiler）的可检测性。
*   保持 API 与 Radix UI Themes 高度一致，降低学习成本。

**Non-Goals:**
*   不实现多态性（asChild 或 as 属性），所有组件固定渲染为 `div`。
*   不实现所有 Tailwind 工具类的 Props 映射（如颜色、字体等），仅专注于布局（Layout）相关的属性。
*   不实现运行时动态生成类名（如 `p-${value}`），以避免 Tailwind 提取失败的问题。

## Decisions

### 1. 属性映射策略 (Prop Mapping Strategy)
我们将使用**静态映射对象 (Static Mapping Objects)** 而非动态字符串拼接。
*   **Rationale**: Tailwind CSS (尤其是 v4) 依赖静态分析来提取类名。如果使用 `className={`p-${p}`}` 这种动态拼接，Tailwind 无法在构建时识别出需要生成的 CSS 类，除非配置庞大的 safelist（这会严重影响性能和体积）。
*   **Implementation**: 创建一个 `props-map.ts` 文件，定义如 `align: { center: 'items-center', start: 'items-start' }` 的映射表。

### 2. 组件复用与继承
`Flex` 和 `Grid` 将基于 `Box` 构建，或者共享底层的样式解析逻辑。
*   **Rationale**: 避免代码重复。`margin`, `padding`, `width`, `height` 等属性对所有布局组件都是通用的。
*   **Implementation**: 实现一个通用工具函数，解析共有属性并转换为 Tailwind 类。

## Risks / Trade-offs
"4" className="lg:p-8" />`），或者我们在后续迭代中通过严格映射所有的 `sm:*`, `md:*` 变体来实现（但这会显著增加映射表大小）。初版保持简单。

## Risks / Trade-offs

*   **Risk**: 映射表可能变得庞大。
    *   **Mitigation**: 仅映射常用的 Tailwind 刻度（如 spacing 0-12, 16, 20, 24...），不映射所有可能的值。对于非常规值，鼓励使用 `className`。
*   **Risk**: Props 覆盖优先级问题。
    *   **Mitigation**: 使用 `tailwind-merge` (`cn` 工具函数) 确保 `className` 传入的样式优先级高于 Props 生成的样式，给予用户最终控制权。
