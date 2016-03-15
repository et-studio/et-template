'use strict'

const path = require('path')
const entries = ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080/']

module.exports = {
  entry: {
    index: entries.concat(['./test/server/apps/index.js']),
    parser: entries.concat(['./test/server/apps/parser.js'])
  },
  output: {
    path: './dist',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [{test: /\.ts$/, loader: 'ts'}]
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    alias: {'src': path.resolve(__dirname, './src')}
  },
  devtool: 'inline-source-map'
}

