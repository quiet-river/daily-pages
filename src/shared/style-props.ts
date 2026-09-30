import type { CSSProperties } from 'react'

export type StyleProps<Part extends string = never> = {
  className?: string
  classNames?: Partial<Record<Part, string>>
  style?: CSSProperties
}

export function cx(...values: Array<string | undefined | false>): string | undefined {
  const result = values.filter(Boolean).join(' ')
  return result || undefined
}
