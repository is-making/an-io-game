module.exports = {
  files: {
    // 10/10 best terminology
    javascripts: { joinTo: 'main.js' },
    stylesheets: { joinTo: 'main.css' }
  },

  server: {
    path: 'server/main.js'
  },

  plugins: {
    babel: { presets: ['es2015', 'stage-3'] }
  }
}