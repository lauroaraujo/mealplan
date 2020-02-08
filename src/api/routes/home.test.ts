import home from './home'
import Response from '../infra/express/Response'
import RequestMock from '../__mocks__/express/RequestMock'
import ResponseMock from '../__mocks__/express/ResponseMock'

describe('Home route', () => {
  it ('returns a greeting message', () => {
    const req = RequestMock.create()
    const resMock = ResponseMock.create()
    home(req, resMock.asResponse())

    expect(resMock.getLastOutput()).toBe(`Hi, I'm up and running!`)
  })
})
