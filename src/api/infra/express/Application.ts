import express from 'express'
import { PathParams, RequestHandler } from 'express-serve-static-core'
import { AddressInfo } from 'net'

export default class Application {
  private server: InfraServer
  private address: AddressInfo = { port: 0, address: '', family: '' }
  private constructor (private app: InfraExpressApp = express()) {}

  static create(): Application {
    return new Application()
  }

  static createNull(): Application {
    return new Application(new NullableExpressApp())
  }

  get = (path: string, handler: RequestHandler) => {
    this.app.get(path, handler)
    return this
  }

  start = async (port: number = 0): Promise<this> => {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(port, () => {
          this.address = (this.server.address() as AddressInfo)
          resolve(this)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  stop = async (): Promise<this> => {
    if (!this.server) {
      throw(new Error('Server never started.'))
    }

    return new Promise((resolve, reject) => {
      this.server.close(err => {
        if (err) {
          reject(err)
        }
        resolve(this)
      })
    })
  }

  getPort = (): number => this.address.port
  getIPAddress = (): string => this.address.address
  getAddress = (https: boolean = false): string => `http${https ? 's' : ''}://${this.getIPAddress()}:${this.getPort()}`
}

class NullableExpressApp implements InfraExpressApp {
  private server: InfraServer

  get = () => this

  listen = (port: number, cb?: ListenCallback) => {
    this.server = new NullableInfraServer(port)

    if (cb) {
      setImmediate(cb)
    }

    return this.server
  }
}

class NullableInfraServer implements InfraServer {
  constructor (
    private port: number = 1234,
    private ipAddress: string = '127.0.0.1',
    private family: string = 'IPv4'
  ) {}

  close = (cb?: CloseCallback) => {
    if (cb) {
      setImmediate(cb)
    }

    return this
  }

  address = () => ({
    port: this.port,
    address: this.ipAddress,
    family: this.family
  })
}

type ListenCallback = (...args: any[]) => void
type CloseCallback = (err?: Error) => void

interface InfraExpressApp {
  get(path: PathParams, handler: RequestHandler): InfraExpressApp
  listen(port: number, callback?: ListenCallback): InfraServer
}

interface InfraServer {
  close(callback?: CloseCallback): this
  address(): AddressInfo | string | null
}
