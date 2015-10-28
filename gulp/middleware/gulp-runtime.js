'use strict'

var rootDir = `${process.cwd()}/src`
var path = require('path')
var fs = require('fs')
var through = require('through2')
var gutil = require('gulp-util')

function extend (A, B) {
  for (var key in B) {
    A[key] = B[key]
  }
  return A
}
function getModules (filePath) {
  var re = {}
  var contents = fs.readFileSync(filePath, 'utf-8')
  var list = contents.split('\n')
  var contentsList = []
  for (var i = 0; i < list.length; i++) {
    var item = list[i] || ''
    item = item.trim()
    var match = /^\s*import +(\S+) +from +'(\S+)'/.exec(item)
    var match2 = /^\s*export default ([\s\S]*)/.exec(item)
    if (match && match[1] && match[2]) {
      var dir = path.dirname(filePath)
      var tmpPath = path.resolve(dir, match[2]) + '.js'
      extend(re, getModules(tmpPath))
      contentsList.push(`var ${match[1]} = innerRequire('${match[2]}')`)
    } else if (match2 && match2[1]) {
      contentsList.push(`module.exports = ${match2[1]}`)
    } else {
      contentsList.push(item)
    }
  }
  var key = path.relative(rootDir, filePath)
  key = key.slice(0, key.length - 3) // remove .js
  re[key] = `innerDefine('${key}', function(innerRequire, exports, module){
    ${contentsList.join('\n')}
  })`
  return re
}

module.exports = function () {
  var moduleKeys = {}
  var moduleList = []
  var outputStream = through.obj(function (file, enc, next) {
    if (!file.isBuffer()) {
      return next()
    }
    var modules = getModules(file.path)
    for (var key in modules) {
      if (!moduleKeys[key]) {
        moduleKeys[key] = 1
        moduleList.push(modules[key])
      }
    }
    next()
  }, function (next) {
    var data = `
      var modules = {}
      function resolve(path, patch) {
        if (!patch) return path
        var pathList = path.split('/')
        var patchList = patch.split('/')
        pathList.pop()
        for (var i = 0; i < patchList.length; i++) {
          var item = patchList[i]
          if (item === '..') {
            pathList.pop()
          } else if (item === '.') {

          } else {
            pathList.push(item)
          }
        }
        return pathList.join('/')
      }
      function innerDefine(key, factory) {
        function innerRequire(patch){
          var path = resolve(key, patch)
          return modules[path]
        }
        var module = {}
        var exports = {}
        factory(innerRequire, exports, module)
        modules[key] = module.exports || exports
      }

      ${moduleList.join('\n')}

      var RumtimeET = modules.et
      RumtimeET.prototype.compileString = RumtimeET.prototype.compile
      RumtimeET.prototype.compile = function (str, options) {
        var result = this.compileString(str, options)
        var fn = new Function('require', 'exports', 'module', result)
        var _module = {}
        var _exports = {}
        fn(require, _exports, _module)
        return _module.exports || _exports
      }
      module.exports = RumtimeET`

    outputStream.push(new gutil.File({
      path: 'et-runtime.js',
      contents: new Buffer(data)
    }))
    next()
  })
  return outputStream
}
