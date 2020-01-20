import { Request as ExpressResponse } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export default class Request {
  private constructor (private request: InfraRequest) {}

  static create (expressReq: ExpressResponse) {
    return new Request(expressReq)
  }

  static createNull (query: ParamsDictionary) {
    return new Request(new NullableRequest(query))
  }

  get query() {
    return this.request.query
  }
}

export interface InfraRequest {
  query: ParamsDictionary
}

class NullableRequest implements InfraRequest {
  constructor(private _query: ParamsDictionary) {}

  get query() {
    return this._query
  }
}
