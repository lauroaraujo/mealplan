import MealPlanAPI from './MealPlanAPI'
import Env from './infra/Env'
import Console from './infra/Console'

export default class MealPlan {
  private api: MealPlanAPI

  constructor (private env = Env.create(), private console = Console.create()) {
    const port = this.env.getNumber('PORT', 0)
    this.api = new MealPlanAPI(port, this.console)
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
