'use strict'

var sequence = require('gulp-sequence')
var babel = require('gulp-babel')
var del = require('del')
var wrap = require('../middleware/cmd-wrap')

var destDir = 'es5'
var srcDir = 'src'

exports.register = function (gulp) {
  gulp.task('build-clean', function () {
    del([destDir])
  })

  gulp.task('build-js', function () {
    return gulp.src([
      srcDir + '/**/*.js',
      '!' + srcDir + '/dependency.js',
      '!' + srcDir + '/templates/*.js'
    ])
      .pipe(babel())
      .pipe(gulp.dest(destDir))
  })

  gulp.task('build-dependency', function () {
    return gulp.src(srcDir + '/dependency.js')
      .pipe(wrap())
      .pipe(gulp.dest(destDir))
  })

  gulp.task('build', sequence('dev', 'build-clean', 'build-js', 'build-dependency'))
}
