'use strict';

var esformatter = require('gulp-esformatter');
var worker = require('../middleware/gulp-worker');

exports.register = function(gulp){
  gulp.task('worker', function() {
    return gulp.src('src/templates/*.js')
    .pipe(worker())
    .pipe(esformatter())
    .pipe(gulp.dest('src'));
  });
};
