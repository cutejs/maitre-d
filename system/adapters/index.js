const FunctionAdapter = Symbol()
const ProxyAdapter = Symbol()

module.exports = {
  FunctionAdapter,
  [FunctionAdapter]: require('./function'),
  ProxyAdapter,
  [ProxyAdapter]: require('./proxy')
}
