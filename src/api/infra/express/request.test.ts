import Request from './Request'

describe('Request Infra', () => {
  it('exists', () => {
    expect(() => Request.createNull()).not.toThrow()
  })
})
