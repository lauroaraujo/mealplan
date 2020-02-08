import { InfraRequest } from '../infra/express/Request'
import { InfraResponse } from '../infra/express/Response'

const home = (req: InfraRequest, res: InfraResponse) => {
  res.send(`Hi, I'm up and running!`)
}

export default home
