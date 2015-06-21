'use strict';

var esformatter = require('gulp-esformatter');
var table = require('../middleware/gulp-table');

exports.register = function(gulp){
  gulp.task('table', function() {
    return gulp.src([
      'src/**/*.js',
      '!src/templates/*.js'
    ])
    .pipe(table())
    .pipe(esformatter())
    .pipe(gulp.dest('src'));
  });
};
