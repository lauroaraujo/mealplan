import MealPlanAPI from './MealPlanAPI'
import Env from './infra/Env'

export default class MealPlan {
  private api: MealPlanAPI

  constructor (private env = new Env()) {
    const port = this.env.getNumber('PORT', 0)
    this.api = new MealPlanAPI(port)
  }

  run = async () => {
    await this.api.start()
  }

  stop = async () => {
    await this.api.stop()
  }

  getPort = () => {
    return this.api.getPort()
  }
}
