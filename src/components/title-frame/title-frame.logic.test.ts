import { describe, expect, it } from 'vitest'
import { getTitleFrameState } from './title-frame.logic'

describe('getTitleFrameState', () => {
  it('only shows badges on tab frames', () => {
    expect(getTitleFrameState('tab', true)).toEqual({ variant: 'tab', showBadge: true })
    expect(getTitleFrameState('ribbon', true)).toEqual({ variant: 'ribbon', showBadge: false })
  })
  it('defaults to ribbon', () => expect(getTitleFrameState()).toEqual({ variant: 'ribbon', showBadge: false }))
})
