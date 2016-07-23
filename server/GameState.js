const GameState = {
  SNAKE_SPEED: 10,         // m/s
  SNAKE_K: 1,              // N/m
  SNAKE_PIECE_M: 1,        // kg
  SNAKE_PIECE_FRICTION: 1, // N
  SNAKE_OPTIMAL_CONTROL_POINT_DISTANCE: 1, // m

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
    
    for(let i = 0; i < 10; i++){
      state.pieces.push({
        x: 0,
        y: 0
      })
    }
    
    let _playerData = {
      lastUpdateTime: Date.now(),
      pieces: []
    }
    
    for(let i = 0; i < 10; i++){
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
    return GameState.SNAKE_SPEED / size
  },

  updatePlayer: function(id, data) {
    let direction = (data.direction || 0) % 360
    let player = GameState.players[id]
    player.direction = direction
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
        if(F > 0){
          F -= GameState.SNAKE_PIECE_FRICTION
          if(F < 0) F = 0
        } else {
          F += GameState.SNAKE_PIECE_FRICTION
          if(F > 0) F = 0
        }
        
        let m = GameState.SNAKE_PIECE_M / (player.pieces.length - i)
        let a = F / m
        _playerData.pieces[i].vx += a * Math.cos(dir) * delta
        _playerData.pieces[i].vy += a * Math.sin(dir) * delta
        
        // epic hacks to prevent oscillation out of control
        if(dist < GameState.SNAKE_OPTIMAL_CONTROL_POINT_DISTANCE) {
          a = 0
          _playerData.pieces[i].vx = 0
          _playerData.pieces[i].vy = 0
        }
      }
    }
  },

  removePlayer: function(id) {
    delete GameState.players[id]
    delete GameState._playerData[id]
  }
}

module.exports = GameState