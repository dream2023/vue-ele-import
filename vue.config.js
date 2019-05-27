const path = require('path')
const isDevelopment = process.env.NODE_ENV === 'development'
const isDoc = process.env.IS_DOC === 'true'

module.exports = {
  publicPath: isDevelopment ? '/' : '/vue-ele-import/',
  outputDir: path.resolve(__dirname, './docs/'),
  css: { extract: isDevelopment },
  configureWebpack: {
    entry: isDoc ? './documentation/main.js' : './example/main.js',
    output: {
      libraryExport: 'default'
    }
  }
}
