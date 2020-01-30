import MealPlan from './app'
import Env from './infra/Env'
import ConsoleMock from './__mocks__/ConsoleMock'

describe('MealPlan app', () => {
  beforeAll(() => {
    ConsoleMock.mock()
  })

  afterAll(() => {
    ConsoleMock.reset()
  })

  it('starts and stops successfully', async () => {
    const app = new MealPlan(new Env({ PORT: '2345' }))

    await app.run()
    const appPort = app.getPort()
    await app.stop()

    expect(appPort).toBe(2345)
  })

  it('[os] starts and stops successfully', async () => {
    jest.spyOn(global.console, 'log').mockImplementation(() => undefined)

    let app = new MealPlan()
    await app.run()
    expect(app.getPort()).toBeGreaterThan(0)
    await app.stop()

    ;(global.console.log as any).mockRestore()
  })
})
