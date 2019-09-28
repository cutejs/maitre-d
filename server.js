const path = require('path')
const System = require('./system')
const { FunctionAdapter } = System

const system = new System({ root: path.join(__dirname, 'test/system_test_modules') })

system.addModule('ctrl.localhost', 'ctrl.localhost', FunctionAdapter, { RESPONSE: 'master ctrl here what\'s your status?' })

system.start()
