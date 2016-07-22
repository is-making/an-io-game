/* global io */

// brunch can do require(...)s by default too :O
console.log('an-io-game: connecting')
const socket = io()

let isRunning = false
window.me = {}
window.players = {}

function frame(){
  if(isRunning) {
    requestAnimationFrame(frame)
  }
  
  // do some rendering
  socket.emit('update', {direction: Math.random() * 360})
}

socket.on('connect', function(){
  console.log('an-io-game: connected!')
  isRunning = true
  requestAnimationFrame(frame)
})

socket.on('me', function(data){
  window.me = data
})

socket.on('data', function(data){
  for(let id in data) {
    window.players[id] = data[id]
  }
})

socket.on('disconnect', function(){
  console.log('an-io-game: lost connection')
  isRunning = false
})