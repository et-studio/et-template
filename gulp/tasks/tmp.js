'use strict'

var _ = require('../../es5/util')
var parser = require('../../es5/parsers/format')
var through = require('through2')

var methods = []
var handler = function () {
  return through.obj(function (file, enc, next) {
    if (!file.isBuffer()) return next()

    var contents = file.contents.toString()
    var it = parser.parseData(`function \n ${contents}`)
    it.methods.map(function (method) {
      methods.push(method)
    })

    next()
  }, function () {
    methods = _.uniq(methods).sort()
    console.log(methods)
  })
}

module.exports = function (gulp) {
  gulp.task('tmp', function () {
    return gulp.src([
      'src/templates/**/*.js'
    ])
      .pipe(handler())
  })
}
