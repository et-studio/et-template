'use strict'

var sequence = require('gulp-sequence')
var babel = require('gulp-babel')
var del = require('del')
var esformatter = require('gulp-esformatter')
var umd = require('../middleware/umd-wrap')
var ngWrap = require('../middleware/ng-wrap')
var runtime = require('../middleware/gulp-runtime')
var rename = require('gulp-rename')

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
      '!' + srcDir + '/templates/**/*.js'
    ])
      .pipe(babel())
      .pipe(gulp.dest(destDir))
  })

  gulp.task('build-runtime', function () {
    return gulp.src([
      srcDir + '/et.js'
    ])
      .pipe(runtime())
      .pipe(babel())
      .pipe(umd('et-runtime'))
      .pipe(esformatter())
      .pipe(gulp.dest(destDir))
  })

  gulp.task('build-dep', function () {
    return gulp.src(srcDir + '/dependency.js')
      .pipe(umd('et-dependency'))
      .pipe(esformatter())
      .pipe(gulp.dest(destDir))
  })

  gulp.task('build-angular', function () {
    return gulp.src(srcDir + '/dependency.js')
      .pipe(ngWrap('et-dependency'))
      .pipe(esformatter())
      .pipe(rename('dependency.ng.js'))
      .pipe(gulp.dest(destDir))
  })

  gulp.task('build', sequence('dev', 'build-clean', ['build-js', 'build-dep', 'build-angular'],
'build-runtime'))
}
