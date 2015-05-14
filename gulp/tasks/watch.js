'use strcit';

var $    = require('gulp-load-plugins')();
var path = require('path');
var js   = require('../middleware/gulp-require');
var json = require('../middleware/gulp-require-json')

var rootDir = path.resolve(__dirname, '../..');

exports.register = function(gulp){

  var srcDir = 'src';
  var destDir = 'test/src';

  gulp.task('watch-js', function() {
    $.livereload.listen(); // 需要使用浏览器的livereload插件并且开启时才能生效
    return gulp.src(srcDir + '/**/*.js')
    .pipe($.watch(srcDir + '/**/*.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(js())
    .pipe($.babel())
    // .pipe($.esformatter())
    .pipe(gulp.dest(destDir))
    .pipe($.livereload());
  });

  gulp.task('watch-json', function() {
    return gulp.src(srcDir + '/**/*.json')
    .pipe($.watch(srcDir + '/**/*.json'))
    .pipe(json())
    .pipe($.babel())
    .pipe($.esformatter())
    .pipe(gulp.dest(destDir))
    .pipe($.livereload());
  });

  gulp.task('watch-test', function() {
    var watchList = [
      'test/spec/**/*.js',
      'test/spec/**/*.html',
      'test/main.js',
      'test/index.html',
      '']
    return gulp.src(watchList)
    .pipe($.watch(watchList))
    .pipe($.livereload());
  });

  gulp.task('watch', ['watch-js', 'watch-json','watch-test']);
}

