'use strict';

var p      = require('gulp-load-plugins')();

exports.register = function(gulp){
  gulp.task('watch', function() {
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

};
