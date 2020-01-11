import FoodbookAPI from './api'

describe('Foodbook API', () => {
  it('starts and stops correctly.', done => {
    expect.assertions(1)

    expect(async () => {
      const api = new FoodbookAPI()
      await api.start()
      await api.stop()

      done()
    }).not.toThrow()
  })
})
