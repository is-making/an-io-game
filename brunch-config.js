module.exports = {
  files: {
    // 10/10 best terminology
    javascripts: { joinTo: 'index.js' },
    stylesheets: { joinTo: 'index.css' }
  },

  server: {
    path: 'server/server.js'
  },
  
  plugins: {
    babel: { presets: ['es2015', 'stage-3'] }
  }
}