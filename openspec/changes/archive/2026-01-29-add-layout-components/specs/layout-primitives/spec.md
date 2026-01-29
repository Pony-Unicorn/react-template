## ADDED Requirements

### Requirement: Box Component
Box 组件应当作为一个通用的容器组件，支持通过 Props 设置常用的布局样式（Margin, Padding, 尺寸, Display）。

#### Scenario: 渲染默认标签
- **WHEN** 使用 `<Box>Content</Box>`
- **THEN** 渲染为一个 `div` 标签，包含 `Content`

#### Scenario: 设置 Padding 和 Margin
- **WHEN** 使用 `<Box p="4" m="2" />`
- **THEN** 渲染的元素包含 `p-4 m-2` 类名（或其他对应的 Tailwind 类）

#### Scenario: 设置尺寸
- **WHEN** 使用 `<Box width="full" height="10" />`
- **THEN** 渲染的元素包含 `w-full h-10` 类名

### Requirement: Flex Component
Flex 组件应当继承 Box 的所有属性，默认应用 Flexbox 布局，并额外支持 Flex 相关的布局属性。

#### Scenario: 默认行为
- **WHEN** 使用 `<Flex />`
- **THEN** 渲染为一个 `div`，且包含 `display: flex` 对应的类名 (如 `flex`)

#### Scenario: 设置方向和对齐
- **WHEN** 使用 `<Flex direction="column" align="center" justify="between" />`
- **THEN** 渲染的元素包含 `flex-col items-center justify-between` 类名

#### Scenario: 设置 Gap 和 Wrap
- **WHEN** 使用 `<Flex gap="4" wrap="wrap" />`
- **THEN** 渲染的元素包含 `gap-4 flex-wrap` 类名

### Requirement: Grid Component
Grid 组件应当继承 Box 的所有属性，默认应用 CSS Grid 布局，并额外支持 Grid 相关的布局属性。

#### Scenario: 默认行为
- **WHEN** 使用 `<Grid />`
- **THEN** 渲染为一个 `div`，且包含 `display: grid` 对应的类名 (如 `grid`)

#### Scenario: 设置列数和间距
- **WHEN** 使用 `<Grid columns="3" gap="4" />`
- **THEN** 渲染的元素包含 `grid-cols-3 gap-4` 类名

#### Scenario: 设置 Flow 和 Rows
- **WHEN** 使用 `<Grid flow="row" rows="2" />`
- **THEN** 渲染的元素包含 `grid-flow-row grid-rows-2` 类名
