'use strict';

var p   = require('gulp-load-plugins')();
var worker = require('../middleware/gulp-worker');

exports.register = function(gulp){
  gulp.task('worker', function() {
    return gulp.src('src/templates/*.js')
    .pipe(worker())
    .pipe(p.esformatter())
    .pipe(gulp.dest('src'));
  });
};
