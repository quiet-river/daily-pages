import { cx } from '../../shared/style-props'
import { resolveAspectRatio } from './photo-frame.logic'
import type { PhotoFrameProps } from './photo-frame.types'
import styles from './photo-frame.module.css'

/** A physical photo mount; content and caption remain fully owned by the caller. */
export function PhotoFrame({ variant = 'polaroid', src, alt, children, caption, aspectRatio, className, classNames, style, ...rest }: PhotoFrameProps) {
  return (
    <figure {...rest} className={cx(styles.root, classNames?.root, className)}
      data-component="photo-frame" data-part="root" data-variant={variant} style={style}>
      <div data-part="media" className={cx(styles.media, classNames?.media)} style={{ aspectRatio: resolveAspectRatio(aspectRatio) }}>
        {src !== undefined ? <img data-part="image" className={cx(styles.image, classNames?.image)} src={src} alt={alt} /> : children}
      </div>
      {caption != null && <figcaption data-part="caption" className={cx(styles.caption, classNames?.caption)}>{caption}</figcaption>}
    </figure>
  )
}
