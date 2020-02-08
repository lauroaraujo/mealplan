import { Request as ExpressResponse } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import RequestMock from '../../__mocks__/express/RequestMock'

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
