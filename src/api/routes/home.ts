import { Request } from 'express'
import { InfraResponse } from '../infra/express/Response'

const home = (req: Request, res: InfraResponse) => {
  res.send(`Hi, I'm up and running!`)
}

export default home
