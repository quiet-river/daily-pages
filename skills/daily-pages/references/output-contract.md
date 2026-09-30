# Daily Pages UI AI 输出约定

这是 Skill 给 AI 的结果格式，当前用于规划和生成代码，不等同于组件包的运行时协议。可以输出自然语言加代码，也可以输出下面的 JSON 结构。

## 结构

```json
{
  "scene": "今日一页",
  "contentAssumptions": [
    "用户提供了一张当天的照片",
    "发生时间暂未提供"
  ],
  "components": [
    {
      "id": "calendar",
      "variant": "date-weather",
      "import": "@daily-pages/ui/calendar",
      "props": {
        "date": "2026-09-30",
        "time": {
          "kind": "point",
          "at": "14:30"
        }
      },
      "styleOverrides": {
        "className": "journal-date",
        "classNames": { "date": "journal-date__date" },
        "cssVariables": { "--lt-accent": "#d9a441" }
      }
    }
  ],
  "notes": [
    "天气和地点等待用户补充"
  ]
}
```

## 字段规则

- `scene`：简短的生活记录场景名。
- `contentAssumptions`：明确哪些内容来自用户，哪些只是待补充假设。
- `components`：只放本页实际使用的基础组件，顺序按页面阅读顺序排列。
- `id`：必须是组件目录中的组件 id。
- `variant`：必须是该组件当前存在的变体。
- `import`：必须是对应组件的深层入口，例如 `@daily-pages/ui/calendar`。
- `props`：只放组件公开 API 中存在的参数；未知信息留空，不用虚构值填充。
- `styleOverrides`：可以包含根节点 `className`、公开部件 `classNames` 和 `cssVariables`；复杂结构使用组件约定的 `data-part`，不要复制内部 DOM。
- `notes`：记录用户需要补充的信息、组合理由或暂时缺口。

## 时间数据

具体时刻：

```json
{
  "date": "2026-09-30",
  "time": { "kind": "point", "at": "14:30" }
}
```

持续时间：

```json
{
  "date": "2026-09-30",
  "time": { "kind": "range", "start": "09:30", "end": "11:10" }
}
```

还没有结束时间时：

```json
{
  "date": "2026-09-30",
  "time": { "kind": "range", "start": "09:30" }
}
```

## 代码输出

代码示例应使用独立入口：

```tsx
import { Calendar } from '@daily-pages/ui/calendar'
import { PhotoFrame } from '@daily-pages/ui/photo-frame'
import '@daily-pages/ui/calendar/style.css'
import '@daily-pages/ui/photo-frame/style.css'
```

不要从完整根入口导入无关组件，不要在页面代码中重复日期计算或变体映射逻辑。
