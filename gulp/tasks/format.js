'use strict'

var esformatter = require('gulp-esformatter')

module.exports = function (gulp) {
  gulp.task('format-design', function () {
    return gulp.src('design/**/*.js')
      .pipe(esformatter())
      .pipe(gulp.dest('design'))
  })

  gulp.task('format-test', function () {
    return gulp.src('test/design/**/*.js')
      .pipe(esformatter())
      .pipe(gulp.dest('test/design'))
  })

  gulp.task('format', ['format-design', 'format-test'])
}
