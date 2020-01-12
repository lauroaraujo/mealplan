import FoodbookAPI from './api'
import Console from './infra/console'

describe('Foodbook API', () => {
  it('starts and stops correctly.', async (done) => {
    const port = 33591
    const console = Console.createNull(2)

    const api = new FoodbookAPI(port, console)
    expect(api.getPort()).toBe(port)

    await api.start()
    expect(console.getLastLog()).toBe(`Server listening on port ${port}`)

    await api.stop()
    expect(console.getHistory(2)).toEqual([
      `Shutting down server on port ${port}...`,
      `Server on port ${port} has stopped.`
    ])

    done()
  })
})
