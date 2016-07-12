module.exports = function() {
  const http = require('http')
  const server = http.createServer((req, res) => res.end('Not quite set up!'))
  const io = require('socket.io')(server)
  server.listen(9999)

  return { server, io }
}
