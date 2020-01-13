import { Request } from 'express'

export default class APIRequest {
  private constructor (private request: InfraRequest) {}

  static create (expressReq: Request) {
    return new APIRequest(expressReq)
  }

  static createNull () {
    return new APIRequest(new NullableRequest())
  }
}

export interface InfraRequest {
}

class NullableRequest {
}
