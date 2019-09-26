const http = require('http')

function HostNotFound (req, res) {
  res.statusCode = 404
  res.statusMessage = 'Host not found'
  res.end()
}

//function HttpsRedirect (req, res) {
  //res.statusCode = 302
//}

function Server (httpPort = 80, httpsPort = 443) {

  this.handlers = {}

  this.httpServer = http.createServer((req, res) => {
    const handler = this.handlers[req.headers.host] || HostNotFound
    handler(req, res)
  })

  this.httpServer.listen(httpPort)
}

// handlers: an object mapping hostname -> function (req, res)
Server.prototype.setHandlers = function (handlers) {
  this.handlers = handlers
}

module.exports = Server
