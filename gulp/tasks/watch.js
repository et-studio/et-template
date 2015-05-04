'use strcit';

var $    = require('gulp-load-plugins')();
var path = require('path');
var js   = require('../middleware/gulp-require');

var rootDir = path.resolve(__dirname, '../..');

exports.register = function(gulp){

  var srcDir = 'src';
  var destDir = 'test/src';

  gulp.task('watch-js', function() {
    return gulp.src(srcDir + '/**/*.js')
    .pipe($.watch(srcDir + '/**/*.js', function(file){
      prefix = new Date().toTimeString().substr(0, 8);
      console.log(`[${prefix}] ${path.relative(rootDir, file.path)}`);
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(js())
    .pipe($.babel())
    .pipe($.esformatter())
    .pipe(gulp.dest(destDir));
  });

  gulp.task('watch', ['watch-js']);
}

