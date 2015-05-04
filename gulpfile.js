'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');

var tasks = requireDir('gulp/tasks');
for(var key in tasks){
  var item = tasks[key];
  item.register(gulp);
}
