# Daily Pages 组件库技术方案

> 状态：框架已搭建，Calendar、TitleFrame、Tape、PhotoFrame / FilmStrip、Stamp、Divider 已实现，等待视觉验收

## 名称与主题包

通用组件库名称确定为 **Daily Pages（日常页）**。`lemon-tea` 不再作为组件库总名，而作为后续可以接入的视觉主题包。这样基础组件和场景组件保持通用，主题只负责颜色、角色和装饰资产。

```text
Daily Pages
├── @daily-pages/ui
├── daily-pages Skill
└── themes/
    └── lemon-tea/
```

## 目标

把当前的视觉资产稿逐步沉淀成一个可以按需引入的 React 组件包。组件保持独立，用户可以只安装或引入自己需要的组件；每个组件都拥有独立的逻辑、实现、样式、Storybook 文档和单元测试。

首批范围仍然是六类基础资产：

- 标题框
- 胶带
- 照片与图片框
- 日历与日期
- 印章与标签
- 线条与分隔

“字体资产”和“贴纸资产”作为后续独立方向，暂时不让它们决定组件包结构。

## 技术选择

- **框架**：React + TypeScript
- **构建**：Vite Library Mode，多入口 ESM 构建
- **包管理**：pnpm；组件包拥有自己的 `package.json` 和 `pnpm-lock.yaml`
- **文档**：Storybook + `@storybook/react-vite`
- **测试**：Vitest + Testing Library
- **样式**：CSS Modules + CSS Custom Properties
- **发布形态**：ESM 优先，React 和 React DOM 作为 peer dependencies

Vite 的 Library Mode 支持多入口和 `package.json` 的 `exports` 映射，适合输出按组件拆分的入口；React Vite Storybook 可以复用 Vite 的开发配置，并为每个组件提供隔离预览和自动文档。

## 目录结构

```text
library/daily-pages/
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── index.ts
│   ├── shared/
│   │   ├── component.types.ts
│   │   ├── css-vars.ts
│   │   └── slots.ts
│   └── components/
│       ├── title-frame/
│       ├── tape/
│       ├── photo-frame/
│       ├── calendar/
│       ├── stamp/
│       └── divider/
└── dist/
```

每个组件目录保持同样的文件边界：

```text
calendar/
├── Calendar.tsx
├── calendar.logic.ts
├── calendar.types.ts
├── calendar.module.css
├── Calendar.stories.tsx
├── calendar.test.tsx
└── index.ts
```

`calendar.logic.ts` 只处理日期归一化、时间点和时间段计算、变体选择等纯逻辑；`Calendar.tsx` 只负责 React 结构、事件和可访问性；类型、样式、Storybook 和测试分别放在自己的文件中。逻辑文件不能依赖 React 或浏览器 DOM，这样可以单独测试和复用。

## Tree Shaking 和组件入口

组件包不使用运行时注册表，也不在导入时执行全局初始化。每个组件都有独立入口：

```ts
import { Calendar } from '@daily-pages/ui/calendar'
import { Tape } from '@daily-pages/ui/tape'
```

`package.json` 采用显式 `exports`：

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./calendar": "./dist/components/calendar/index.js",
    "./tape": "./dist/tape.js",
    "./calendar/style.css": "./dist/components/calendar/style.css",
    "./tape/style.css": "./dist/Tape.css"
  },
  "sideEffects": ["**/*.css"]
}
```

根入口仍然提供完整组件集合，深层入口保证按需引入。组件样式不自动污染全局；CSS 文件被声明为 side effect，避免生产构建时被错误移除。后续用一个最小消费项目验证：只引入 `calendar` 时，产物不包含 `tape`、`stamp` 和其他组件代码。

## 参数和样式扩展

组件 API 采用三层扩展方式：

1. **语义参数**：表达组件内容和行为，例如 `date`、`timeRange`、`variant`、`media`、`children`。
2. **视觉参数**：表达有限的视觉选择，例如 `tone`、`density`、`orientation`、`rotation`。
3. **开放样式接口**：提供根节点 `className`、必要时的 `classNames`、`style`、CSS Custom Properties、`data-state` 和 `data-part`，允许用户覆盖局部表现。

组件不把颜色、间距、圆角写死在 JSX 中。默认主题通过 CSS 变量提供，例如：

```css
--lt-paper
--lt-ink
--lt-accent
--lt-border
--lt-shadow
--lt-radius
```

`className` 的职责是覆盖组件根节点，`classNames` 只为少量稳定的内部部件提供挂钩，例如 `media`、`caption` 或 `label`。组件内部使用 CSS Modules，但不会要求用户依赖生成后的 hash 类名；有内部结构的组件会为局部节点提供稳定的 `data-part`，并在根节点提供 `data-component`、`data-variant` 和必要的 `data-state`。`slotProps` 只在确实需要给某个内部语义节点传入 `aria-*`、事件或属性时使用，避免把每个 DOM 节点都暴露成 API。

例如照片框可以这样定制：

```tsx
<PhotoFrame
  variant="film"
  className="journal-film"
  classNames={{ media: 'journal-film__media', caption: 'journal-film__caption' }}
  style={{ '--lt-film-gap': '10px' } as React.CSSProperties}
  media={photos}
