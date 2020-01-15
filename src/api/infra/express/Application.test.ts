import Application from './Application'
import request from 'request'

describe('Express Application', () => {
  let application: Application

  beforeAll(async () => {
    application = await Application
      .create()
      .start()
  })

  afterAll(async () => {
    await application.stop()
  })

  it('uses the provided port on start().', async () => {
    const app = Application.createNull()

    const port = 33591
    await app.start(port)
    expect(app.getPort()).toBe(port)
    await app.stop()
  })

  it ('[os] assigns a random port correctly if no port is specified', async () => {
    const app = Application.create()
    await app.start()
    expect(app.getPort()).toBeGreaterThan(0)
    await app.stop()
  })

  it ('[network] returns an error html if there is no route', done => {
    expect.assertions(1)

    request(application.getAddress(), (_err, _response, body) => {
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
