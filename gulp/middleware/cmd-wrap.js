'use strict'

var through = require('through2')
var esformatter = require('esformatter')

module.exports = function () {
  return through.obj(function (file, enc, next) {
    if (!file.isBuffer()) {
      return next()
    }
    var contents = file.contents.toString()
    contents = `define(function(require, exports, module){
      ${contents}
    })`
    contents = esformatter.format(contents)

    file.contents = new Buffer(contents)
    this.push(file)
    next()
  })
}
