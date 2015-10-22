'use strict'

var through = require('through2')

module.exports = function (moduleId) {
  return through.obj(function (file, enc, next) {
    if (!file.isBuffer()) {
      return next()
    }
    var contents = file.contents.toString()
    contents = `;
    angular.module('et.template', [])
    .factory('${moduleId}', [function() {
      var module = {}
      ${contents}
      return module.exports
    }])`

    file.contents = new Buffer(contents)
    this.push(file)
    next()
  })
}
