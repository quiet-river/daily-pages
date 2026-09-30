import { forwardRef } from 'react'
import { cx } from '../../shared/style-props'
import { normalizeTape } from './tape.logic'
import type { TapeProps } from './tape.types'
import styles from './tape.module.css'

export const Tape = forwardRef<HTMLSpanElement, TapeProps>(function Tape(
  { variant, tone, edge, opacity, rotation, width, height, className, classNames, style, 'aria-label': label, ...rest }, ref,
) {
  const model = normalizeTape({ variant, tone, edge, opacity, rotation, width, height })
  return (
    <span
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      {...rest}
      ref={ref}
      data-component="tape"
      data-part="root"
      data-variant={model.variant}
      data-tone={model.tone}
      data-edge={model.edge}
      className={cx(styles.root, className, classNames?.root)}
      style={{ ...model.variables, ...style }}
    >
      <span aria-hidden="true" data-part="surface" className={cx(styles.surface, classNames?.surface)} />
    </span>
  )
})
