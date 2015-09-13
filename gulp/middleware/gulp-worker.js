'use strict'

var rootDir = process.cwd()
var path = require('path')
var through = require('through2')
var gutil = require('gulp-util')

function handleString (method, contents) {
  var list = contents.split('\n')
  var re = []
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    if (item.indexOf('// {{') >= 0) {
      re.push('re = re + `')
    } else if (item.indexOf('// }}') >= 0) {
      re.push('`')
    } else {
      re.push(item)
    }
  }
  return `
    ${method} (it) {
      var re = ''
      ${re.join('\n')}
      return re
    }
  `
}

module.exports = function () {
  var map = {}
  var outputStream = through.obj(function (file, enc, next) {
    if (!file.isBuffer()) {
      return next()
    }
    var contents = file.contents.toString()
    var relativePath = path.relative(`${rootDir}/src/templates`, file.path)
    var pathList = relativePath.split(/[\/\.]/g)
    pathList.pop()
    var method = pathList.join('_')

    map[method] = handleString(method, contents)
    next()
  }, function (next) {
    var keys = Object.keys(map).sort()
    var methods = keys.map(function (key) { return map[key] })
    var data = `
      'use strict'
      import _ from './util'

      export default {
        ${methods.join(',')}
      }
    `
    outputStream.push(new gutil.File({
      path: 'worker.js',
      contents: new Buffer(data)
    }))
    next()
  })
  return outputStream
}
