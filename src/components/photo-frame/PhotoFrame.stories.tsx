import type { Meta, StoryObj } from '@storybook/react'
import { FilmStrip, PhotoFrame } from './index'

const meta = { title: 'Foundations/Photo & Film', component: PhotoFrame, tags: ['autodocs'] } satisfies Meta<typeof PhotoFrame>
export default meta
type Story = StoryObj<typeof meta>
const Emoji = ({ children }: { children: string }) => <span style={{ fontSize: 34 }}>{children}</span>

export const Polaroid: Story = { args: { children: <Emoji>🐾</Emoji>, caption: '一张可以拿起的照片' } }
export const Corners: Story = { args: { variant: 'corners', children: <Emoji>🌿</Emoji>, caption: '四角固定，让画面成为主角' } }
export const Pocket: Story = { args: { variant: 'pocket', children: <Emoji>🎟️</Emoji>, caption: '收进透明票袋' } }
export const FilmStripStory: Story = { render: () => <FilmStrip items={[{ id: 'one', children: <Emoji>🌇</Emoji> }, { id: 'two', children: <Emoji>🍋</Emoji> }, { id: 'three', children: <Emoji>🐈</Emoji> }, { id: 'four', children: <Emoji>☕</Emoji> }, { id: 'five', children: <Emoji>🌿</Emoji> }]} /> }
export const FilmStripWithCaptions: Story = { render: () => <FilmStrip caption="一段散步的连续画面" items={[{ id: 'a', children: <Emoji>🌇</Emoji>, caption: '黄昏' }, { id: 'b', children: <Emoji>🍋</Emoji>, caption: '柠檬茶' }, { id: 'c', children: <Emoji>🐈</Emoji>, caption: '偶遇' }]} /> }
export const CustomStyle: Story = { render: () => <PhotoFrame variant="corners" className="custom-photo" style={{ '--dp-photo-width': '240px', '--dp-photo-edge': '#6e8b70' }}><Emoji>📷</Emoji></PhotoFrame> }
