import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FilmStrip, PhotoFrame } from './index'
describe('photo assets', () => {
  it('exposes stable parts and accessible image', () => { render(<PhotoFrame src="cat.jpg" alt="橘白猫" caption="柠檬茶" />); expect(screen.getByRole('img', { name: '橘白猫' })).toBeTruthy(); expect(screen.getByText('柠檬茶')).toBeTruthy() })
  it('renders every film item and side sprocket track', () => { const { container } = render(<FilmStrip items={[{ id: 'a', children: 'A' }, { id: 'b', children: 'B' }]} />); expect(container.querySelectorAll('[data-part="frame"]')).toHaveLength(2); expect(container.querySelector('[data-part="track"]')).toBeTruthy() })
})
