'use strict'

var through = require('through2')
var ET = require('../../es5/et')

var et = new ET()

module.exports = function () {
  return through.obj(function (file, enc, next) {
    if (!file.isBuffer()) {
      return next()
    }
    var contents = et.compile(file.contents.toString())
    file.contents = new Buffer(contents)
    file.path = file.path.replace(/\.html/, '.js')

    this.push(file)
    next()
  })
}
