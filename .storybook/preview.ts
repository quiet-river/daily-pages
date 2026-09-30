import type { Preview } from '@storybook/react'
import '../src/components/calendar/calendar.module.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
  },
}

export default preview
