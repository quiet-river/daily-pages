import type { Meta, StoryObj } from '@storybook/react'
import type { CSSProperties } from 'react'
import { Calendar } from './Calendar'

const meta = {
  title: 'Foundations/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['day', 'month', 'week', 'date-label', 'time-point', 'time-range', 'date-weather'],
    },
    tone: {
      control: 'select',
      options: ['paper', 'lemon', 'sky', 'rose'],
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Day: Story = {
  args: {
    value: {
      date: '2026-09-30',
      context: {
        location: '广州 · 东山口',
        event: '把今天撕下来，留一页给生活。',
      },
    },
    variant: 'day',
  },
}

export const DateLabel: Story = {
  args: {
    value: { date: '2026-09-30' },
    variant: 'date-label',
  },
}

export const TimePoint: Story = {
  args: {
    value: {
      date: '2026-09-30',
      time: { kind: 'point', at: '14:30' },
    },
    variant: 'time-point',
    tone: 'lemon',
  },
}

export const TimeRange: Story = {
  args: {
    value: {
      date: '2026-09-30',
      time: { kind: 'range', start: '09:30', end: '11:10' },
      context: { location: '东山口', event: '慢慢走了一圈' },
    },
    variant: 'time-range',
    tone: 'sky',
  },
}

export const Week: Story = {
  args: {
    value: {
      date: '2026-09-30',
      context: { event: '一周的生活碎片，从这里开始贴。' },
    },
    variant: 'week',
  },
}

export const Month: Story = {
  args: {
    value: { date: '2026-09-30' },
    variant: 'month',
    tone: 'rose',
  },
}

export const DateWeather: Story = {
  args: {
    value: {
      date: '2026-09-30',
      context: {
        weather: '晴',
        temperature: '28°C',
        location: '广州',
        event: '适合出门记录一点小事',
      },
    },
    variant: 'date-weather',
  },
}

export const CustomStyle: Story = {
  args: {
    value: { date: '2026-09-30', time: { kind: 'point', at: '18:20' } },
    variant: 'time-point',
    className: 'story-custom-calendar',
    classNames: { date: 'story-custom-calendar__date' },
    style: {
      '--dp-accent': '#6d5bd0',
      '--dp-accent-soft': '#e9e4ff',
      '--dp-radius': '28px',
    } as CSSProperties,
  },
}
