import MealPlanAPI from './MealPlanAPI'
import Application from './infra/express/Application'
import ConsoleMock from './__mocks__/ConsoleMock'
import ExpressAppMock from './__mocks__/express/ExpressAppMock'
import request from 'request'

describe('MealPlan API', () => {
  let api: MealPlanAPI
  let url: string

  beforeAll(async () => {
    api = new MealPlanAPI(0)
    await api.start()
    const port = api.getPort()
    url = `http://localhost:${port}`

    ConsoleMock.mock()
  })

  afterAll(async () => {
    await api.stop()
    ConsoleMock.reset()
  })

  it('constructor works', () => {
    expect(new MealPlanAPI().getPort()).toBe(0)
  })

  it('starts and stops correctly.', async (done) => {
    const port = 33591

    const app = Application.create(ExpressAppMock.create())
    const newAPI = new MealPlanAPI(port, app)
    expect(newAPI.getPort()).toBe(port)

    await newAPI.start()
    expect(ConsoleMock.getLastLog()).toBe(`Server listening on port ${port}`)

    await newAPI.stop()
    expect(ConsoleMock.getHistory(2)).toEqual([
      `Shutting down server on port ${port}...`,
      `Server on port ${port} has stopped.`
    ])

    done()
  })

  it ('[network] returns a greeting message on the root route', done => {
    expect.assertions(1)

    request(url, (_err, _response, body) => {
      expect(body).toBe(`Hi, I'm up and running!`)
      done()
    })
  })
})
