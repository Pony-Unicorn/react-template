## Why

目前在项目中构建布局时，直接使用 Tailwind CSS utility classes 虽然灵活，但会导致代码冗余且缺乏语义化约束。为了提高开发效率、统一布局规范并提升代码可读性，我们需要引入一套强类型的布局原语组件。这套组件将模仿 Radix UI Themes 的 API 设计，利用 Base UI 和 Tailwind CSS 的能力，提供符合直觉的布局体验。

## What Changes

*   **新增 `Box` 组件**：作为最基础的布局原语，支持 margin (`m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`), padding (`p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`), 宽高 (`width`, `height`), `display` 等属性。
*   **新增 `Flex` 组件**：继承自 `Box`，专门处理 Flexbox 布局。支持 `align`, `justify`, `direction`, `gap`, `wrap` 等标准 Flex 属性。
*   **新增 `Grid` 组件**：继承自 `Box`，专门处理 CSS Grid 布局。支持 `columns`, `rows`, `gap`, `areas`, `flow` 等 Grid 属性。
*   **严格属性映射 (Strict Prop Mapping)**：建立清晰的 Props 到 Tailwind classes 的映射关系，确保类型安全和自动补全。

## Capabilities

### New Capabilities
- `layout-primitives`: 定义 Box, Flex, Grid 组件的 API 规范、响应式属性处理策略及 Tailwind 类名映射规则。

### Modified Capabilities
<!-- 无现有能力变更 -->

## Impact

*   **文件变更**：在 `src/components/ui/` 目录下新增 `box.tsx`, `flex.tsx`, `grid.tsx` (或合并为 `layout.tsx`)。
