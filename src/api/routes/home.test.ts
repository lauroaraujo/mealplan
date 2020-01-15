import home from './home'
import Response from '../infra/express/Response'
import Request from '../infra/express/Request'

describe('Home route', () => {
  it ('returns a greeting message', () => {
    const req = Request.createNull()
    const res = Response.createNull()
    home(req, res)

    expect(res.getLastOutput()).toBe(`Hi, I'm up and running!`)
  })
})
