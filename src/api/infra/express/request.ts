import { Request as ExpressResponse } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export default class Request {
  private constructor (private request: InfraRequest) {}

  static create (expressReq: ExpressResponse) {
    return new Request(expressReq)
  }

  get query() {
    return this.request.query
  }
}

export interface InfraRequest {
  query: ParamsDictionary
}
