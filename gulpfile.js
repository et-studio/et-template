'use strict';

var gulp = require('gulp');

var dev = require('./gulp/tasks/develop');
dev.register(gulp);

var build = require('./gulp/tasks/build');
build.register(gulp);

var watch = require('./gulp/tasks/watch');
watch.register(gulp);

var test = require('./gulp/tasks/test');
test.register(gulp);