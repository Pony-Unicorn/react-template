## Why

`src/components/ui/` 目录在项目中约定俗成地用于存放 shadcn/ui 风格的原子组件。将自定义的布局原语组件（Box, Flex, Grid）放在此目录下会导致组件归类不清晰，增加维护成本。为了保持项目结构的整洁和直观，需要将这些纯布局相关的组件迁移到独立的目录中。

## What Changes

- **迁移文件**：将 `src/components/ui/` 下的 `box.tsx`, `flex.tsx`, `grid.tsx` 和 `layout-utils.ts` 迁移到新创建的目录 `src/components/layout/`（或 `src/components/primitives/`）。
- **更新导入引用**：全局搜索并更新所有引用了上述组件的导入路径。

## Capabilities

### New Capabilities
<!-- 无新功能需求 -->

### Modified Capabilities
- `layout-primitives`: 更新组件的存放位置和组织结构。

## Impact

- **文件结构**：`src/components/ui/` 目录将变干净，仅保留 shadcn/ui 组件。
- **引用变更**：项目中所有使用 `Box`, `Flex`, `Grid` 的文件都需要更新 import 语句。
