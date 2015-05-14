'use strcit';

var $   = require('gulp-load-plugins')();
var del = require('del')

var destDir = 'public';
var srcDir = 'src';

exports.register = function(gulp){
  gulp.task('build-clean', function() {
    del([destDir]);
  });

  gulp.task('build-js', function() {
    return gulp.src([srcDir + '/**/*.js'])
    .pipe($.babel())
    .pipe($.esformatter())
    .pipe(gulp.dest(destDir));
  });

  gulp.task('build-json', function() {
    return gulp.src([srcDir + '/**/*.json'])
    .pipe(gulp.dest(destDir));
  });

  gulp.task('build', $.sequence('build-clean', 'build-js', 'build-json'));
}
