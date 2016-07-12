const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static('public'))
app.get('*', (req, res) => res.status(404).send('404 - did you really think that\'d work?'))

module.exports = ready => server.listen(3333, ready)