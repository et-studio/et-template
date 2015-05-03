'use strcit';

var $           = require('gulp-load-plugins')();
var path        = require('path');
var del         = require('del');
var js          = require('../middleware/gulp-require');

var destDir = 'test/src';
var srcDir = 'src';

exports.register = function(gulp){
  gulp.task('dev-clean', function() {
    del([destDir]);
  });

  gulp.task('dev-js', function() {
    return gulp.src([srcDir + '/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(js())
    .pipe($.babel())
    .pipe($.esformatter())
    .pipe(gulp.dest(destDir));
  });

  gulp.task('dev', $.sequence(['dev-clean', 'dev-js']));
  gulp.task('default', ['dev']);
}
