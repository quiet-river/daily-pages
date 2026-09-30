import { describe, expect, it } from 'vitest'
import { filmColumns, resolveAspectRatio } from './photo-frame.logic'
describe('photo frame logic', () => {
  it('guards invalid aspect ratios', () => { expect(resolveAspectRatio(0)).toBe(1.5); expect(resolveAspectRatio(4)).toBe(4) })
  it('creates safe film columns', () => { expect(filmColumns(5)).toBe('repeat(5, minmax(0, 1fr))'); expect(filmColumns(0)).toBe('repeat(1, minmax(0, 1fr))') })
})
