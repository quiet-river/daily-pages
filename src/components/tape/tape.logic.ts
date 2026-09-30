import type { TapeProps, TapeStyle, TapeVariant } from './tape.types'

const angles: Record<TapeVariant, number> = { solid: -5, stripe: 3, dot: -2, torn: 4 }
const tones = { solid: 'lemon', stripe: 'rose', dot: 'mint', torn: 'lemon' } as const

export function normalizeTape({ variant = 'solid', tone, edge, opacity, rotation, width, height }: TapeProps) {
  const variables = {} as TapeStyle & Record<string, string | number | undefined>
  if (opacity !== undefined) variables['--dp-tape-opacity'] = Number.isFinite(opacity) ? Math.min(1, Math.max(0, opacity)) : .85
  if (rotation !== undefined) variables['--dp-tape-rotation'] = `${Number.isFinite(rotation) ? rotation : angles[variant]}deg`
  for (const [name, value] of [['width', width], ['height', height]] as const) {
    if (typeof value === 'string') variables[`--dp-tape-${name}`] = value
    else if (typeof value === 'number' && Number.isFinite(value)) variables[`--dp-tape-${name}`] = `${Math.max(0, value)}px`
  }
  return { variant, tone: tone ?? tones[variant], edge: edge ?? (variant === 'torn' ? 'torn' : 'straight'), variables }
}
