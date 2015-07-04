'use strict'

var through = require('through2')
var esformatter = require('esformatter')

module.exports = function (moduleId) {
  return through.obj(function (file, enc, next) {
    if (!file.isBuffer()) {
      return next()
    }
    var contents = file.contents.toString()
    contents = `;(function(global, factory){
      if (typeof define === 'function' && define.amd) {
        define('${moduleId}', factory)
      } else {
        var require = function(){}
        var module = {}
        var exports = {}
        factory(require, exports, module)
        global.${moduleId} = module.exports
      }
    })(window, function(require, exports, module) {
      ${contents}
    });`
    contents = esformatter.format(contents)

    file.contents = new Buffer(contents)
    this.push(file)
    next()
  })
}
