const http = require('http')

function HostNotFound (req, res) {
  res.statusCode = 404
  res.statusMessage = 'Host not found'
  res.end()
}

//function HttpsRedirect (req, res) {
  //res.statusCode = 302
//}

function Server () {

  this.handlers = {}

  this.httpServer = http.createServer((req, res) => {
    const handler = this.handlers[req.headers.host] || HostNotFound
    handler(req, res)
  })
}

Server.prototype.listen = function (httpPort = 80, httpsPort = 443) {
  return new Promise((resolve, reject) => {
    let started = 0
    let finished = 0
    const errors = {}

    function start () {
      started++
    }

    function finish () {
      if (++finished === started) {
        if (errors.http || errors.https) {
          if (errors.http && errors.https) {
            const error = new Error('Both servers failed to listen')
            Object.assign(error, errors)
            return reject(error)
          }
          return reject(errors.http || errors.https)
        }
        resolve()
      }
    }

    start()
    this.httpServer.listen(httpPort, err => {
      if (err) {
        errors.http = err
      }
      finish()
    })

    //this.httpsServer.listen(httpPort, err => {
      //if (err) {
        //result.http.error = err
      //}
      //finish()
    //})
  })
}

Server.prototype.close = function () {
  return new Promise((resolve, reject) => {
    let started = 0
    let finished = 0
    const errors = {}

    function start () {
      started++
    }

    function finish () {
      if (++finished === started) {
        if (errors.http || errors.https) {
          if (errors.http && errors.https) {
            const error = new Error('Both servers failed to close')
            Object.assign(error, errors)
            return reject(error)
          }
          return reject(errors.http || errors.https)
        }
        resolve()
      }
    }

    start()
    this.httpServer.close(err => {
      if (err) {
        errors.http = err
      }
      finish()
    })

    //start()
    //this.httpsServer.close(err => {
      //if (err) {
        //errors.https = err
      //}
      //finish()
    //})
  })
}

// handlers: an object mapping hostname -> function (req, res)
Server.prototype.setHandlers = function (handlers) {
  this.handlers = handlers
}

module.exports = Server
