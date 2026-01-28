# UI 优化 - 配色、布局、间距

## TL;DR

> **Quick Summary**: 优化 Web3 模板项目的 UI，移除硬编码颜色改用语义色，统一页面间距和布局规范
>
> **Deliverables**:
>
> - 移除所有硬编码颜色 (orange-500, green-600 等)
> - 统一页面容器间距 (py-8 px-6)
> - 统一内容页最大宽度 (max-w-4xl)
> - 统一 Card 间距 (gap-6)
> - 调整 Home 页 Grid 为 2 列布局
>
> **Estimated Effort**: Quick (< 1 小时)
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 → Task 4 → Task 5

---

## Context

### Original Request

优化所有页面 UI 的配色、布局、间距，尽量不要自定义颜色。

### Interview Summary

**Key Discussions**:

- 警告/提示文本: 使用 `text-muted-foreground` (低调风格)
- 状态 Badge: 成年用 `variant="default"`, 未成年用 `variant="secondary"`
- FuzzyText 颜色: 保持 `#ee9a00ff` (已接近 amber 主题)
- 页面内边距: 统一 `py-8 px-6`
- Card 间距: 统一 `gap-6`
- Home Grid: 改为 2/2 列布局

**Research Findings**:

- 项目使用 shadcn/ui + Tailwind CSS v4 + oklch 颜色系统
- 已定义完整语义色变量 (primary, secondary, muted, destructive)
- 硬编码颜色位置: Contract.tsx (134,153), Preview.tsx (198-201), NotFound.tsx (23)

### Metis Review

**Identified Gaps** (addressed):

- FuzzyText 无法读取 CSS 变量 → 保持现有颜色
- Home 页是否需要 max-w 限制 → 保持全宽
- About 页 Card 居中布局是否需要调整 → 应用 max-w-4xl

---

## Work Objectives

### Core Objective

移除硬编码颜色，统一页面间距和布局规范，提升 UI 一致性。

### Concrete Deliverables

- `src/routes/Contract.tsx` - 移除 text-orange-500
- `src/routes/Preview.tsx` - 移除 Badge 硬编码颜色
- `src/routes/About.tsx` - 统一间距和最大宽度
- `src/features/demo/Home.tsx` - 统一间距，调整 Grid 布局
- `src/components/shared/NotFound.tsx` - 保持现状 (FuzzyText 颜色符合主题)

### Definition of Done

- [ ] `grep -r "text-orange" src/` 无匹配
- [ ] `grep -r "bg-green-" src/` 无匹配
- [ ] `grep -r "bg-orange-" src/` 无匹配
- [ ] 所有内容页使用 `max-w-4xl mx-auto` (除 Home 页)
- [ ] 所有页面使用 `py-8 px-6` 内边距
- [ ] Home 页 Grid 在 md 断点显示 2 列
- [ ] 手动浏览验证所有页面视觉正常

### Must Have

- 使用 Tailwind/shadcn 语义色替代硬编码颜色
- 统一页面容器样式
- 保持响应式布局

### Must NOT Have (Guardrails)

- 不修改组件逻辑，只改样式类
- 不修改 app.css 或添加新 CSS 变量
- 不修改 FuzzyText 组件本身
- 不修改 SiteHeader、Footer 组件
- 不修改 hover/focus 状态样式
- 不添加新的自定义颜色

---

## Verification Strategy (MANDATORY)

### Test Decision

- **Infrastructure exists**: NO
- **User wants tests**: Manual-only
- **Framework**: none

### If Manual QA Only

每个 TODO 包含详细的手动验证步骤，使用浏览器验证。

**Evidence Required:**

- 浏览器截图或手动确认
- 终端 grep 命令验证无硬编码颜色

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately):
├── Task 1: Contract.tsx 颜色修复
├── Task 2: Preview.tsx 颜色修复
└── Task 3: NotFound.tsx 确认 (无需修改)

Wave 2 (After Wave 1):
├── Task 4: Home.tsx 间距 + Grid 调整
├── Task 5: About.tsx 间距 + 最大宽度
├── Task 6: Contract.tsx 间距调整
└── Task 7: Preview.tsx 间距调整

Wave 3 (After Wave 2):
└── Task 8: 全局验证
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
| ---- | ---------- | ------ | -------------------- |
| 1    | None       | 6, 8   | 2, 3                 |
| 2    | None       | 7, 8   | 1, 3                 |
| 3    | None       | 8      | 1, 2                 |
| 4    | None       | 8      | 5, 6, 7              |
| 5    | None       | 8      | 4, 6, 7              |
| 6    | 1          | 8      | 4, 5, 7              |
| 7    | 2          | 8      | 4, 5, 6              |
| 8    | 1-7        | None   | None (final)         |

