import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TitleFrame } from './TitleFrame'

describe('TitleFrame', () => {
  it('renders each physical title shape with stable hooks', () => {
    for (const variant of ['ribbon', 'tab', 'outline', 'side'] as const) {
      const { unmount } = render(<TitleFrame variant={variant}>标题</TitleFrame>)
      expect(screen.getByText('标题')).toHaveAttribute('data-part', 'content')
      expect(document.querySelector(`[data-variant="${variant}"]`)).toBeInTheDocument()
      unmount()
    }
  })
  it('supports semantic heading, badge and class hooks', () => {
    render(<TitleFrame as="h2" variant="tab" badge="02" className="outer" classNames={{ content: 'inner' }}>书页</TitleFrame>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass('outer')
    expect(screen.getByText('02')).toHaveAttribute('data-part', 'badge')
    expect(screen.getByText('书页')).toHaveClass('inner')
  })
})
