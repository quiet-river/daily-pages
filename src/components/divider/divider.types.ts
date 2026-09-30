import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type DividerVariant = 'basic' | 'wave' | 'path' | 'stitch' | 'annotation' | 'timeline'
export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerPart = 'root' | 'line' | 'label' | 'points' | 'point'
export type DividerPoint = { label?: ReactNode; active?: boolean; tone?: 'lemon' | 'rose' | 'mint' | 'lilac' }
export type DividerStyle = CSSProperties

export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  variant?: DividerVariant
  orientation?: DividerOrientation
  label?: ReactNode
  points?: DividerPoint[]
  children?: ReactNode
  classNames?: Partial<Record<DividerPart, string>>
  style?: DividerStyle
  /** Line width, number in pixels or any CSS length. */
  length?: number | string
}
