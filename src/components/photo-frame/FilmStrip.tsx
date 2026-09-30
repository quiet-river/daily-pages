import { cx } from '../../shared/style-props'
import { filmColumns, resolveAspectRatio } from './photo-frame.logic'
import type { FilmStripProps } from './photo-frame.types'
import styles from './photo-frame.module.css'

/** Sprockets repeat at a fixed 14px pitch, independently of the number of photos. */
export function FilmStrip({ items, caption, aspectRatio, className, classNames, style, ...rest }: FilmStripProps) {
  return (
    <figure {...rest} data-component="film-strip" data-part="root" className={cx(styles.film, classNames?.root, className)} style={style}>
      <div data-part="track" className={cx(styles.track, classNames?.track)} style={{ gridTemplateColumns: filmColumns(items.length) }}>
        {items.map(item => (
          <figure key={item.id} data-part="frame" className={cx(styles.frame, classNames?.frame)}>
            <div data-part="media" className={cx(styles.filmMedia, classNames?.media)} style={{ aspectRatio: resolveAspectRatio(aspectRatio, 3 / 4) }}>
              {item.src !== undefined ? <img data-part="image" className={cx(styles.image, classNames?.image)} src={item.src} alt={item.alt} /> : item.children}
            </div>
            {item.caption != null && <figcaption data-part="itemCaption" className={cx(styles.itemCaption, classNames?.itemCaption)}>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
      {caption != null && <figcaption data-part="caption" className={cx(styles.filmCaption, classNames?.caption)}>{caption}</figcaption>}
    </figure>
  )
}
