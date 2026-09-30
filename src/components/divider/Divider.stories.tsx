import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta = { title:'Foundations/Divider', component:Divider, parameters:{ layout:'centered' } } satisfies Meta<typeof Divider>
export default meta
type Story = StoryObj<typeof meta>
export const Basic: Story = { args:{ variant:'basic' } }
export const Wave: Story = { args:{ variant:'wave' } }
export const Path: Story = { args:{ variant:'path' } }
export const Stitch: Story = { args:{ variant:'stitch' } }
export const Annotation: Story = { args:{ variant:'annotation', label:'那天下午的风，刚好有一点凉。' } }
export const Timeline: Story = { args:{ variant:'timeline', points:[{label:'14:30 偶遇猫猫'},{label:'15:10 喝柠檬茶',active:true},{label:'16:00 走回家'}] } }
