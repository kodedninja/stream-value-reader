# stream-value-reader
Small wrapper around [`concat-stream`](https://npmjs.com/package/concat-stream) and [`pump`](https://npmjs.com/package/pump) for those cases when you need to concat a stream and use its value multiple times, independent of the state of the stream.

Honestly, I just didn't find a better way to solve this and couldn't find anything.

## Installation
```
npm i stream-value-reader
```

## Example
```javascript
var getValue = svr(stream, { encoding: 'string' })

getValue().then(function (value) {
  // waits until stream has ended
  console.log(value + ' first')
})

stream.push('hello')
stream.push(null)

getValue().then(function (value) {
  // reuses the value (approximately)
  console.log(value + ' second')
})
```

## API
### `reader = streamValueReader(stream, opts)`
Returns a function that returns a Promise, which will be called with the concatenated stream value.

`opts` is forwarded to `concat-stream`.
