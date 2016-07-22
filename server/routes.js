module.exports = function(express, app, io) {
  console.log("setting up express")
  app.use(express.static('public'))
  app.get('/sample-text', function(req, res) {
    res.end('Sample Text yay')
  })
  app.get('*', (req, res) => res.status(404).send('404 - did you really think that\'d work?'))

  console.log("setting up socket.io")
  io.on('connection', function(socket) {
    console.log('somebody connected')
    socket.on('disconnect', function() {
      console.log('somebody disconnected')
    })
  })
}