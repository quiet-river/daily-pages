import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tape } from './Tape'

describe('Tape', () => {
  it('renders a decorative tape as hidden content by default', () => {
    const { container } = render(<Tape variant="dot" tone="mint" />)
    const tape = container.querySelector('[data-component="tape"]')
    expect(tape).toHaveAttribute('aria-hidden', 'true')
    expect(tape).toHaveAttribute('data-variant', 'dot')
    expect(tape).toHaveAttribute('data-tone', 'mint')
  })
  it('supports an accessible label and stable part hooks', () => {
    const { container } = render(<Tape aria-label="照片固定胶带" classNames={{ root: 'hook' }} />)
    expect(container.querySelector('.hook')).toHaveAttribute('role', 'img')
    expect(container.querySelector('[data-part="surface"]')).toBeInTheDocument()
  })
})
