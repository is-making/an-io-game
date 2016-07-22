const GameState = require('./GameState')

function addClient(socket) {
  console.log('somebody connected', socket.id)
  
  let state = GameState.addPlayer(socket.id)
  socket.emit('me', {state, id: socket.id})
  socket.emit('data', GameState.players)
  
  socket.on('update', function(data) {
    GameState.updatePlayer(this.id, data)
    
    socket.emit('me', { state: GameState.players[this.id], id: this.id })
    let obj = {}
    obj[this.id] = GameState.players[this.id]
    this.broadcast.emit('data', obj)
  })
  
  socket.on('disconnect', function() {
    console.log('somebody disconnected', this.id)
    GameState.removePlayer(this.id)
  })
}


module.exports = function(express, app, io) {
  console.log("setting up express")
  app.use(express.static('public'))
  app.get('/sample-text', function(req, res) {
    res.end('Sample Text yay')
  })
  app.get('*', (req, res) => res.status(404).send('404 - did you really think that\'d work?'))

  console.log("setting up socket.io")
  io.on('connection', addClient)
}