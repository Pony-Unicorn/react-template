## Context

目前布局组件存放在 `src/components/ui/`，该目录通常由 `shadcn/ui` 维护。为了避免混淆，需要迁移。

## Goals / Non-Goals

**Goals:**
- 创建 `src/components/layout/` 目录。
- 移动 Box, Flex, Grid 及其工具函数。
- 保持组件功能完全一致。

**Non-Goals:**
- 不对组件代码进行重构或功能修改。

## Decisions

### 1. 目标目录命名
选择 `src/components/layout/` 而非 `primitives/`。
- **Rationale**: 布局组件的功能非常明确，即处理页面结构，`layout` 命名更具描述性且符合直觉。

### 2. 迁移方式
- **Implementation**: 手动移动文件，并利用全局搜索替换更新所有相关引用。由于当前项目中这些新组件的使用点较少，手动替换比脚本处理更安全可控。

## Risks / Trade-offs

- **Risk**: 遗漏某些文件中的导入路径更新。
- **Mitigation**: 使用 `grep` 或编辑器全局搜索 `from '~/components/ui/box'` 等关键字进行彻底检查。
