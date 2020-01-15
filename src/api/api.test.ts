import MealPlanAPI from './api'
import Console from './infra/console'
import request from 'request'

describe('MealPlan API', () => {
  let api: MealPlanAPI
  let url: string

  beforeAll(async () => {
    api = new MealPlanAPI(0, Console.createNull(0))
    await api.start()
    const port = api.getPort()
    url = `http://localhost:${port}`
  })

  afterAll(async () => {
    await api.stop()
  })

  it('starts and stops correctly.', async (done) => {
    const port = 33591
    const apiConsole = Console.createNull(2)

    const newAPI = new MealPlanAPI(port, apiConsole)
    expect(newAPI.getPort()).toBe(port)

    await newAPI.start()
    expect(apiConsole.getLastLog()).toBe(`Server listening on port ${port}`)

    await newAPI.stop()
    expect(apiConsole.getHistory(2)).toEqual([
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
