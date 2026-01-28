# Architectural Decisions - UI Optimization

## Key Decisions

- **警告文本颜色**: 使用 `text-muted-foreground` 而非 `text-orange-500`
- **状态 Badge**: 使用 variant 属性 (default/secondary) 而非硬编码背景色
- **FuzzyText 颜色**: 保持 `#ee9a00ff` (已接近 amber 主题，Canvas 无法读取 CSS 变量)
- **页面最大宽度**: Home 全宽，其他页面 `max-w-4xl`
- **统一间距**: 页面 `py-8 px-6`, Card 间距 `gap-6`

(Subagents will append findings here)
