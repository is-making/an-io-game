/* global io */

// brunch can do require(...)s by default too :O
console.log('an-io-game: connecting')
const socket = io()
socket.on('connect', function(){
  console.log('an-io-game: connected!')
})
socket.on('disconnect', function(){
  console.log('an-io-game: lost connection')
})