import { InfraRequest } from '../infra/express/request'
import { InfraResponse } from '../infra/express/response'

const home = (req: InfraRequest, res: InfraResponse) => {
  res.send(`Hi, I'm up and running!`)
}

export default home
