'use strict'

exports.register = function (gulp) {
  gulp.task('dev', ['table', 'worker'])
  gulp.task('default', ['dev', 'build', 'format'])
}
