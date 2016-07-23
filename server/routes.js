const GameState = require('./GameState')

function addClient(socket) {
  console.log('somebody connected', socket.id)
  
  let state = GameState.addPlayer(socket.id)
  socket.emit('gameMe', {state, id: socket.id})
  socket.emit('gameData', GameState.players)
  
  socket.on('gameUpdate', function(data) {
    GameState.updatePlayer(this.id, data)
    
    socket.emit('gameMe', { state: GameState.players[this.id], id: this.id })
  })
  
  socket.on('disconnect', function() {
    console.log('somebody disconnected', this.id)
    GameState.removePlayer(this.id)
  })
}


module.exports = function(express, app, io, server) {
  console.log("setting up express")
  app.use(express.static('public'))
  app.get('/sample-text', function(req, res) {
    res.end('Sample Text yay')
  })
  app.get('*', (req, res) => res.status(404).send('404 - did you really think that\'d work?'))

  console.log("setting up socket.io")
  io.on('connection', addClient)
  
  GameState.loopHandler = function(){
    io.sockets.emit('gameData', { players: GameState.players, food: GameState.food } )
  }
  
  server.on('close', function(){
    GameState.stopLoop()
  })
  GameState.init()
  GameState.startLoop()
}