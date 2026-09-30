import { forwardRef } from 'react'
import { cx } from '../../shared/style-props'
import { normalizeDivider } from './divider.logic'
import type { DividerPoint, DividerProps } from './divider.types'
import styles from './divider.module.css'

function Point({ point, className }: { point: DividerPoint; className?: string }) {
  return <span data-part="point" data-active={point.active ? 'true' : undefined} data-tone={point.tone} className={className}><i aria-hidden="true" />{point.label}</span>
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { variant, orientation, label, points, children, length, className, classNames, style, ...rest }, ref,
) {
  const model = normalizeDivider({ variant, orientation, length })
  const content = children ?? label
  const pointItems = points ?? []
  return (
    <div
      {...rest}
      ref={ref}
      data-component="divider"
      data-part="root"
      data-variant={model.variant}
      data-orientation={model.orientation}
      className={cx(styles.root, className, classNames?.root)}
      style={{ ...model.variables, ...style }}
    >
      {model.variant === 'path' || model.variant === 'wave' ? (
        <svg data-part="line" className={cx(styles.svg, classNames?.line)} viewBox="0 0 235 90" role={content ? undefined : 'img'} aria-label={typeof content === 'string' ? content : undefined}>
          {model.variant === 'wave' ? <path d="M8 48 C30 25 50 70 73 46 S116 22 139 45 S184 67 207 43" /> : <><circle cx="20" cy="63" r="6" /><path d="M30 62 C70 82 80 10 132 26 S177 66 210 29 M194 29 L210 29 L202 44" /></>}
        </svg>
      ) : model.variant === 'timeline' ? (
        <div data-part="points" className={cx(styles.points, classNames?.points)}>{pointItems.map((point, i) => <Point key={i} point={point} className={cx(styles.point, classNames?.point)} />)}{content && <span data-part="label" className={cx(styles.label, classNames?.label)}>{content}</span>}</div>
      ) : model.variant === 'annotation' ? (
        <div data-part="line" className={cx(styles.annotation, classNames?.line)}><span data-part="label" className={cx(styles.label, classNames?.label)}>{content}</span></div>
      ) : (
        <div data-part="line" className={cx(styles.line, classNames?.line)}>{content && <span data-part="label" className={cx(styles.label, classNames?.label)}>{content}</span>}</div>
      )}
    </div>
  )
})
