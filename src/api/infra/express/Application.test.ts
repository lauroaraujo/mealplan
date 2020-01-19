import Application from './Application'
import got from 'got'

describe('Express Application', () => {
  it('uses the provided port on start().', async () => {
    const app = Application.createNull()

    const port = 33591
    await app.start(port)
    expect(app.getPort()).toBe(port)
    await app.stop()
  })

  it ('does nothing if stop() is called before the server starts', async () => {
    const app = Application.createNull()
    await expect(app.stop())
      .rejects
      .toThrow('Server never started.')
  })

  it ('[os] assigns a random port correctly if no port is specified', async () => {
    const app = Application.create()
    await app.start()
    expect(app.getPort()).toBeGreaterThan(0)
    await app.stop()
  })

  it ('[os] throws if the port is not valid', async () => {
    expect.assertions(1)
    const app = Application.create()

    await expect(app.start(-1))
      .rejects
      .toThrow('Port should be >= 0 and < 65536. Received -1.');
  })

  it ('[os] throws if stop() is called on an already stopped server ', async () => {
    expect.assertions(1)
    const app = Application.create()

    await app.start(0)
    await app.stop()

    await expect(app.stop())
      .rejects
      .toThrow('Server is not running.');
  })

  it ('[network] returns an error html if there is no route', async () => {
    expect.assertions(2)

    const errorHtml =
`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /</pre>
</body>
</html>
`

    const app = await Application.create().start()

    try {
      await got.get(`http://localhost:${app.getPort()}`)
    } catch(err) {
      expect(err.response.statusCode).toBe(404)
      expect(err.response.body).toEqual(errorHtml)
    } finally {
      await app.stop()
    }
  })
})
