'use strict'

var through = require('through2')
var esformatter = require('esformatter')

module.exports = function (moduleName) {
  return through.obj(function (file, enc, next) {
    if (!file.isBuffer()) {
      return next()
    }
    var contents = file.contents.toString()
    contents = `;
    angular.module('et.template', [])
    .factory('et-dependency', [function() {
      ${contents}
      return et_dependency
    }])`
    contents = esformatter.format(contents)

    file.contents = new Buffer(contents)
    this.push(file)
    next()
  })
}
