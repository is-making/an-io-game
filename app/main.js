/* global io */

// brunch can do require(...)s by default too :O
console.log('an-io-game: connecting')
const socket = io()

const UPDATE_TICK = 100 // ms

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let isRunning = false
window.me = {}
window.players = {}

let animationFrame

let currentDirection = 0
let offsetX = 0, offsetY = 0


function frame(){
  if(isRunning) {
    animationFrame = requestAnimationFrame(frame)
  } else {
    return
  }
  
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  ctx.fillStyle = 'blue'
  for(let piece of window.me.state.pieces) {
    ctx.fillRect((piece.x - offsetX) * 5 + canvas.width / 2, (piece.y - offsetY) * 5 + canvas.height / 2, 5, 5)
  }
  
  ctx.fillStyle = 'red'
  for(let foodItem of window.food) {
    ctx.fillRect((foodItem.x - offsetX) * 5 + canvas.width / 2, (foodItem.y - offsetY) * 5 + canvas.height / 2, 5, 5)
  }
}

socket.on('connect', function(){
  console.log('an-io-game: connected!')
  isRunning = true
  animationFrame = requestAnimationFrame(frame)

  canvas.classList.add('active')
})

socket.on('gameMe', function(data){
  window.me = data
  window.players[data.id] = data.state
  
  offsetX = data.state.pieces[0].x
  offsetY = data.state.pieces[0].y
  
  socket.emit('gameUpdate', {direction: currentDirection})
})

socket.on('gameData', function(data){
  for(let id in data.players) {
    window.players[id] = data[id]
  }
  window.food = data.food
})

socket.on('disconnect', function(){
  console.log('an-io-game: lost connection')
  isRunning = false
  cancelAnimationFrame(animationFrame)
  canvas.classList.remove('active')
})

window.addEventListener('resize', function(){
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight
})
canvas.width  = window.innerWidth
canvas.height = window.innerHeight

canvas.addEventListener('mousemove', function(e){
  let dx = e.pageX - this.offsetLeft  - canvas.width / 2
  let dy = e.pageY - this.offsetTop - canvas.height / 2
  
  currentDirection = Math.atan2(dy, dx) * 180 / Math.PI
})