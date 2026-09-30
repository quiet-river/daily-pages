import { describe, expect, it } from 'vitest'
import {
  formatTimeSpec,
  getMonthGrid,
  getWeekGrid,
  isIsoDate,
  normalizeCalendarValue,
} from './calendar.logic'

describe('calendar.logic', () => {
  it('accepts valid ISO dates and rejects impossible dates', () => {
    expect(isIsoDate('2026-09-30')).toBe(true)
    expect(isIsoDate('2026-02-29')).toBe(false)
    expect(isIsoDate('30-09-2026')).toBe(false)
  })

  it('keeps a point time distinct from a range', () => {
    expect(formatTimeSpec({ kind: 'point', at: '14:30' })).toBe('14:30')
    expect(formatTimeSpec({ kind: 'range', start: '09:30', end: '11:10' })).toBe('09:30—11:10')
    expect(formatTimeSpec({ kind: 'range', start: '09:30' })).toBe('09:30—')
  })

  it('normalizes without dropping context metadata', () => {
    const value = normalizeCalendarValue({
      date: '2026-09-30',
      context: { location: '广州', weather: '晴' },
      metadata: { source: 'journal' },
    })
    expect(value.context?.location).toBe('广州')
    expect(value.metadata).toEqual({ source: 'journal' })
  })

  it('creates a stable six-week month grid', () => {
    const grid = getMonthGrid('2026-09', 1, '2026-09-30')
    expect(grid).toHaveLength(42)
    expect(grid[0].isoDate).toBe('2026-08-31')
    expect(grid.find((day) => day.isoDate === '2026-09-30')?.isToday).toBe(true)
  })

  it('creates a seven-day week strip anchored to the chosen date', () => {
    const grid = getWeekGrid('2026-09-30', 1, '2026-09-30')
    expect(grid).toHaveLength(7)
    expect(grid[0].isoDate).toBe('2026-09-28')
    expect(grid[2].isToday).toBe(true)
  })
})
