const test = require('tape')
const request = require('request-promise-native')

test('Test server with mock handlers', async t => {
  const Server = require('../system/server.js')

  const MESSAGE = 'test complete'

  const handlers = {
    'ctrl.localhost': function (req, res) {
      res.end(MESSAGE)
    },
  }

  try {
    const server = new Server() 

    await server.listen()

    server.setHandlers(handlers)

    try {
      const response = await request('http://ctrl.localhost')
      t.equal(response, MESSAGE, 'Routed successfully once')
    } catch (err) {
      t.error(err)
    }

    try {
      await request('http://localhost')
      t.fail('Received an unexpected response')
    } catch (err) {
      t.equal(err.statusCode, 404, 'Appropriate error code')
      t.equal(err.response.statusMessage, 'Host not found', 'Expected error message')
    }

    await server.close()

  } catch (err) {
    t.error(err, 'Failed to run the test!')
  }

  t.end()
})
