import home from './home'
import Request from '../infra/express/Request'
import Response from '../infra/express/Response'
import RequestMock from '../__mocks__/express/RequestMock'
import ResponseMock from '../__mocks__/express/ResponseMock'

describe('Home route', () => {
  it ('returns a greeting message', () => {
    const req = Request.create(RequestMock.create())
    const res = Response.create(ResponseMock.create())
    home(req, res)

    expect(res.getLastOutput()).toBe(`Hi, I'm up and running!`)
  })
})
