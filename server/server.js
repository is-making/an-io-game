/**
 * Contains a mini framework for hot-reloading
 * 
 * >> Avoid modifying this file, because currently brunch needs to be restarted
 * >> to apply changes
 */
console.log('==== an-io-game ====')
console.log('loading dependencies')

require('dotenv').config()
let port = process.env.SERVER_PORT || 3333

const express = require('express')
const http = require('http')
const socketio = require('socket.io')
let app, server, io

function init(callback) {
  app = express()
  server = http.Server(app)
  io = socketio(server)
  
  // load index.js, which loads everything else
  require('./')(express, app, io)
  
  server.listen(port, function() {
    console.log("listening on :" + port)
    if(callback) callback()
  })
}

function quit() {
  console.log("shutting down server")
  io.close()
  server.close()
}

module.exports = ready => init(ready)

////////////////////////////////////////////////////////////////////////////////
// Code for hot-reloading on changes

/**
 * Clears require cache, shuts down server
 * then reloads server & server modules
 */
function hotReload() {
  quit()
  for (let item in require.cache) {
    // only clear our modules --
    // node_modules ones aren't going to change anytime soon
    if(!item.startsWith(process.cwd() + '/server')) continue
    // don't delete ourselves!
    if(item == process.cwd() + '/server/server.js') continue
    delete require.cache[item]
  }
  init()
}

require('node-watch')('server/', function(filename) {
  if (filename == 'server/server.js') {
    // TODO: figure out how to restart here. IDK anything about brunch
    console.log('server/server.js changed, restart server to apply')
    return
  }
  console.log(filename, 'changed, reloading server')
  hotReload()
})