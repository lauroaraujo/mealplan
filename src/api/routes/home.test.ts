import home from './home'
import APIResponse from '../infra/response'
import APIRequest from '../infra/request'

describe('Home route', () => {
  it ('returns a greeting message', () => {
    const req = APIRequest.createNull()
    const res = APIResponse.createNull()
    home(req, res)

    expect(res.getLastOutput()).toBe(`Hi, I'm up and running!`)
  })
})
