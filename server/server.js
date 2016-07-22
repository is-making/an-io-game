/**
 * Contains a mini framework for hot-reloading
 * 
 * >> Avoid modifying this file, because currently brunch needs to be restarted
 * >> to apply changes
 */
console.log('==== an-io-game ====')
console.log('loading dependencies')

require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

function init() {
  // load index.js, which loads everything else
  require('./')(express, app, io)
}

init()

let port = process.env.SERVER_PORT || 3333
module.exports = ready => server.listen(port, function() {
  console.log("listening on :" + port)
  ready()
})

////////////////////////////////////////////////////////////////////////////////
// Code for hot-reloading on changes

/**
 * Clears express cache, then clears require cache,
 * then reloads server modules
 */
function hotReload() {
  var routes = app._router.stack;
  routes.forEach(removeMiddlewares)
  routes.splice(0, routes.length)

  function removeMiddlewares(route, i, routes) {
    if (route.route) {
      route.route.stack.forEach(removeMiddlewares)
      route.route.stack.splice(i, route.route.stack.length)
    }
  }

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
  console.log(filename, 'changed, hot loading')
  hotReload()
})