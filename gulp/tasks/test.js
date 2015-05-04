var browserSync = require('browser-sync');
var reload = browserSync.reload;

exports.register = function(gulp){
  gulp.task('test', ['dev'], function () {
    browserSync({
      notify: false,
      port: 9002,
      server: {
        baseDir: ['test', 'src', 'public'],
        routes: {}
      }
    });

    // watch for changes
    gulp.watch([
      'test/*.html',
      'src/**/*.js',
      'test/spec/**/*.js'
    ]).on('change', reload);

    gulp.watch('src/**/*.css', ['dev']);

  });
}