import { createYDSign } from '../utils'

describe('utils', () => {
  it('sing', () => {
    const result = createYDSign('1')
    expect(result).toBe('c4ca4238a0b923820dcc509a6f75849b')
  })
})
