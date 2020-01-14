import ExpressApp from './ExpressApp'
import request from 'request'

describe('ExpressApp', () => {
  let expressApp: ExpressApp

  beforeAll(async () => {
    expressApp = await ExpressApp
      .create()
      .start()
  })

  afterAll(async () => {
    await expressApp.stop()
  })

  it('uses the provided port on start().', async () => {
    const app = ExpressApp.createNull()

    const port = 33591
    await app.start(port)
    expect(app.getPort()).toBe(port)
    await app.stop()
  })

  it ('[os] assigns a random port correctly if no port is specified', async () => {
    const app = ExpressApp.create()
    await app.start()
    expect(app.getPort()).toBeGreaterThan(0)
    await app.stop()
  })

  it ('[network] returns an error html if there is no route', done => {
    expect.assertions(1)

    request(expressApp.getAddress(), (_err, _response, body) => {
      const errorHtml =
`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /::</pre>
</body>
</html>
`

      expect(body).toBe(errorHtml)
      done()
    })
  })
})
