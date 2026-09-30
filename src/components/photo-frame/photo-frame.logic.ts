/** Keep intrinsic media geometry usable, including when data comes from an AI. */
export function resolveAspectRatio(value: number | undefined, fallback = 3 / 2): number {
  return value !== undefined && Number.isFinite(value) && value > 0 ? value : fallback
}

export function filmColumns(count: number): string {
  return `repeat(${Math.max(1, Math.floor(count))}, minmax(0, 1fr))`
}
