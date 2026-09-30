# Daily Pages UI 组件目录

本目录是给 AI 阅读的选择索引。它和组件包的公开入口、Storybook 故事保持一致；组件或变体发生变化时，需要同步更新这里。

当前研究页的历史 JSON 使用过 `photo`、`line` 这两个 id；组件包迁移时统一采用更明确的公开入口 `photo-frame`、`divider`。在迁移完成前，AI 应以本目录的组件名和深层入口为准，不把研究页历史 id 当成已发布的包入口。

## 基础组件

| 组件 | 入口 | 当前变体 | 适合表达 |
| --- | --- | --- | --- |
| `title-frame` | `@daily-pages/ui/title-frame` | `ribbon`、`tab`、`outline`、`side` | 标题、章节、短句的结构承载 |
| `tape` | `@daily-pages/ui/tape` | `solid`、`stripe`、`dot`、`torn`；可自由叠贴 | 固定照片、拼贴、制造手帐层次 |
| `photo-frame` / `film-strip` | `@daily-pages/ui/photo-frame` | `polaroid`、`corners`、`pocket`；`film` 独立导出 | 单图、多图、票据和胶片记录 |
| `calendar` | `@daily-pages/ui/calendar` | `day`、`month`、`week`、`date-label`、`time-point`、`time-range`、`date-weather` | 时间锚点、日期上下文、持续事件 |
| `stamp` | `@daily-pages/ui/stamp` | `mood-round`、`certification-square`、`postal`、`serial`、`page-label`、`overlap` | 心情、分类、归档、邮戳和强调 |
| `divider` | `@daily-pages/ui/divider` | `basic`、`wave`、`path`、`stitch`、`annotation`、`timeline` | 分组、连接、注释和时间顺序 |

## 变体选择提示

### 标题框 `title-frame`

- `ribbon`：有明确章节感，需要一个视觉焦点时。
- `tab`：像索引或活页标签，需要轻量分区时。
- `outline`：标题较长或需要中性容器时。
- `side`：标题放在页面边缘或作为纵向锚点时。

### 胶带 `tape`

- `solid`：稳定固定照片或票据。
- `stripe`：制造方向感和轻微倾斜。
- `dot`：增加轻快、可爱的节奏。
- `torn`：模拟手撕边，适合拼贴和票据。
- 多个 `Tape` 叠放：需要叠层固定或强调一组内容。

### 照片框 `photo-frame`

- `polaroid`：单张照片和短说明。
- `film`：通过 `FilmStrip` 独立导出连续瞬间；胶片两侧应保留密集格孔视觉。
- `corners`：不遮住图片内容的轻量装裱。
- `pocket`：票据、收据、卡片等需要“装入”的内容。
- `stacked`：多张照片的叠放关系。

### 日历与日期 `calendar`

- `day`：只强调某一天。
- `month`：需要月视图和多日定位。
- `week`：一周节奏或连续记录。
- `date-label`：页面角标或小型日期标签。
- `time-point`：具体发生时刻，如 `14:30`。
- `time-range`：持续事件，如 `09:30—11:10`；可以没有结束时间。
- `date-weather`：日期同时需要天气、地点或温度上下文。

### 印章与标签 `stamp`

- `mood-round`：心情或即时感受。
- `certification-square`：完成、确认或等级。
- `postal`：出行、寄存、地点和票据语气。
- `serial`：编号、归档和收藏。
- `page-label`：页内分类。
- `overlap`：压在照片或票据边缘作为层次。

### 线条与分隔 `divider`

- `basic`：普通分组。
- `wave`：轻松、可爱的分隔。
- `path`：路线、散步或事件流向。
- `stitch`：手工缝线或收藏感。
- `annotation`：把说明连接到图片或局部。
- `timeline`：多个时间点或事件顺序。

## 语义到组件的映射

| 用户意图关键词 | 首选组件 | 常见变体 |
| --- | --- | --- |
| 标题、章节、主题 | `title-frame` | `ribbon` / `tab` |
| 固定、贴住、拼贴 | `tape` | `solid` / `torn` |
| 一张照片、合照 | `photo-frame` | `polaroid` / `corners` |
| 连续瞬间、旅行片段 | `photo-frame` | `film` |
| 收据、票根、卡片 | `photo-frame` | `pocket` + `stamp/serial` |
| 某天、今天 | `calendar` | `day` / `date-label` |
| 几点发生 | `calendar` | `time-point` |
| 持续了一段时间 | `calendar` | `time-range` |
| 天气、地点、温度 | `calendar` | `date-weather` |
| 心情、喜欢、不喜欢 | `stamp` | `mood-round` |
| 完成、收藏、编号 | `stamp` | `certification-square` / `serial` |
| 出门、邮局、地点 | `stamp` | `postal` |
| 路线、过程、顺序 | `divider` | `path` / `timeline` |
| 注释、指向图片 | `divider` | `annotation` |

## 参数与样式约定

目录只索引公开 API，不发明页面级参数。优先使用以下通用扩展入口：

- 语义：`date`、`time`、`media`、`label`、`children`、`variant`
- 视觉：`tone`、`density`、`orientation`、`rotation`
- 样式：根节点 `className`、公开部件 `classNames`、`style`、CSS Custom Properties、`data-part`、`data-state`

如果需要一个当前不存在的变体，先说明缺口，再给出最接近的现有变体和建议的资产需求；不要在结果中假装该变体已经存在。
