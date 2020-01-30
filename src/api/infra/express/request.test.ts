import got from 'got'

import Request from './Request'
import Application from './Application'
import ConsoleMock from '../../__mocks__/ConsoleMock'

describe('Request Infra', () => {
  beforeAll(() => {
    ConsoleMock.mock()
  })

  afterAll(() => {
    ConsoleMock.reset()
  })

  it('NullableRequest can inject query parameters', () => {
    const req = Request.createNull({ search: 'some text' })
    expect(req.query).toEqual({ search: 'some text' })
  })

  it('[network] works with an actual express request', async () => {
    expect.assertions(1)

    const app = await Application.create()
    app.get('/', (req, res) => {
      const request = Request.create(req)
      res.send(`Param (p): ${request.query.p}`)
    })

    await app.start()
    const { body } = await got.get(`http://localhost:${app.getPort()}/?p=my-param`)
    expect(body).toBe('Param (p): my-param')
  })
})
