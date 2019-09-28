function Modules () {
  this.modules = {}
  this.requestHandlers = {}
  //this.httpsCerts = {}
}

Modules.prototype.addModule = function (hostname, pathToModule, Adapter, env) {
  const module = new Module(hostname, pathToModule, Adapter, env)
  this.modules[hostname] = module
  this.requestHandlers[hostname] = module.handler
}

Modules.prototype.getHandlers = function () {
  return this.requestHandlers
}

function Module (hostname, pathToModule, Adapter, env) {
  const App = require(pathToModule)
  this.hostname = hostname
  this.app = App(env)
  this.handler = new Adapter(this.app)
}

module.exports = Modules
