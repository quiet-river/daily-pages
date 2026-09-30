import { describe, expect, it } from 'vitest'
import { normalizeDivider } from './divider.logic'

describe('normalizeDivider', () => {
  it('keeps the research defaults and clamps numeric length', () => {
    expect(normalizeDivider({ variant: 'stitch', orientation: 'horizontal', length: -20 })).toMatchObject({ variant:'stitch', orientation:'horizontal', variables:{ '--dp-divider-length':'0px', '--dp-divider-rotation':'-3deg' } })
  })
  it('accepts CSS lengths', () => expect(normalizeDivider({ variant:'wave', orientation:'vertical', length:'12rem' }).variables['--dp-divider-length']).toBe('12rem'))
})
