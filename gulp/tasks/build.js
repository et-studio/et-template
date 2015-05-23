'use strict';

var p   = require('gulp-load-plugins')();
var del = require('del');

var destDir = 'public';
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
    .pipe(p.babel())
    .pipe(p.esformatter())
    .pipe(gulp.dest(destDir));
  });

  gulp.task('build-json', function() {
    return gulp.src([srcDir + '/**/*.json'])
    .pipe(p.esformatter())
    .pipe(gulp.dest(destDir));
  });

  gulp.task('build', p.sequence('build-clean', 'build-js', 'build-json'));
};
