module.exports = function TestDotLocalhost (env) {
  const { RESPONSE } = env
  return function (req, res) {
    res.end(RESPONSE)
  }
}
