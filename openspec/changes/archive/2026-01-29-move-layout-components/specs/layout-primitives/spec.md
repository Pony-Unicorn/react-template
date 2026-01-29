## MODIFIED Requirements

### Requirement: Layout Components Organization
布局原语组件（Box, Flex, Grid）必须存放在专门的布局组件目录下，而非通用的 UI 组件目录，以确保组件库结构的逻辑性。

#### Scenario: 目录迁移
- **WHEN** 检查文件系统
- **THEN** `src/components/layout/` 目录下包含 `box.tsx`, `flex.tsx`, `grid.tsx` 和 `layout-utils.ts`
- **AND** `src/components/ui/` 目录下不再包含这些文件

#### Scenario: 导入路径更新
- **WHEN** 在项目中搜索 `Box`, `Flex` 或 `Grid` 的引用
- **THEN** 所有 import 语句指向 `~/components/layout/...` 而非 `~/components/ui/...`
