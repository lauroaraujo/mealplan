import { Response as ExpressResponse } from 'express'

export default class Response {
  private lastOutput: any
  private lastStatus: number

  private constructor (private response: InfraResponse) {}

  static create (expressRes: ExpressResponse) {
    return new Response(expressRes)
  }

  static createNull () {
    return new Response(new NullableResponse())
  }

  send = (body: any): Response => {
    this.lastOutput = body
    return this
  }

  json = (body: any): Response => {
    this.lastOutput = body
    this.response.json(body)
    return this
  }

  status = (status: number): Response => {
    this.lastStatus = status
    this.response.status(status)
    return this
  }

  getLastOutput = () => this.lastOutput
  getLastStatus = () => this.lastStatus
}

export interface InfraResponse {
  json: (body?: any) => InfraResponse
  send: (body?: any) => InfraResponse
  status: (status?: number) => InfraResponse
}

class NullableResponse implements InfraResponse {
  json = (body?: any) => this
  send = (body?: any) => this
  status = (status?: number) => this
}
