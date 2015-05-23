'use strict';

var p    = require('gulp-load-plugins')();
var del  = require('del');
var wrap = require('../middleware/gulp-require');

var destDir = 'test/src';
var srcDir = 'src';

exports.register = function(gulp){
  gulp.task('dev-clean', function() {
    del([destDir]);
  });

  gulp.task('dev-js', function() {
    return gulp.src([
      srcDir + '/**/*.js',
      '!' + srcDir + '/templates/*.js'
    ])
    .pipe(p.jshint())
    .pipe(p.jshint.reporter('jshint-stylish'))
    .pipe(wrap())
    .pipe(p.babel())
    .pipe(p.esformatter())
    .pipe(gulp.dest(destDir));
  });

  gulp.task('dev-json', function() {
    return gulp.src(srcDir + '/**/*.json')
    .pipe(wrap())
    .pipe(p.babel())
    .pipe(p.esformatter())
    .pipe(gulp.dest(destDir))
    .pipe(p.livereload());
  });

  gulp.task('dev', p.sequence('dev-clean', 'dev-js', 'dev-json'));
  gulp.task('default', ['dev']);
};
