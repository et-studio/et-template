'use strict';

var p   = require('gulp-load-plugins')();
var del = require('del');

var destDir = 'es5';
var srcDir = 'src';

exports.register = function(gulp){
  gulp.task('build-clean', function() {
    del([destDir]);
  });

  gulp.task('build-js', function() {
    return gulp.src([
      srcDir + '/**/*.js',
      '!' + srcDir + '/templates/*.js'
    ])
    .pipe(p.jshint())
    .pipe(p.jshint.reporter('jshint-stylish'))
    .pipe(p.babel())
    .pipe(gulp.dest(destDir));
  });

  gulp.task('build-json', function() {
    return gulp.src([srcDir + '/**/*.json'])
    .pipe(gulp.dest(destDir));
  });

  gulp.task('build', p.sequence('build-clean', 'build-js', 'build-json'));
};