/>
```

消费者自己的 CSS 只依赖公开的根类名、CSS 变量和 `data-part`：

```css
.journal-film {
  --lt-film-border: #d6a84f;
  --lt-film-gap: 10px;
  transform: rotate(-1deg);
}

.journal-film [data-part="caption"] {
  color: #76594e;
  letter-spacing: 0.04em;
}
```

这样既能从页面外部覆盖整体和局部视觉，也不会把组件内部 DOM 结构变成必须长期兼容的完整 API。`classNames` 只暴露有真实定制需求的部件，初版不提供通用的任意节点注入能力。

## 参数模型示例

日期组件使用可扩展的联合类型，覆盖日期、精确时间和时间段：

```ts
type TimeSpec =
  | { kind: 'point'; at: string }
  | { kind: 'range'; start: string; end?: string }

type CalendarValue = {
  date: string
  time?: TimeSpec
  context?: {
    location?: string
    weather?: string
    temperature?: string
    event?: string
  }
  metadata?: Record<string, unknown>
}
```

这样的模型可以先支持 `14:30` 和 `09:30—11:10`，后续再增加节气、跨日事件或自定义标记，而不用重新设计组件结构。

## Storybook 规范

每个组件至少提供以下故事：

- Default：默认形态
- Variants：所有视觉变体
- CustomStyle：自定义 CSS 变量和 `className`
- Composition：与其他基础资产组合
- EdgeCases：长标题、缺少可选信息、极窄宽度、跨日时间段等边界

Storybook 负责说明用途、参数、结构、变体和组合方式；它不承载业务页面。真实手帐页面继续放在 examples 或现有 research 页面中。

## 测试规范

每个组件至少有两层测试：

- `*.logic.test.ts`：测试纯逻辑，例如日期格式化、时间段归一化、变体映射和缺省值。
- `*.test.tsx`：测试可访问角色、内容渲染、状态属性、样式变量传递和关键交互。

首批验收命令：

```bash
pnpm test
pnpm storybook
pnpm build
pnpm test:tree-shaking
```

Tree Shaking 验证使用一个最小 fixture，分别构建只引入一个组件和引入完整入口的版本，比较输出中是否出现无关组件的标识。这个检查比只观察开发环境页面更能证明包的发布边界。

## 实施顺序

1. 在 `library/daily-pages` 建立独立包和 Vite、Storybook、Vitest 配置。
2. 先迁移 `title-frame`、`tape`、`photo-frame` 和 `calendar`，验证逻辑与实现分层。
3. 组合六类基础资产并开始场景组件验证。
4. 为六类组件补齐 Storybook 故事、逻辑测试和渲染测试。
5. 建立最小消费 fixture，验证深层入口、CSS 导出和 Tree Shaking。
6. 视觉稿稳定后，再把 `library/daily-pages` 整理为可单独发布到 GitHub 的目录。

## 面向 AI 的 Skill

组件库的主要使用对象是 AI，因此在组件包之外提供一个独立的 Skill 目录：

```text
skills/daily-pages/
├── SKILL.md
└── references/
    ├── component-catalog.md
    └── output-contract.md
```

这个 Skill 是说明和决策层，不是运行时服务，也不增加组件包的运行时依赖。它负责把用户的生活记录描述转换为：

```text
自然语言记录
  → 场景与时间语义
  → 基础组件与变体选择
  → 按需入口与样式覆盖
  → 可检查的 React 代码或结构化组件计划
```

Skill 的目录索引与组件包的公开入口、Storybook 故事保持一致。它要求 AI 使用最小组件集合，区分具体时刻和持续时间，保留 `className`、CSS Custom Properties、`data-part` 等扩展入口，并且不能自行发明尚未实现的组件或变体。

首批提供四类生活记录组合示例：今日一页、一餐一记、出门散步、心情天气；这些组合只是 AI 的推荐起点，实际结果仍根据用户内容删减。后续可以由脚本从组件元数据生成目录，避免 Skill 索引和组件实现逐渐漂移。

Skill 验收至少包括：

- 能从一句生活记录描述选出最小的组件集合。
- 日期输入能区分 `point` 和 `range`。
- 输出使用组件深层入口，不引入无关组件。
- 组件不存在的能力会被标记为缺口，而不是被 AI 虚构出来。
- `SKILL.md` 和参考文件通过 Skill 的结构校验。

## 当前边界

这一步先做组件包的技术骨架和可复用 API，不引入拖拽编辑器、画布系统、字体运行时、远程资源管理或场景组件。场景组件继续通过基础组件组合验证，等真实使用中出现稳定复用关系后再抽取。
