import type { TitleFrameVariant } from './title-frame.types'

/** 展示决策与 React DOM 实现分离；不生成或修改用户标题。 */
export function getTitleFrameState(variant: TitleFrameVariant = 'ribbon', hasBadge = false) {
  return { variant, showBadge: variant === 'tab' && hasBadge }
}
