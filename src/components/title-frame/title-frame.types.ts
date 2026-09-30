import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type TitleFrameVariant = 'ribbon' | 'tab' | 'outline' | 'side'
export type TitleFramePart = 'root' | 'content' | 'badge'
export type TitleFrameStyle = CSSProperties

export interface TitleFrameProps extends HTMLAttributes<HTMLElement> {
  /** 框体形态；字体与字号继承使用页面。 */
  variant?: TitleFrameVariant
  /** 按文档层级选择标题元素；默认仅提供装饰容器。 */
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** 页签的可选序号或短标记，其他形态不显示。 */
  badge?: ReactNode
  classNames?: Partial<Record<TitleFramePart, string>>
  style?: TitleFrameStyle
}
