'use strict'

var table = require('../middleware/gulp-table')

exports.register = function (gulp) {
  gulp.task('table', function () {
    return gulp.src([
      'src/parsers/*.js'
    ])
      .pipe(table())
      .pipe(gulp.dest('src/parsers'))
  })
}
