import { useMemo } from 'react'
import type { StampClassNames, StampProps } from './stamp.types'
import { getStampAriaLabel, normalizeStampValue } from './stamp.logic'
import styles from './stamp.module.css'

const cx = (...names: Array<string | undefined | false>) => names.filter(Boolean).join(' ')
function part(classNames: StampClassNames | undefined, key: keyof StampClassNames, internal: string) {
  return cx(internal, classNames?.[key])
}

export function Stamp({
  variant = 'mood-round', value, text, label, detail, serial, labels, photo, tone = 'rose', classNames,
  className, style, ...rest
}: StampProps) {
  const data = useMemo(() => normalizeStampValue({ ...value, text: text ?? value?.text, label: label ?? value?.label, detail: detail ?? value?.detail, serial: serial ?? value?.serial, labels: labels ?? value?.labels, photo: photo ?? value?.photo }), [value, text, label, detail, serial, labels, photo])
  const rootClass = part(classNames, 'root', styles.root)
  const stamp = (
    <div className={part(classNames, 'stamp', styles.stamp)} data-part="stamp" aria-label={getStampAriaLabel(data.text, variant)}>
      <small className={part(classNames, 'label', styles.label)} data-part="label">{data.label}</small>
      <b className={part(classNames, 'text', styles.text)} data-part="text">{data.text}</b>
      <small className={part(classNames, 'detail', styles.detail)} data-part="detail">{data.detail}</small>
    </div>
  )
  return (
    <div {...rest} className={cx(rootClass, className)} style={style} data-component="stamp" data-variant={variant} data-tone={tone}>
      {variant === 'serial' ? (
        <div className={styles.serialLayout}>
          <b className={part(classNames, 'serial', styles.serial)} data-part="serial">{data.serial}</b>
          <span className={part(classNames, 'detail', styles.serialDetail)} data-part="detail">{data.detail || 'COLLECTED'}<br />{data.label}</span>
        </div>
      ) : variant === 'page-label' ? (
        <div className={part(classNames, 'labels', styles.labels)} data-part="labels">
          {data.labels.map((item) => <span key={item}>{item}</span>)}
        </div>
      ) : variant === 'overlap' ? (
        <div className={styles.overlap}>
          <div className={part(classNames, 'photo', styles.photo)} data-part="photo">{data.photo ?? '🍋'}</div>
          {stamp}
        </div>
      ) : variant === 'postal' ? (
        <div className={styles.postal}>{stamp}<i aria-hidden="true" /></div>
      ) : stamp}
    </div>
  )
}
