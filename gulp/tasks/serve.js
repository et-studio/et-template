'use strict';

var browserSync = require('browser-sync');
exports.register = function(gulp){
  gulp.task('serve', function () {
    browserSync({
      notify: false,
      port: 9002,
      server: {
        baseDir: ['test', 'node_modules'],
        routes: {}
      }
    });
  });
};
