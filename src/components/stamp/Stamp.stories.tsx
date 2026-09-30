import type { Meta, StoryObj } from '@storybook/react'
import { Stamp } from './Stamp'

const meta = { title: 'Foundations/Stamp', component: Stamp, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['mood-round','certification-square','postal','serial','page-label','overlap'] }, tone: { control: 'select', options: ['rose','mint','lemon','lilac'] } } } satisfies Meta<typeof Stamp>
export default meta
type Story = StoryObj<typeof meta>
export const MoodRound: Story = { args: { variant: 'mood-round', value: { text: '今日喜欢', label: 'LEMON TEA', detail: '★ ★ ★' } } }
export const Certification: Story = { args: { variant: 'certification-square', value: { text: '街坊认证', label: 'NEIGHBORHOOD', detail: 'GUANGZHOU' }, tone: 'mint' } }
export const Postal: Story = { args: { variant: 'postal', value: { text: '09.29', label: 'GUANGZHOU', detail: '2026 · WALK' } } }
export const Serial: Story = { args: { variant: 'serial', value: { serial: '027', label: 'COLLECTED IN GUANGZHOU', detail: 'COLLECTED' } } }
export const PageLabels: Story = { args: { variant: 'page-label', value: { labels: ['凉茶铺', '柠檬茶', '街坊扫街'] } } }
export const Overlap: Story = { args: { variant: 'overlap', value: { text: '好喜欢', label: 'SEEN', photo: '🍋' } } }
