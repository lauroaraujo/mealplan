import got from 'got'
import Response from './Response'
import Application from './Application'
import ResponseMock from '../../__mocks__/express/ResponseMock'

describe('Response Infra', () => {
  it('can set the response status', () => {
    const res = Response.create(ResponseMock.create())
    res.status(201)
    expect(res.getLastStatus()).toBe(201)

    res.status(404)
    expect(res.getLastStatus()).toBe(404)
  })

  it('Can set the response with send()', () => {
    const res = Response.create(ResponseMock.create())
    res.send('response result')
    expect(res.getLastOutput()).toBe('response result')

    res.send(201)
    expect(res.getLastOutput()).toBe(201)

    res.send({ a: 'response '})
    expect(res.getLastOutput()).toEqual({ a: 'response '})
  })

  it('Can set the response with json()', () => {
    const res = Response.create(ResponseMock.create())
    res.json('json result')
    expect(res.getLastOutput()).toBe('json result')

    res.json(201)
    expect(res.getLastOutput()).toBe(201)

    res.json({ a: 'json '})
    expect(res.getLastOutput()).toEqual({ a: 'json '})
  })

  it('[network] works with an actual express response', async () => {
    expect.assertions(1)

    const app = await Application.create()
    app.get('/', (_req, res) => {
      const response = Response.create(res)
      response.send('OK')
    })

    await app.start()
    const { body } = await got.get(`http://localhost:${app.getPort()}`)
    expect(body).toBe('OK')
  })
})
