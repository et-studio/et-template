'use strict';

var p      = require('gulp-load-plugins')();

exports.register = function(gulp){
  gulp.task('watch-js', function() {
    p.livereload.listen(); // 需要使用浏览器的livereload插件并且开启时才能生效
    return gulp.src([
      'src/**/*.js',
      'test/**/*.js'
    ]).
    pipe(p.watch([
      'src/**/*.js',
      'test/**/*.js'
    ]))
    .pipe(p.jshint())
    .pipe(p.jshint.reporter('jshint-stylish'));
  });

  gulp.task('watch-lr', function() {
    p.livereload.listen(); // 需要使用浏览器的livereload插件并且开启时才能生效
    return p.watch([
      'src/**/*.js',
      'src/**/*.json',
      'test/**/*.js',
      'test/**/*.html',
      'test/**/*.css'
    ])
    .pipe(p.livereload());
  });
  gulp.task('watch', ['watch-js', 'watch-lr']);
};
