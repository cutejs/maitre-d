const path = require('path')

const Server = require('./server')
const Modules = require('./modules')
//const Github = require('./github')
//const Npm = require('./npm')

function System (options) {

  const { root } = options

  if (typeof root === 'string') {
    this.root = root
  } else {
    throw new TypeError('System root directory must be a string')
  }

  this.modules = new Modules(this.root)
  this.server = new Server()
  this.server.setHandlers(this.modules.getHandlers())
}

System.prototype.addModule = function (hostname, pathToModule, Adapter, env) {
  const fullPathToModule = path.join(this.root, pathToModule)
  this.modules.addModule(hostname, fullPathToModule, Adapter, env)
}

System.prototype.start = function (httpPort, httpsPort) {
  return this.server.listen(httpPort, httpsPort)
}

System.prototype.stop = function () {
  return this.server.close()
}

module.exports = System
