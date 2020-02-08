import express, { Application as ExpressApp } from 'express'
import { RequestHandler } from 'express-serve-static-core'
import { AddressInfo } from 'net'
import { Server } from 'http'

export default class Application {
  private server: Server
  private address: AddressInfo = { port: 0, address: '', family: '' }
  private constructor (private app: ExpressApp) {}

  static create(app: ExpressApp = express()): Application {
    return new Application(app)
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
}
