import { cx } from '../../shared/style-props'
import { getTitleFrameState } from './title-frame.logic'
import type { TitleFrameProps } from './title-frame.types'
import styles from './title-frame.module.css'

export function TitleFrame({
  as: Element = 'div', variant, badge, children, className, classNames, style, ...rest
}: TitleFrameProps) {
  const state = getTitleFrameState(variant, badge !== undefined && badge !== null && typeof badge !== 'boolean')
  return (
    <Element
      {...rest}
      className={cx(styles.root, classNames?.root, className)}
      style={style}
      data-component="title-frame"
      data-part="root"
      data-variant={state.variant}
    >
      {state.showBadge && <span className={cx(styles.badge, classNames?.badge)} data-part="badge">{badge}</span>}
      <span className={cx(styles.content, classNames?.content)} data-part="content">{children}</span>
    </Element>
  )
}
