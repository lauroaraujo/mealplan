import { Request as ExpressResponse } from 'express'

export default class Request {
  private constructor (private request: InfraRequest) {}

  static create (expressReq: ExpressResponse) {
    return new Request(expressReq)
  }

  static createNull () {
    return new Request(new NullableRequest())
  }
}

export interface InfraRequest {
}

class NullableRequest {
}
