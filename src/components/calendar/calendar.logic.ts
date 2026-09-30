import type { CalendarValue, TimeSpec } from './calendar.types'

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

export type DateParts = {
  year: string
  month: string
  day: string
  weekday: string
  monthLabel: string
}

export type CalendarDay = {
  isoDate: string
  day: number
  isCurrentMonth: boolean
  isToday: boolean
}

function toUtcDate(date: string): Date | null {
  const match = ISO_DATE.exec(date)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const result = new Date(Date.UTC(year, month - 1, day))
  if (
    result.getUTCFullYear() !== year ||
    result.getUTCMonth() !== month - 1 ||
    result.getUTCDate() !== day
  ) {
    return null
  }
  return result
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function isIsoDate(value: string): boolean {
  return Boolean(toUtcDate(value))
}

export function normalizeCalendarValue(value: CalendarValue): CalendarValue {
  if (!isIsoDate(value.date)) {
    throw new Error(`Calendar date must use a valid YYYY-MM-DD value: ${value.date}`)
  }
  return {
    ...value,
    date: value.date,
    context: value.context ? { ...value.context } : undefined,
  }
}

export function formatDateParts(date: string, locale = 'zh-CN'): DateParts {
  const value = toUtcDate(date)
  if (!value) {
    throw new Error(`Cannot format invalid calendar date: ${date}`)
  }
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' }).format(value)

  return {
    year: format({ year: 'numeric' }),
    month: format({ month: '2-digit' }),
    day: format({ day: '2-digit' }),
    weekday: format({ weekday: 'short' }),
    monthLabel: format({ year: 'numeric', month: 'long' }),
  }
}

export function formatTimeSpec(time?: TimeSpec): string | undefined {
  if (!time) return undefined
  if (time.kind === 'point') return time.at
  return time.end ? `${time.start}—${time.end}` : `${time.start}—`
}

export function getMonthKey(date: string): string {
  const parts = formatDateParts(date, 'en-US')
  return `${parts.year}-${parts.month}`
}

export function getMonthGrid(
  month: string,
  weekStartsOn: 0 | 1 = 1,
  today?: string,
): CalendarDay[] {
  const match = /^(\d{4})-(\d{2})$/.exec(month)
  if (!match) throw new Error(`Calendar month must use YYYY-MM: ${month}`)
  const year = Number(match[1])
  const monthIndex = Number(match[2]) - 1
  const firstDay = new Date(Date.UTC(year, monthIndex, 1))
  const offset = (firstDay.getUTCDay() - weekStartsOn + 7) % 7
  const start = new Date(Date.UTC(year, monthIndex, 1 - offset))
  const currentMonth = `${year}-${String(monthIndex + 1).padStart(2, '0')}`

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start)
    date.setUTCDate(start.getUTCDate() + index)
    const isoDate = toIsoDate(date)
    return {
      isoDate,
      day: date.getUTCDate(),
      isCurrentMonth: isoDate.startsWith(currentMonth),
      isToday: isoDate === today,
    }
  })
}

export function getWeekGrid(date: string, weekStartsOn: 0 | 1 = 1, today?: string): CalendarDay[] {
  const value = toUtcDate(date)
  if (!value) throw new Error(`Cannot format invalid calendar date: ${date}`)
  const offset = (value.getUTCDay() - weekStartsOn + 7) % 7
  const start = new Date(value)
  start.setUTCDate(value.getUTCDate() - offset)

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start)
    current.setUTCDate(start.getUTCDate() + index)
    const isoDate = toIsoDate(current)
    return {
      isoDate,
      day: current.getUTCDate(),
      isCurrentMonth: current.getUTCMonth() === value.getUTCMonth(),
      isToday: isoDate === (today ?? date),
    }
  })
}
