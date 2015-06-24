'use strict';

var esformatter = require('gulp-esformatter');
var table = require('../middleware/gulp-table');

exports.register = function(gulp){
  gulp.task('dev', ['table', 'worker']);
  gulp.task('default', ['dev', 'build']);
};
