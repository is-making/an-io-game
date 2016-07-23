const GameState = {
  SNAKE_SPEED: 50,         // m/s
  SNAKE_K: 40,              // N/m
  SNAKE_PIECE_M: 1,        // kg
  SNAKE_DAMPENING: 0.75,
  SNAKE_INITIAL_SIZE: 20,
  
  // public player data
  players: {},
  // private player data
  _playerData: {},
  food: [],

  addPlayer: function(id) {
    let state = {
      pieces: [],
      direction: 0,
      name: "New Player"
    }
    
    for(let i = 0; i < GameState.SNAKE_INITIAL_SIZE; i++){
      state.pieces.push({
        x: 0,
        y: 0
      })
    }
    
    let _playerData = {
      lastUpdateTime: Date.now(),
      pieces: []
    }
    
    for(let i = 0; i < GameState.SNAKE_INITIAL_SIZE; i++){
      _playerData.pieces.push({
        vx: 0,
        vy: 0
      })
    }
    
    GameState.players[id] = state
    GameState._playerData[id] = _playerData
    return state
  },

  getSpeedForSize: function(size) {
    return GameState.SNAKE_SPEED / Math.sqrt(size)
  },

  updatePlayer: function(id, data) {
    let direction = (data.direction || 0) % 360
    let player = GameState.players[id]
    player.direction = direction
  },

  removePlayer: function(id) {
    delete GameState.players[id]
    delete GameState._playerData[id]
  },
  
  _loopPlayer: function(id) {
    let player = GameState.players[id]
    let direction = player.direction
    let _playerData = GameState._playerData[id]
    let now = Date.now()
    let delta = (now - _playerData.lastUpdateTime) / 1000 // secs
    _playerData.lastUpdateTime = now

    let speed = GameState.getSpeedForSize(player.pieces.length)

    _playerData.pieces[0].vx = speed * Math.cos(direction * Math.PI / 180)
    _playerData.pieces[0].vy = speed * Math.sin(direction * Math.PI / 180)
    
    for(let i = 0; i < player.pieces.length; i++) {
      player.pieces[i].x += _playerData.pieces[i].vx * delta
      player.pieces[i].y += _playerData.pieces[i].vy * delta
      
      if(i > 0) {
        let dx = player.pieces[i - 1].x - player.pieces[i].x
        let dy = player.pieces[i - 1].y - player.pieces[i].y
        let dist = Math.sqrt(dx * dx + dy * dy)
        let dir = Math.atan2(dy, dx)
        let F = GameState.SNAKE_K * dist
        
        let Fx = F * Math.cos(dir)
        let Fy = F * Math.sin(dir)
        
        let m = GameState.SNAKE_PIECE_M
        
        _playerData.pieces[i].vx += Fx / m * delta
        _playerData.pieces[i].vy += Fy / m * delta
        _playerData.pieces[i].vx *= GameState.SNAKE_DAMPENING
        _playerData.pieces[i].vy *= GameState.SNAKE_DAMPENING
      }
    }
  },
  
  
  _loop: function(){
    for(let id in GameState.players){
      GameState._loopPlayer(id)
    }
    
    if(GameState.loopHandler){
      GameState.loopHandler()
    }
  },
  
  _interval: 0,
  startLoop: function() {
    console.log("Starting game loop")
    GameState._interval = setInterval(function(){
      GameState._loop()
    }, 1000 / 30)
  },
  stopLoop: function(){
    console.log("Stopping game loop")
    clearInterval(GameState._interval)
  },
  
  init: function() {
    GameState.food = []
    for(let i = 0; i < 1000; i++) {
      GameState.food.push({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 500
      })
    }
  }
}

module.exports = GameState