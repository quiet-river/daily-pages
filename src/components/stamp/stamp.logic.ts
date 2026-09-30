import type { StampValue } from './stamp.types'

export function normalizeStampValue(value: StampValue = {}): Required<Pick<StampValue, 'text' | 'label' | 'detail' | 'serial' | 'labels'>> & Pick<StampValue, 'photo'> {
  return {
    text: value.text ?? '今日喜欢',
    label: value.label ?? 'LEMON TEA',
    detail: value.detail ?? '★ ★ ★',
    serial: value.serial ?? '027',
    labels: value.labels ?? ['凉茶铺', '柠檬茶', '街坊扫街'],
    photo: value.photo,
  }
}

export function getStampAriaLabel(text: string, variant: string): string {
  return `${text}印章（${variant}）`
}
