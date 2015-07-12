'use strict'

var table = require('../middleware/gulp-table')

module.exports = function (gulp) {
  gulp.task('table', function () {
    return gulp.src([
      'src/parsers/*.js'
    ])
      .pipe(table())
      .pipe(gulp.dest('src/parsers'))
  })
}
