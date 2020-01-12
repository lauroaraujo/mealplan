import { Server } from 'http'
import express, { Express } from 'express'
import Console from './infra/console'

export default class FoodbookAPI {
  private app: Express
  private server: Server

  constructor (private port: Number = 3500, private console = Console.create() ) {
    this.app = express()
    this.registerRoutes()
  }

  private onServerStarted = () => {
    this.console.log(`Server listening on port ${this.port}`)
  }

  private onServerStopped = () => {
    this.console.log(`Server on port ${this.port} has stopped.`)
  }

  registerRoutes = () => {
    this.app.get('/', (req, res) => {
      res.send(`Hi, I'm up and running on port ${this.port}!`)
    })
  }

  stop = async () => {
    if (this.server) {
      this.console.log(`Shutting down server on port ${this.port}...`)

      return new Promise((resolve, reject) => {
        this.server.close((err) => {
          if (err) {
            reject(err)
          } else {
            this.onServerStopped()
            resolve()
          }
        })
      })
    }
  }

  start = async () => {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(this.port, () => {
          this.onServerStarted()
          resolve()
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  getPort = () => this.port
}