### Agent Dispatch Summary

| Wave | Tasks      | Recommended Agents                                                                      |
| ---- | ---------- | --------------------------------------------------------------------------------------- |
| 1    | 1, 2, 3    | delegate_task(category="quick", load_skills=["frontend-ui-ux"], run_in_background=true) |
| 2    | 4, 5, 6, 7 | dispatch parallel after Wave 1 completes                                                |
| 3    | 8          | final verification task                                                                 |

---

## TODOs

- [x] 1. Contract.tsx 移除硬编码警告颜色

  **What to do**:
  - 将 `text-orange-500` 替换为 `text-muted-foreground`
  - Line 134: "请先连接钱包" 提示
  - Line 153: "当前链不支持" 提示

  **Must NOT do**:
  - 不修改任何逻辑代码
  - 不修改其他样式类

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 单文件简单样式修改，< 5 分钟工作量
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: UI 样式修改，确保视觉一致性
  - **Skills Evaluated but Omitted**:
    - `playwright`: 不需要浏览器自动化验证
    - `git-master`: 不需要复杂 git 操作

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Task 6, Task 8
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - `src/routes/About.tsx:50` - 现有 `text-muted-foreground` 使用示例

  **Target File**:
  - `src/routes/Contract.tsx:134` - 第一处警告文本
  - `src/routes/Contract.tsx:153` - 第二处警告文本

  **Acceptance Criteria**:

  **Manual Execution Verification:**
  - [ ] 执行: `grep -n "text-orange" src/routes/Contract.tsx`
    - Expected: 无匹配结果
  - [ ] 浏览器打开 `/contract` 页面
    - 断开钱包连接，验证提示文本颜色为浅灰色
    - 切换到不支持的链，验证提示文本颜色为浅灰色

  **Commit**: YES (groups with Task 2)
  - Message: `style(ui): replace hardcoded colors with semantic tokens`
  - Files: `src/routes/Contract.tsx`
  - Pre-commit: N/A

---

- [x] 2. Preview.tsx 移除 Badge 硬编码颜色

  **What to do**:
  - 移除 Badge 的 `className` 覆盖，使用 variant 属性控制样式
  - Line 198-203: 将成年 Badge 改为 `variant="default"` (无额外 className)
  - 将未成年 Badge 改为 `variant="secondary"` (无额外 className)

  **Must NOT do**:
  - 不修改 Badge 组件本身
  - 不添加新的 CSS 类

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 单文件简单样式修改
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: UI 样式修改，Badge variant 使用

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Task 7, Task 8
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - `src/features/demo/Home.tsx:82-102` - 现有 Badge variant 使用示例
  - `src/components/ui/badge.tsx:11-18` - Badge 可用 variants: default, secondary, destructive, outline, ghost, link

  **Target File**:
  - `src/routes/Preview.tsx:196-205` - Badge 状态显示区域

  **Current Code**:

  ```tsx
  <Badge
    variant={isAdult ? 'default' : 'secondary'}
    className={
      isAdult
        ? 'bg-green-600 hover:bg-green-700'
        : 'bg-orange-500 text-white hover:bg-orange-600'
    }
  >
    {isAdult ? '成年' : '未成年'}
  </Badge>
  ```

  **Target Code**:

  ```tsx
  <Badge variant={isAdult ? 'default' : 'secondary'}>
    {isAdult ? '成年' : '未成年'}
  </Badge>
  ```

  **Acceptance Criteria**:

  **Manual Execution Verification:**
  - [ ] 执行: `grep -n "bg-green\|bg-orange" src/routes/Preview.tsx`
    - Expected: 无匹配结果
  - [ ] 浏览器打开 `/preview` 页面
    - 设置年龄 >= 18，验证 Badge 显示为 primary 颜色 (amber)
    - 设置年龄 < 18，验证 Badge 显示为 secondary 颜色 (浅灰)

  **Commit**: YES (groups with Task 1)
  - Message: `style(ui): replace hardcoded colors with semantic tokens`
  - Files: `src/routes/Preview.tsx`

---

