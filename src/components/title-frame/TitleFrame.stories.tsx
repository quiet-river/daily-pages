import type { Meta, StoryObj } from '@storybook/react'
import type { CSSProperties } from 'react'
import { TitleFrame } from './TitleFrame'

const meta = {
  title: 'Foundations/Title Frame',
  component: TitleFrame,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['ribbon', 'tab', 'outline', 'side'] },
    as: { control: 'select', options: ['div', 'h1', 'h2', 'h3'] },
  },
} satisfies Meta<typeof TitleFrame>
export default meta
type Story = StoryObj<typeof meta>

export const Ribbon: Story = { args: { variant: 'ribbon', children: '今日收集' } }
export const Tab: Story = { args: { variant: 'tab', badge: '01', children: '一餐一记' } }
export const Outline: Story = { args: { variant: 'outline', children: '放晴的路上' } }
export const Side: Story = { args: { variant: 'side', children: '街坊观察' } }
export const CustomStyle: Story = {
  args: {
    variant: 'ribbon', children: '可自定义的标题', className: 'story-title-frame',
    style: { '--dp-title-paper': '#b8d6bd', '--dp-title-rotation': '1deg' } as CSSProperties,
  },
}
