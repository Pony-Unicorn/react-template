## Context

项目最近新增了 `Box`, `Flex`, `Grid` 布局组件，目前这些组件缺乏实际的使用案例展示。`src/routes/Preview.tsx` 是项目中用于组件预览和测试的页面。

## Goals / Non-Goals

**Goals:**
- 在 Preview 页面中增加布局组件的分类展示。
- 使用简单的背景色块来可视化展示布局效果（如 `bg-blue-500/20`）。

**Non-Goals:**
- 不创建独立的文档页面，仅在现有的 Preview 页面中添加。
- 不引入新的展示组件（如 Storybook 风格的组件），直接使用原始组件展示。

## Decisions

### 1. 展示组织方式
在 Preview 页面中，使用 `<section>` 或 `<Card>` (如果已有) 来包裹不同组件的示例。
- **Rationale**: 保持与现有 Preview 页面风格一致，方便对比。

### 2. 视觉反馈
使用 Tailwind 的背景色和边框色（如 `border-dashed`）来展示 `Box` 的边界和 `Flex/Grid` 的槽位。
- **Rationale**: 布局组件本身是不可见的，必须借助辅助样式才能直观展示。

## Risks / Trade-offs

- **Risk**: 示例过多导致 Preview 页面加载变慢或代码臃肿。
- **Mitigation**: 保持示例简洁，每个组件只展示 1-2 个核心场景。
