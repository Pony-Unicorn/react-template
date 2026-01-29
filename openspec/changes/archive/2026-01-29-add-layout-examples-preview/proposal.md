## Why

新引入的布局原语组件（Box, Flex, Grid）需要一个直观的展示页面，以便开发者了解其 API 使用方法并验证其在不同场景下的渲染效果。通过在 Preview 页面添加示例，可以快速发现潜在问题并作为项目文档的一部分。

## What Changes

- **更新 Preview 页面**：在 `src/routes/Preview.tsx` 中新增一个“布局组件 (Layout Components)”章节。
- **添加 Box 示例**：展示不同 Padding, Margin, 宽高以及 Display 属性的效果。
- **添加 Flex 示例**：展示不同方向 (direction)、对齐方式 (align, justify) 和间距 (gap) 的组合。
- **添加 Grid 示例**：展示网格列数 (columns)、行数 (rows) 和间距 (gap) 的布局效果。

## Capabilities

### New Capabilities
- `preview-examples`: 在预览页面中实现布局组件的交互式或静态示例展示。

### Modified Capabilities
<!-- 无 -->

## Impact

- **文件变更**：主要集中在 `src/routes/Preview.tsx`。
- **组件引用**：需要从 `src/components/layout/` 导入新组件。
