import type { DividerOrientation, DividerProps, DividerStyle, DividerVariant } from './divider.types'

const rotations: Record<DividerVariant, number> = { basic: 0, wave: 0, path: 0, stitch: -3, annotation: 2, timeline: 0 }

export function normalizeDivider({ variant = 'basic', orientation = 'horizontal', length }: Pick<DividerProps, 'variant' | 'orientation' | 'length'>) {
  const variables = {} as DividerStyle & Record<string, string | number | undefined>
  variables['--dp-divider-rotation'] = `${rotations[variant]}deg`
  if (typeof length === 'string') variables['--dp-divider-length'] = length
  else if (typeof length === 'number' && Number.isFinite(length)) variables['--dp-divider-length'] = `${Math.max(0, length)}px`
  return { variant, orientation, variables }
}
