module.exports = function(express, app, io) {
  console.log("loading routes")
  app.use(express.static('public'))
  app.get('/sample-text', function(req, res) {
    res.end('Sample Text yay')
  })
  app.get('*', (req, res) => res.status(404).send('404 - did you really think that\'d work?'))
}