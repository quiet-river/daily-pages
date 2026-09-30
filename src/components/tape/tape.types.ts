import type { CSSProperties, HTMLAttributes } from 'react'

export type TapeVariant = 'solid' | 'stripe' | 'dot' | 'torn'
export type TapeTone = 'lemon' | 'rose' | 'mint' | 'lilac'
export type TapePart = 'root' | 'surface'
export type TapeStyle = CSSProperties

/** A decorative piece of washi paper. Place it with normal CSS; no canvas required. */
export interface TapeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'style'> {
  variant?: TapeVariant
  tone?: TapeTone
  /** Override the cut independently of the pattern. */
  edge?: 'straight' | 'torn'
  /** Paper transparency, from 0 to 1. Defaults to .85. */
  opacity?: number
  /** Degrees. Omit to use the original design's angle for each variant. */
  rotation?: number
  /** Numeric dimensions are pixels; strings allow %, rem, clamp(), etc. */
  width?: number | string
  height?: number | string
  classNames?: Partial<Record<TapePart, string>>
  style?: TapeStyle
}
