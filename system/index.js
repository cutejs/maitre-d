const Server = require('./server')
const Modules = require('./modules')
//const Github = require('./github')
//const Npm = require('./npm')

function System (options) {
  const {
    httpPort,
    httpsPort,
    root,
  } = options

  if (typeof root === 'string') {
    this.root = root
  } else {
    throw new TypeError('System root directory must be a string')
  }

  this.modules = new Modules(this.root)
  this.server = new Server(httpPort, httpsPort)
  this.server.setHandlers(this.modules.getHandlers())
}

System.prototype.addModule = function (hostname, pathToModule, $Adapter) {
  this.modules.addModule(hostname, pathToModule, $Adapter)
}

module.exports = System
