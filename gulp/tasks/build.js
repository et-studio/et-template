'use strict'

var sequence = require('gulp-sequence')
var babel = require('gulp-babel')
var del = require('del')
var esformatter = require('gulp-esformatter')
var wrap = require('../middleware/cmd-wrap')
var runtime = require('../middleware/gulp-runtime')

var destDir = 'es5'
var srcDir = 'src'

module.exports = function (gulp) {
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

  gulp.task('build-runtime', function () {
    return gulp.src([
      srcDir + '/compiler.js',
      srcDir + '/parser.js'
    ])
      .pipe(runtime())
      .pipe(babel())
      .pipe(wrap('etRuntime'))
      .pipe(esformatter())
      .pipe(gulp.dest(destDir))
  })

  gulp.task('build-dependency', function () {
    return gulp.src(srcDir + '/dependency.js')
      .pipe(wrap('etDependency'))
      .pipe(esformatter())
      .pipe(gulp.dest(destDir))
  })

  gulp.task('build', sequence('dev', 'build-clean', 'build-js', 'build-dependency', 'build-runtime'))
}
