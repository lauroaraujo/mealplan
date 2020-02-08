import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'

export default class RequestMock {
  private constructor(private _query: ParamsDictionary) {}

  static create = (query: ParamsDictionary = {}): Request<ParamsDictionary> => {
    return new RequestMock(query) as any
  }

  get query () {
    return this._query
  }
}
