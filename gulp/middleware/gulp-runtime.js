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
    var item = list[i]
    var match = /^import +(\S+) +from +'(\S+)'/.exec(item)
    var match2 = /export default ([\s\S]*)/.exec(item)
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
  key = key.slice(0, key.length - 3) // remote .js
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

      innerDefine('et', function(innerRequire, exports, module){
        var Compiler = innerRequire('./compiler')
        var Parser = innerRequire('./parser')
        var ET = function(options){
          if (!options) options = {}
          this.options = options
          this.parser = new Parser(options.parser)
          this.compiler = new Compiler(options.compiler)
        }
        ET.prototype.compile = function (str, options) {
          var dom = this.parser.parse(str)
          var result = this.compiler.compile(dom)
          var fn = new Function('require', 'exports', 'module', result)
          var _module = {}
          var _exports = {}
          fn(require, _exports, _module)
          return _module.exports || _exports
        }
        module.exports = ET
      })
      module.exports = modules.et`

    outputStream.push(new gutil.File({
      path: 'et-runtime.js',
      contents: new Buffer(data)
    }))
    next()
  })
  return outputStream
}
