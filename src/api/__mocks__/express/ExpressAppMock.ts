import { Application } from 'express'

type ListenCallback = (...args: any[]) => void
type CloseCallback = (err?: Error) => void

export default class ExpressAppMock {
  private server: InfraServerMock

  private constructor () {}

  static create (): Application {
    return new ExpressAppMock() as any
  }

  get = () => this

  listen = (port: number, cb: ListenCallback) => {
    this.server = new InfraServerMock(port)
    setImmediate(cb)
    return this.server
  }
}

class InfraServerMock {
  constructor (private port: number) {}

  close = (cb: CloseCallback) => {
    setImmediate(cb)
    return this
  }

  address = () => ({
    port: this.port,
    address: '127.0.0.1',
    family: 'IPv4'
  })
}
