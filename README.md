# Daily Pages UI

面向生活记录页面的可组合 UI 资产包。它先提供基础组件，再通过场景组合表达收藏、发现、打卡、票据和日常片段。

## 当前状态

- 框架：React + TypeScript + Vite Library Mode
- 文档：Storybook
- 测试：Vitest + Testing Library
- 样式：CSS Modules + CSS Custom Properties
- 已完成：Calendar、TitleFrame、Tape、PhotoFrame / FilmStrip、Stamp、Divider
- 待验收：第一版基础资产的整体视觉一致性

## 开发

```bash
pnpm install
pnpm dev
pnpm test
pnpm run check-types
pnpm build
pnpm storybook
```

每个组件都保持独立入口，并把纯逻辑、React 实现、类型、样式、Storybook 和测试拆开。当前入口：

```ts
import { Calendar } from '@daily-pages/ui/calendar'
import '@daily-pages/ui/calendar/style.css'
```

## 本轮目标与验收

将已确认的基础组件设计稿转为独立可引用的 React 资产。本轮范围：标题框、胶带、照片框与胶片条、印章与分隔线。

成功信号：四种标题框与原稿形态一致；胶带能以透叠与撕边固定图片；胶片保留两侧密集孔洞；每个组件有独立入口、样式入口、类型、逻辑、测试和 Storybook。用户可以替换内容与局部样式。

视觉方向沿用早期手帐研究稿：奶油纸色、暖棕线条、粉黄绿色块、轻微旋转、撕边和实体拼贴结构。详细架构见 [Daily Pages architecture](https://github.com/quiet-river/daily-pages/blob/main/docs/architecture.md)。字体不绑定；页面排版由使用者决定。

未决问题：最终视觉需用户验收；包名尚未检查 npm 可用性；当前不发布到 npm。
