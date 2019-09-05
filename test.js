var test = require('tape')
var svr = require('.')
var { Readable } = require('stream')

test('it returns a function, that returns a promise', function (t) {
  t.plan(2)

  var stream = new Readable()

  var get = svr(stream)

  t.ok(typeof get === 'function', 'get is a function')
  t.ok(typeof get().then === 'function', 'get().then is a function')
})

test('forwards options to concat-stream', function (t) {
  t.plan(1)

  var stream = new Readable()

  var get = svr(stream, { encoding: 'string' })

  get().then(function (value) {
    t.ok(typeof value === 'string', 'value is a string')
  })

  stream.push('hello')
  stream.push(null)
})

test('used once before pushed', function (t) {
  t.plan(1)

  var stream = new Readable()

  var get = svr(stream, { encoding: 'string' })

  get().then(function (value) {
    t.ok(value === 'hello world', 'value === hello world')
  })

  stream.push('hello')
  stream.push(' world')
  stream.push(null)
})

test('used once after pushed', function (t) {
  t.plan(1)

  var stream = new Readable()

  var get = svr(stream, { encoding: 'string' })

  stream.push('hello')
  stream.push(' world')
  stream.push(null)

  get().then(function (value) {
    t.ok(value === 'hello world', 'value === hello world')
  })
})

test('used multiple times', function (t) {
  t.plan(2)

  var stream = new Readable()

  var get = svr(stream, { encoding: 'string' })

  get().then(function (value) {
    t.ok(value === 'hello world', 'value === hello world')
  })

  stream.push('hello')
  stream.push(' world')
  stream.push(null)

  get().then(function (value) {
    t.ok(value === 'hello world', 'value === hello world again')
  })
})
