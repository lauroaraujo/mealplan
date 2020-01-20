import Client from './client'

describe('MealPlan Client', () => {
  it('Runs the client.', () => {
    const client = new Client()
    client.run()
  })
})
