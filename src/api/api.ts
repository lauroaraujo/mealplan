import { Server } from 'http'
import express, { Express } from 'express'

export default class FoodbookAPI {
  private app: Express
  private server: Server

  constructor (private port: Number = 3500) {
    this.app = express()
    this.registerRoutes()
  }

  private onServerStarted = () => {
    console.log(`Server listening on port ${this.port}`)
  }

  private onServerStopped = () => {
    console.log(`Server on port ${this.port} has stopped.`)
  }

  registerRoutes = () => {
    this.app.get('/', (req, res) => {
      res.send(`Hi, I'm up and running on port ${this.port}!`)
    })
  }

  stop = async () => {
    if (this.server) {
      console.log(`Shutting down server on port ${this.port}...`)
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
        this.server = this.app.listen(this.port, this.onServerStarted)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
}
