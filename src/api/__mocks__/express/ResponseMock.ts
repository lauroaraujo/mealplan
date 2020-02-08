import { Response } from 'express'

export default class ResponseMock {
  private lastOutput: any
  private lastStatus: number

  private constructor() {}

  static create = (): ResponseMock => {
    return new ResponseMock() as any
  }

  getLastOutput = () => this.lastOutput
  getLastStatus = () => this.lastStatus

  asResponse = () => {
    return this as any
  }

  send = (body: any): ResponseMock => {
    this.lastOutput = body
    return this as any
  }

  json = (body: any): ResponseMock => {
    this.lastOutput = body
    return this as any
  }

  status = (status: number): ResponseMock => {
    this.lastStatus = status
    return this as any
  }
}
