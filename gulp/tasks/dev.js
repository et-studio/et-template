'use strict'

module.exports = function (gulp) {
  gulp.task('dev', ['table', 'worker'])
  gulp.task('default', ['dev', 'build', 'format'])
}
