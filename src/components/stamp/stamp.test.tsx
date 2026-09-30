import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Stamp } from './Stamp'
describe('Stamp', () => {
  it('renders stamp variants with stable data attributes', () => {
    render(<Stamp variant="postal" value={{ text: '09.29' }} />)
    expect(screen.getByText('09.29')).toBeInTheDocument()
    expect(screen.getByLabelText(/印章/)).toBeInTheDocument()
  })
  it('renders page labels independently', () => { const { container } = render(<Stamp variant="page-label" value={{ labels: ['散步', '猫猫'] }} />); expect(container.querySelectorAll('[data-part="labels"] span')).toHaveLength(2) })
})
