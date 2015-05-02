'use strict';

var path = require('path');
var gulp = require('gulp');;
var del = require('del');
var sequence   = require('gulp-sequence');
var js = require('./gulp/gulp-require')
var et = require('./gulp/gulp-et');
var es5 = require('./gulp/gulp-es5')

gulp.task('clean', function() {
  del(['public/src/**', 'es5/**']);
});

gulp.task('js', function() {
  return gulp.src([
    'src/**/*.js'
  ])
  .pipe(js().on('error', console.log))
  .pipe(es5().on('error', console.log))
  .pipe(gulp.dest('public/src'));
});

gulp.task('html', function() {
  return gulp.src([
    'src/**/*.html'
  ])
  .pipe(et().on('error', console.log))
  .pipe(js().on('error', console.log))
  .pipe(gulp.dest('public/src'));
});

gulp.task('watch-js', function(){
  gulp.watch('src/**/*.js', function(file){
    var saveDir = path.dirname('public/src/' + path.relative(__dirname + '/src', file.path));
    return gulp.src(file.path)
    .pipe(js().on('error', console.log))
    .pipe(es5().on('error', console.log))
    .pipe(gulp.dest(saveDir))
    .on('end', function(){
      console.log('Coffee compiled:' + file.path);
    });
  })
});

gulp.task('watch-html', function(){
  gulp.watch('src/**/*.html', function(file){
    var saveDir = path.dirname('public/src/' + path.relative(__dirname + '/src', file.path));
    return gulp.src(file.path)
    .pipe(et().on('error', console.log))
    .pipe(js().on('error', console.log))
    .pipe(gulp.dest(saveDir))
    .on('end', function(){
      console.log('Coffee compiled:' + file.path);
    });
  })
});

gulp.task('watch-es5', function(){
  gulp.watch('src/**/*.*', function(file){
    var saveDir = path.dirname('es5/' + path.relative(__dirname + '/src', file.path));
    return gulp.src(file.path)
    .pipe(es5().on('error', console.log))
    .pipe(gulp.dest(saveDir))
    .on('end', function(){
      console.log('Coffee compiled:' + file.path);
    });
  })
});

gulp.task('es5', function(){
  return gulp.src([
    'src/**/*.js'
  ])
  .pipe(es5().on('error', console.log))
  .pipe(gulp.dest('es5'));
});

gulp.task('watch', sequence(['watch-js', 'watch-html', 'watch-es5']));
// gulp.task('default', sequence('clean', 'js', 'html', 'es5'));
gulp.task('default', sequence('clean', 'js', 'es5'));



