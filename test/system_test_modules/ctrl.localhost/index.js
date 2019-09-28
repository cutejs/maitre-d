module.exports = function CtrlDotLocalhost (env) {
  const { RESPONSE } = env
  return function (req, res) {
    res.end(RESPONSE)
  }
}
