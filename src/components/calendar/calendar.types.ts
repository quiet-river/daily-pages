import type { CSSProperties, HTMLAttributes } from 'react'

export type CalendarVariant =
  | 'day'
  | 'month'
  | 'week'
  | 'date-label'
  | 'time-point'
  | 'time-range'
  | 'date-weather'

export type CalendarTone = 'paper' | 'lemon' | 'sky' | 'rose'
export type CalendarDensity = 'compact' | 'comfortable'

export type TimeSpec =
  | { kind: 'point'; at: string }
  | { kind: 'range'; start: string; end?: string }

export type CalendarContext = {
  location?: string
  weather?: string
  temperature?: string
  event?: string
}

export type CalendarValue = {
  date: string
  time?: TimeSpec
  context?: CalendarContext
  metadata?: Record<string, unknown>
}

export type CalendarPart =
  | 'root'
  | 'header'
  | 'weekday'
  | 'date'
  | 'month'
  | 'time'
  | 'context'
  | 'weather'
  | 'location'
  | 'event'
  | 'grid'
  | 'dayCell'
  | 'caption'

export type CalendarClassNames = Partial<Record<CalendarPart, string>>

export interface CalendarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: CalendarValue
  variant?: CalendarVariant
  locale?: string
  weekStartsOn?: 0 | 1
  tone?: CalendarTone
  density?: CalendarDensity
  classNames?: CalendarClassNames
  style?: CSSProperties
}
