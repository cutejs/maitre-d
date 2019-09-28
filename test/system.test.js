const path = require('path')
const test = require('tape')
const request = require('request-promise-native')

const System = require('../system')
const { FunctionAdapter } = require('../system/adapters')

test('Integration Test', async t => {

  try {
    const system = new System({ root: path.join(__dirname, '/system_test_modules') })

    const CTRL = 'ctrl.localhost'
    const TEST = 'test.localhost'

    system.addModule('ctrl.localhost', 'ctrl.localhost', FunctionAdapter, { RESPONSE: CTRL})
    system.addModule('test.localhost', 'test.localhost', FunctionAdapter, { RESPONSE: TEST})

    await system.start()

    try {
      const response = await request('http://ctrl.localhost')
      t.equal(response, CTRL, 'Routed successfully once')

      const response2 = await request('http://test.localhost')
      t.equal(response2, TEST, 'Routed to two different hosts')
    } catch (err) {
      t.error(err)
    }

    await system.stop()

  } catch (err) {
    t.error(err, 'Failed to run the test')
  }

  t.end()
})
