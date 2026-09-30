import type { Meta, StoryObj } from '@storybook/react'
import type { CSSProperties } from 'react'
import { Tape } from './Tape'
import styles from './tape.module.css'

const meta = {
  title: 'Foundations/Tape',
  component: Tape,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'stripe', 'dot', 'torn'] },
    tone: { control: 'select', options: ['lemon', 'rose', 'mint', 'lilac'] },
    edge: { control: 'select', options: ['straight', 'torn'] },
    opacity: { control: { type: 'range', min: 0.25, max: 1, step: 0.05 } },
  },
} satisfies Meta<typeof Tape>
export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = { args: { variant: 'solid', tone: 'lemon', 'aria-label': '柠檬黄色纯色胶带' } }
export const Stripe: Story = { args: { variant: 'stripe', tone: 'rose', 'aria-label': '粉色斜纹胶带' } }
export const Dot: Story = { args: { variant: 'dot', tone: 'mint', 'aria-label': '薄荷绿点阵胶带' } }
export const Torn: Story = { args: { variant: 'torn', tone: 'lemon', 'aria-label': '手撕边柠檬色胶带' } }

export const MaterialBoard: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 300, padding: 30, background: '#fffdf8', border: '1px solid #ead9cb' }}>
      <Tape variant="solid" tone="lemon" />
      <Tape variant="stripe" tone="rose" />
      <Tape variant="dot" tone="mint" />
      <Tape variant="torn" tone="lemon" width="76%" />
    </div>
  ),
}

export const LayeredPhotoEdge: Story = {
  render: () => (
    <div style={{ position: 'relative', width: 300, height: 190, padding: 26, background: '#e4f0e2' }}>
      <div style={{ position: 'relative', width: 220, height: 132, display: 'grid', placeItems: 'center', background: '#f3dfd2', color: '#947d6d', transform: 'rotate(-2deg)' }}>
        📷 生活照片
      </div>
      <Tape tone="mint" width={105} height={23} rotation={-7} style={{ position: 'absolute', left: 88, top: 15 } as CSSProperties} />
      <Tape variant="dot" tone="rose" width={94} height={22} rotation={5} style={{ position: 'absolute', left: 18, top: 86 } as CSSProperties} />
    </div>
  ),
}

export const CustomStyle: Story = {
  args: {
    variant: 'dot', tone: 'lilac', className: styles.customPreview, 'aria-label': '自定义胶带',
    style: { '--dp-tape-color': '#d9d0eb', '--dp-tape-pattern-color': '#8a789c', '--dp-tape-pattern-size': '14px', '--dp-tape-opacity': '.72' } as CSSProperties,
  },
}
