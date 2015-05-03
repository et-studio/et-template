'use strict';

var gulp = require('gulp');

var develop = require('./gulp/tasks/develop');
develop.register(gulp);

var build = require('./gulp/tasks/build');
build.register(gulp);

var watch = require('./gulp/tasks/watch');
watch.register(gulp);


