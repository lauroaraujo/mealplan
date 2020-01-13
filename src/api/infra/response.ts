import { Response } from 'express'

export default class APIResponse {
  private lastOutput: any
  private lastStatus: number

  private constructor (private response: InfraResponse) {}

  static create (expressRes: Response) {
    return new APIResponse(expressRes)
  }

  static createNull () {
    return new APIResponse(new NullableResponse())
  }

  send = (body: any): APIResponse => {
    this.lastOutput = body
    return this
  }

  json = (body: any): APIResponse => {
    this.lastOutput = body
    this.response.json(body)
    return this
  }

  status = (status: number): APIResponse => {
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
