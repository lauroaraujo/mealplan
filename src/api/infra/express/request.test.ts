import APIRequest from './request'

describe('APIRequest Infra', () => {
  it('exists', () => {
    expect(() => APIRequest.createNull()).not.toThrow()
  })
})
