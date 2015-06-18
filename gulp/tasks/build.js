'use strict';

var sequence = require('gulp-sequence');
var babel = require('gulp-babel');
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
    .pipe(babel())
    .pipe(gulp.dest(destDir));
  });

  gulp.task('build-json', function() {
    return gulp.src([srcDir + '/**/*.json'])
    .pipe(gulp.dest(destDir));
  });

  gulp.task('build', sequence('build-clean', 'build-js', 'build-json'));
};
