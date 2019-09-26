const path = require('path')

const System = require('../system')
const { FunctionAdapter } = require('../system/adapters')

const system = new System({
  httpPort: 7777,
  httpsPort: 7778,
  root: path.join(__dirname, '/system_test_modules'),
})

system.addModule('ctrl.localhost', 'ctrl.localhost', FunctionAdapter)
system.addModule('test.localhost', 'test.localhost', FunctionAdapter)
