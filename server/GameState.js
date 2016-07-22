module.exports = {
  PLAYER_SPEED: 1, // units per sec
  
  // public player data
  players: {},
  // private player data
  _playerData: {},
  food: [],
  
  addPlayer: function(id) {
    let state = {
      x: 0,
      y: 0,
      name: "New Player"
    }
    this._playerData[id] = {
      lastUpdateTime: Date.now()
    }
    this.players[id] = state
    return state
  },
  
  updatePlayer(id, data) {
    let direction = (data.direction || 0) % 360
    let player = this.players[id]
    let _playerData = this._playerData[id]
    let now = Date.now()
    let delta = (now - _playerData.lastUpdateTime) / 1000 // secs
    _playerData.lastUpdateTime = now
    
    player.x += this.PLAYER_SPEED * delta * Math.cos(direction * Math.PI / 180)
    player.y += this.PLAYER_SPEED * delta * Math.sin(direction * Math.PI / 180)
  },
  
  removePlayer(id) {
    delete this.players[id]
  }
}