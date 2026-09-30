import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Calendar } from './Calendar'

describe('Calendar', () => {
  it('renders a semantic point-time label', () => {
    render(
      <Calendar
        value={{ date: '2026-09-30', time: { kind: 'point', at: '14:30' } }}
        variant="time-point"
      />,
    )

    expect(screen.getByRole('time', { name: /30/ })).toHaveAttribute('datetime', '2026-09-30')
    expect(screen.getByText('14:30')).toBeInTheDocument()
    expect(screen.getByRole('time').closest('[data-component="calendar"]')).toHaveAttribute(
      'data-variant',
      'time-point',
    )
  })

  it('renders a time range and context parts', () => {
    render(
      <Calendar
        value={{
          date: '2026-09-30',
          time: { kind: 'range', start: '09:30', end: '11:10' },
          context: { location: '东山口', event: '散步' },
        }}
        variant="time-range"
        classNames={{ context: 'context-hook' }}
      />,
    )

    expect(screen.getByText('09:30—11:10')).toBeInTheDocument()
    expect(screen.getByText('东山口')).toBeInTheDocument()
    expect(screen.getByText('散步')).toBeInTheDocument()
    expect(document.querySelector('[data-part="context"]')).toHaveClass('context-hook')
  })

  it('renders month cells and exposes custom style hooks', () => {
    render(
      <Calendar
        value={{ date: '2026-09-30' }}
        variant="month"
        className="custom-calendar"
        classNames={{ grid: 'custom-grid' }}
      />,
    )

    expect(screen.getByText('2026年9月')).toBeInTheDocument()
    expect(screen.getByRole('time', { name: '2026-09-30' })).toBeInTheDocument()
    expect(document.querySelector('.custom-calendar')).toBeInTheDocument()
    expect(document.querySelector('.custom-grid')).toBeInTheDocument()
  })

  it('renders a torn-page week view with seven dates', () => {
    const { container } = render(<Calendar value={{ date: '2026-09-30' }} variant="week" />)

    expect(screen.getByText('这一周')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-part="dayCell"]')).toHaveLength(7)
    expect(container.querySelector('[data-variant="week"]')).toBeInTheDocument()
  })
})
