import Console from './infra/Console'
import Application from './infra/express/Application'
import home from './routes/home'

export default class MealPlanAPI {
  constructor (
    private port: number = 0,
    private console = Console.create(),
    private app: Application = Application.create()
  ) {
    this.registerRoutes()
  }

  registerRoutes = () => {
    this.app.get('/', home)
  }

  stop = async () => {
    this.console.log(`Shutting down server on port ${this.port}...`)
    await this.app.stop()
    this.console.log(`Server on port ${this.port} has stopped.`)
  }

  start = async () => {
    await this.app.start(this.port)
    this.port = this.app.getPort()
    this.console.log(`Server listening on port ${this.port}`)
  }

  getPort = () => this.port
}
