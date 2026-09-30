import { describe, expect, it } from 'vitest'
import { normalizeTape } from './tape.logic'

describe('normalizeTape', () => {
  it('keeps original visual defaults by variant', () => {
    expect((normalizeTape({ variant: 'stripe' }).variables as Record<string, unknown>)['--dp-tape-rotation']).toBeUndefined()
    expect(normalizeTape({ variant: 'stripe' }).tone).toBe('rose')
    expect(normalizeTape({ variant: 'torn' }).edge).toBe('torn')
  })
  it('clamps opacity and normalizes dimensions', () => {
    const result = normalizeTape({ opacity: 2, width: 180, height: '2rem' })
    const variables = result.variables as Record<string, unknown>
    expect(variables['--dp-tape-opacity']).toBe(1)
    expect(variables['--dp-tape-width']).toBe('180px')
    expect(variables['--dp-tape-height']).toBe('2rem')
  })
})
