const path = require('path')

function Modules (moduleRoot) {
  this.moduleRoot = moduleRoot
  this.modules = {}
  this.requestHandlers = {}
  //this.httpsCerts = {}
}

Modules.prototype.addModule = function (hostname, pathToModule, Adapter, env) {
  const fullPathToModule = path.join(this.moduleRoot, pathToModule)
  const module = new Module(hostname, fullPathToModule, Adapter, env)
  this.modules[hostname] = module
  this.requestHandlers[hostname] = module.handler
}

function Module (hostname, pathToModule, Adapter, env) {
  const App = require(pathToModule)
  this.hostname = hostname
  this.app = new App(env)
  this.handler = new Adapter(this.app)
}

module.exports = Modules
