'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var ET = require('../src/et');
var et = new ET();
var esformatter = require('esformatter');

// consts
var PLUGIN_NAME = 'gulp-et';
var REG = /^define|^\/\/\signore/;

// exporting the plugin main function
module.exports = compile;

// plugin level function (dealing with files)
function compile(options) {
  if(!options) options = {};
  var extname = options.extname || /.html$/;
  // creating a stream through which each file will pass
  return through.obj(function(file, enc, next) {
    if (!file.isBuffer()) return next();
    var contents = file.contents.toString();
    try {
      contents = et.compile(contents, options);
      if(!REG.test(contents)){
        contents = 'define(function(require, exports, module){\n' + contents + '\n});';
      }
      contents = esformatter.format(contents, options);
    } catch (e) {
      console.log(e.toString());
      return next(new PluginError(PLUGIN_NAME, 'ET compile Error: Source file "' + file.path + '"'));
    }
    file.contents = new Buffer(contents);
    file.path = file.path.replace(extname, '.js');
    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    next();
  });
}
