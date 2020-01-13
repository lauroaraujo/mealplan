import { InfraRequest } from '../infra/request'
import { InfraResponse } from '../infra/response'

const home = (req: InfraRequest, res: InfraResponse) => {
  res.send(`Hi, I'm up and running!`)
}

export default home
