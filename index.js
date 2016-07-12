'use strict'

const http = require('http')
const server = http.createServer((req, res) => res.end('Not quite set up!'))
const io = require('socket.io')(server)
server.listen(9999)

console.log('Once upon a time there was a planet.')
console.log('Then the planet exploded.')
console.log('The end!')
