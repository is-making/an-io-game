module.exports = function(express, app, io, server) {
  // add additional modules here. This file can be hot-reloaded
  require('./routes')(express, app, io, server)
}