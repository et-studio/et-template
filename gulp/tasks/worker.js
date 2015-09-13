'use strict'

var worker = require('../middleware/gulp-worker')
var esformatter = require('gulp-esformatter')

module.exports = function (gulp) {
  gulp.task('worker', function () {
    return gulp.src('src/templates/**/*.js')
      .pipe(worker())
      .pipe(esformatter())
      .pipe(gulp.dest('src'))
  })
}
