'use strict';

var p      = require('gulp-load-plugins')();
var wrap   = require('../middleware/gulp-require');

exports.register = function(gulp){

  var srcDir = 'src';
  var destDir = 'test/src';

  gulp.task('watch-js', function() {
    p.livereload.listen(); // 需要使用浏览器的livereload插件并且开启时才能生效
    return p.watch([
      srcDir + '/**/*.js',
      '!' + srcDir + '/templates/*.js'
    ])
    .pipe(p.jshint())
    .pipe(p.jshint.reporter('jshint-stylish'))
    .pipe(wrap())
    .pipe(p.babel())
    .pipe(p.esformatter())
    .pipe(gulp.dest(destDir))
    .pipe(p.livereload());
  });

  gulp.task('watch-json', function() {
    return p.watch([
      srcDir + '/**/*.json'
    ])
    .pipe(wrap())
    .pipe(p.babel())
    .pipe(p.esformatter())
    .pipe(gulp.dest(destDir))
    .pipe(p.livereload());
  });

  gulp.task('watch-test-es6', function() {
    return p.watch([
      'test/spec-es6/**/*.js'
    ])
    .pipe(p.babel())
    .pipe(gulp.dest('test/spec'))
    .pipe(p.livereload());
  });

  gulp.task('watch-test', function() {
    var watchList = [
      'test/spec/**/*.js',
      'test/spec/**/*.html',
      'test/main.js',
      'test/index.html'
    ];
    return p.watch(watchList)
    .pipe(p.livereload());
  });

  gulp.task('test-es6', function() {
    return gulp.src([
      'test/spec-es6/**/*.js'
    ])
    .pipe(p.babel())
    .pipe(gulp.dest('test/spec'));
  });

  gulp.task('watch', ['dev', 'test-es6' ,'watch-js', 'watch-json', 'watch-test-es6', 'watch-test']);
};
