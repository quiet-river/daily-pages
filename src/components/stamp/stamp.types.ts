import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

export type StampVariant =
  | 'mood-round'
  | 'certification-square'
  | 'postal'
  | 'serial'
  | 'page-label'
  | 'overlap'
export type StampTone = 'rose' | 'mint' | 'lemon' | 'lilac'
export type StampPart = 'root' | 'label' | 'text' | 'detail' | 'serial' | 'photo' | 'stamp' | 'labels'
export type StampClassNames = Partial<Record<StampPart, string>>

export type StampValue = {
  text?: string
  label?: string
  detail?: string
  serial?: string
  labels?: string[]
  photo?: ReactNode
}

export interface StampProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  variant?: StampVariant
  value?: StampValue
  text?: string
  label?: string
  detail?: string
  serial?: string
  labels?: string[]
  photo?: ReactNode
  tone?: StampTone
  classNames?: StampClassNames
  style?: CSSProperties
}
