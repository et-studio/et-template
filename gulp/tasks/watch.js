'use strcit';

var $    = require('gulp-load-plugins')();
var path = require('path');
var js   = require('../middleware/gulp-require');

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
    .pipe($.esformatter())
    .pipe(gulp.dest(destDir))
    .pipe($.livereload());
  });

  gulp.task('watch-test', function() {
    return gulp.src('test/spec/**/*.js')
    .pipe($.watch('test/spec/**/*.js'))
    .pipe($.livereload());
  });

  gulp.task('watch', ['watch-js', 'watch-test']);
}

