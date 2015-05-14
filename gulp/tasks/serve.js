var browserSync = require('browser-sync');
var reload = browserSync.reload;

exports.register = function(gulp){
  gulp.task('serve', function () {
    browserSync({
      notify: false,
      port: 9002,
      server: {
        baseDir: ['test'],
        routes: {}
      }
    });
  });
}
