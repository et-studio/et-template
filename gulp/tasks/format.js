'use strict'

var esformatter = require('gulp-esformatter')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sequence = require('gulp-sequence')

module.exports = function (gulp) {

  gulp.task('format-design',function () {
    return gulp.src(['design/**/*.js', '!design/**/*.min.js'])
      .pipe(esformatter())
      .pipe(gulp.dest('design'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('design'))
  })

  gulp.task('format', sequence('format-design'))
}