- [x] 3. NotFound.tsx 颜色确认 (无需修改)

  **What to do**:
  - 确认 FuzzyText 的 `#ee9a00ff` 颜色已接近 amber 主题色
  - 保持现状，无需修改

  **Must NOT do**:
  - 不修改 FuzzyText 颜色
  - 不添加运行时 CSS 变量读取逻辑

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 仅验证确认，无实际修改
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 8
  - **Blocked By**: None

  **References**:

  **Target File**:
  - `src/components/shared/NotFound.tsx:23` - FuzzyText color prop

  **Acceptance Criteria**:

  **Manual Execution Verification:**
  - [ ] 浏览器访问不存在的路径 (如 `/nonexistent`)
    - 验证 FuzzyText 显示为橙黄色，与整体主题协调

  **Commit**: NO (无修改)

---

- [x] 4. Home.tsx 间距和 Grid 布局调整

  **What to do**:
  - 将容器 `p-6` 改为 `py-8 px-6`
  - 将 Grid 布局从 `lg:grid-cols-3` 改为 `md:grid-cols-2`
  - 将 Card 间距从 `gap-4` 改为 `gap-6`
  - 保持全宽布局 (不添加 max-w 限制)

  **Must NOT do**:
  - 不添加 max-w 限制
  - 不修改动画效果
  - 不修改内容

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 单文件样式调整
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: 响应式布局调整

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7)
  - **Blocks**: Task 8
  - **Blocked By**: None

  **References**:

  **Target File**:
  - `src/features/demo/Home.tsx:36` - 容器 div className
  - `src/features/demo/Home.tsx:53` - Grid className

  **Changes**:
  | Location | Current | Target |
  |----------|---------|--------|
  | Line 36 | `className="p-6"` | `className="py-8 px-6"` |
  | Line 53 | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` | `grid-cols-1 md:grid-cols-2 gap-6` |

  **Acceptance Criteria**:

  **Manual Execution Verification:**
  - [ ] 浏览器打开 `/` 首页
    - 验证顶部和底部有更大的垂直间距
    - 验证 Features 卡片在中等屏幕 (768px+) 显示为 2 列
    - 验证 Features 卡片间距为 1.5rem (24px)

  **Commit**: YES (groups with Tasks 5, 6, 7)
  - Message: `style(ui): unify page spacing and layout`
  - Files: `src/features/demo/Home.tsx`

---

- [x] 5. About.tsx 间距和最大宽度调整

  **What to do**:
  - 将容器 `p-6` 改为 `py-8 px-6 max-w-4xl mx-auto`
  - 将 Card 间距统一为 `gap-6`

  **Must NOT do**:
  - 不修改动画效果
  - 不修改 Card 内部样式

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 单文件样式调整
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6, 7)
  - **Blocks**: Task 8
  - **Blocked By**: None

  **References**:

  **Target File**:
  - `src/routes/About.tsx:33` - 容器 div className
  - `src/routes/About.tsx:138` - 技能卡片 Grid gap

  **Changes**:
  | Location | Current | Target |
  |----------|---------|--------|
  | Line 33 | `className="p-6"` | `className="py-8 px-6 max-w-4xl mx-auto"` |
  | Line 138 | `gap-4` | `gap-6` |

  **Acceptance Criteria**:

  **Manual Execution Verification:**
  - [ ] 浏览器打开 `/about` 页面
    - 验证内容在大屏幕上居中且有最大宽度限制
    - 验证顶部和底部有更大的垂直间距
    - 验证卡片间距统一

  **Commit**: YES (groups with Task 4)
  - Message: `style(ui): unify page spacing and layout`
  - Files: `src/routes/About.tsx`

---

- [x] 6. Contract.tsx 间距调整

  **What to do**:
  - 将所有容器的 `p-6 max-w-[800px]` 改为 `py-8 px-6 max-w-4xl`
  - 将 Card 间距从 `gap-4` 改为 `gap-6`

  **Must NOT do**:
  - 不修改表单逻辑
  - 不修改 Web3 交互代码

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 单文件样式调整
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 7)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1 (颜色修复先完成)

  **References**:

  **Target File**:
  - `src/routes/Contract.tsx:124` - 未连接钱包容器
  - `src/routes/Contract.tsx:143` - 不支持链容器
  - `src/routes/Contract.tsx:171` - 主内容容器
  - `src/routes/Contract.tsx:172` - Card 列表容器

  **Changes**:
  | Location | Current | Target |
  |----------|---------|--------|
  | Line 124 | `p-6 max-w-[800px] mx-auto` | `py-8 px-6 max-w-4xl mx-auto` |
  | Line 143 | `p-6 max-w-[800px] mx-auto` | `py-8 px-6 max-w-4xl mx-auto` |
  | Line 171 | `p-6 max-w-[800px] mx-auto` | `py-8 px-6 max-w-4xl mx-auto` |
  | Line 172 | `gap-4` | `gap-6` |

  **Acceptance Criteria**:

  **Manual Execution Verification:**
  - [ ] 浏览器打开 `/contract` 页面
    - 验证内容最大宽度为 896px (max-w-4xl)
    - 验证顶部和底部间距增加
    - 验证卡片之间间距为 1.5rem

  **Commit**: YES (groups with Task 4)
  - Message: `style(ui): unify page spacing and layout`
  - Files: `src/routes/Contract.tsx`

---

- [x] 7. Preview.tsx 间距调整

  **What to do**:
  - 将容器 `p-6 max-w-[800px]` 改为 `py-8 px-6 max-w-4xl`
  - 将 Card 间距从 `gap-8` 改为 `gap-6`

  **Must NOT do**:
  - 不修改状态管理逻辑
  - 不修改 Toast 演示代码

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 单文件样式调整
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 5, 6)
  - **Blocks**: Task 8
  - **Blocked By**: Task 2 (颜色修复先完成)

  **References**:

  **Target File**:
  - `src/routes/Preview.tsx:26` - 容器 div className
  - `src/routes/Preview.tsx:35` - Card 列表容器

  **Changes**:
  | Location | Current | Target |
  |----------|---------|--------|
  | Line 26 | `p-6 max-w-[800px] mx-auto` | `py-8 px-6 max-w-4xl mx-auto` |
  | Line 35 | `gap-8` | `gap-6` |

  **Acceptance Criteria**:

  **Manual Execution Verification:**
  - [ ] 浏览器打开 `/preview` 页面
    - 验证内容最大宽度为 896px
    - 验证顶部和底部间距增加
    - 验证三个 Card 之间间距统一为 1.5rem

  **Commit**: YES (groups with Task 4)
  - Message: `style(ui): unify page spacing and layout`
  - Files: `src/routes/Preview.tsx`

---

- [x] 8. 全局验证

  **What to do**:
  - 执行 grep 命令验证无硬编码颜色残留
  - 启动开发服务器，手动浏览所有页面
  - 验证明暗模式下样式正常

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 验证任务
  - **Skills**: [`playwright`, `frontend-ui-ux`]
    - `playwright`: 可选，用于浏览器自动化截图验证

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (final, sequential)
  - **Blocks**: None
  - **Blocked By**: Tasks 1-7

  **Acceptance Criteria**:

  **Terminal Verification:**
  - [ ] `grep -r "text-orange" src/` → 无匹配
  - [ ] `grep -r "bg-green-" src/` → 无匹配
  - [ ] `grep -r "bg-orange-" src/` → 无匹配

  **Browser Verification:**
  - [ ] `/` (Home) - 全宽布局，2 列 Grid，间距正常
  - [ ] `/about` - max-w-4xl 居中，间距正常
  - [ ] `/contract` - max-w-4xl 居中，警告文本为浅灰色
  - [ ] `/preview` - max-w-4xl 居中，Badge 使用语义色
  - [ ] `/nonexistent` - FuzzyText 显示正常

  **Dark Mode Verification (Optional):**
  - [ ] 切换到暗色模式，验证所有语义色正确响应

  **Commit**: YES
  - Message: `style(ui): complete UI optimization for colors and spacing`
  - Files: N/A (如有遗漏修复则包含)

---

## Commit Strategy

| After Task | Message                                                    | Files                                          | Verification |
| ---------- | ---------------------------------------------------------- | ---------------------------------------------- | ------------ |
| 1, 2       | `style(ui): replace hardcoded colors with semantic tokens` | Contract.tsx, Preview.tsx                      | grep 验证    |
| 4, 5, 6, 7 | `style(ui): unify page spacing and layout`                 | Home.tsx, About.tsx, Contract.tsx, Preview.tsx | 浏览器验证   |
| 8          | 无提交 (或有遗漏修复时提交)                                | -                                              | 最终验证     |

---

## Success Criteria

### Verification Commands

```bash
# 验证无硬编码颜色
grep -r "text-orange\|bg-green-\|bg-orange-" src/
# Expected: 无输出

# 启动开发服务器
pnpm dev
# 手动浏览 /, /about, /contract, /preview
```

### Final Checklist

- [x] 无硬编码颜色 (orange-500, green-600 等)
- [x] 所有内容页使用 max-w-4xl (除 Home)
- [x] 所有页面使用 py-8 px-6 内边距
- [x] 所有 Card 容器使用 gap-6 间距
- [x] Home Grid 在 md 断点显示 2 列
- [x] 明暗模式下样式正常 (semantic colors adapt automatically)
