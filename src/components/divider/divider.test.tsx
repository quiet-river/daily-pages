import type { CSSProperties } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Divider } from './Divider'

describe('Divider', () => {
  it('renders wave SVG and stable hooks', () => { const {container}=render(<Divider variant="wave" aria-label="波浪" classNames={{root:'hook'}} />); expect(container.querySelector('.hook')).toHaveAttribute('data-variant','wave'); expect(container.querySelector('svg path')).toBeInTheDocument() })
  it('renders timeline points and supports labels', () => { const {container}=render(<Divider variant="timeline" points={[{label:'14:30 偶遇猫猫'},{label:'15:10 喝茶',active:true}]} label="今天" />); expect(container.querySelectorAll('[data-part="point"]')).toHaveLength(2); expect(container.textContent).toContain('14:30'); expect(container.querySelector('[data-part="label"]')).toHaveTextContent('今天') })
  it('supports orientation and custom styles', () => { const {container}=render(<Divider orientation="vertical" length={120} style={{'--dp-divider-ink':'red'} as CSSProperties} />); expect(container.firstElementChild).toHaveAttribute('data-orientation','vertical') })
})
