'use strict'

var esformatter = require('gulp-esformatter')

module.exports = function (gulp) {
  gulp.task('format-design', function () {
    return gulp.src('design/et/**/*.js')
      .pipe(esformatter())
      .pipe(gulp.dest('design/et'))
  })

  gulp.task('format-test', function () {
    return gulp.src('design/dot/**/*.js')
      .pipe(esformatter())
      .pipe(gulp.dest('design/dot'))
  })

  gulp.task('format', ['format-design', 'format-test'])
}
