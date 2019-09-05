var concat = require('concat-stream')
var pump = require('pump')

module.exports = streamValueReader

function streamValueReader (stream, opts) {
  var value = null
  var callbacks = []

  pump(stream, concat(opts, function (data) {
    value = data

    while (callbacks.length > 0) {
      var cb = callbacks.shift()
      cb(data)
    }
  }))

  return function () {
    return new Promise(function (resolve) {
      if (value !== null) {
        resolve(value)
      } else {
        callbacks.push(resolve)
      }
    })
  }
}
