import { describe, expect, it } from 'vitest'
import { getStampAriaLabel, normalizeStampValue } from './stamp.logic'
describe('stamp.logic', () => {
  it('fills friendly defaults while preserving custom labels', () => {
    expect(normalizeStampValue({ text: '收藏' }).text).toBe('收藏')
    expect(normalizeStampValue({ text: '收藏' }).labels).toEqual(['凉茶铺', '柠檬茶', '街坊扫街'])
  })
  it('creates an accessible label', () => { expect(getStampAriaLabel('今日喜欢', 'mood-round')).toContain('印章') })
})
