---
name: daily-pages
description: Use the Daily Pages life-recording component assets when generating or modifying AI-created life-recording pages, selecting components, choosing variants, composing scenes, and producing importable React code.
---

# Daily Pages UI Skill

这个 Skill 是 Daily Pages 组件库给 AI 使用的说明层。它负责把自然语言中的生活记录意图转换成组件选择、变体选择和可复用代码方案；它不是运行时服务，也不替代组件包本身。

## 何时使用

当用户要生成、修改或解释以下内容时使用：

- 生活记录、手帐页或记忆卡片
- Daily Pages 组件库中的基础资产
- 标题框、胶带、照片框、日期日历、印章标签、分隔线的组合
- React 组件按需引入、变体选择或自定义样式

在选择组件前先阅读：

- `references/component-catalog.md`：当前组件、变体和场景映射
- `references/output-contract.md`：AI 输出的结构约定

## 工作流程

1. **解析记录意图**：提取场景、内容、日期语义、时间点或时间段、地点、天气、心情和视觉倾向。未知内容保持空白或交给用户补充，不凭空编造。
2. **选择最小组件集合**：先选能表达内容的基础组件，再选视觉变体；不要为了填满页面默认使用全部组件。
3. **优先语义参数**：先传递 `date`、`time`、`media`、`label` 等内容参数，再使用 `variant`、`tone`、`density`、`rotation` 等视觉参数。
4. **保留开放样式**：用户需要调整整体视觉时使用 `className` 和 CSS Custom Properties，需要调整已公开的内部部件时使用 `classNames`、`data-part` 和 `data-state`；不要复制组件内部 DOM。
5. **处理日期语义**：具体时刻使用 `point`，持续事件使用 `range`；没有结束时间时保留开放时间段，不把它压成一个时间点。
6. **生成按需引用**：代码示例使用组件深层入口，例如 `@daily-pages/ui/calendar`，只导入当前页面需要的组件和样式。
7. **给出可检查的方案**：先列出场景、组件、变体和原因，再给代码或结构化输出。组件名、变体名和参数必须能在组件目录与 Storybook 中找到。

## 推荐的生活场景组合

这些是起始组合，不是固定模板。根据用户内容删减或替换：

- **今日一页**：`calendar/date-weather` + `title-frame/ribbon` + `photo-frame/polaroid` + `divider/basic`
- **一餐一记**：`calendar/time-point` + `photo-frame/polaroid` + `tape/solid` + `stamp/page-label`
- **出门散步**：`calendar/time-range` + `photo-frame/film` + `stamp/postal` + `divider/path`
- **心情天气**：`calendar/date-weather` + `stamp/mood-round` + `title-frame/tab` + `divider/annotation`
- **票据收藏**：`calendar/date-label` + `photo-frame/pocket` + `tape/torn` + `stamp/serial`

## 当前边界

- 当前基础资产只有标题框、胶带、照片与图片框、日历与日期、印章与标签、线条与分隔六类。
- 画布、通用文字系统、贴纸、装饰符号和拖拽编辑器不属于当前基础组件范围。
- 标题框只负责承载标题的结构，不绑定字体；字体资产以后单独设计。
- 不要把基础组件自动升级成场景组件；只有出现稳定复用关系后才提出抽取。
- 不要引入运行时注册表、全局初始化或远程资源服务来完成组件选择。

## 输出要求

每次生成方案时包含：

1. 场景名称和一句内容假设。
2. 使用的组件与变体列表。
3. 每个组件的语义参数和可调整的样式入口。
4. 只包含所选组件的深层 import 示例，或符合 `references/output-contract.md` 的结构化结果。
5. 仍待用户补充的内容，不把不确定的信息写成确定事实。

保持组件逻辑与实现的边界：AI 可以组合公开 API，不应在页面代码里复制日期计算、变体映射等逻辑；这些逻辑应由 Daily Pages 组件包自己的 `*.logic.ts` 提供。
