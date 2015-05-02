'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var babel = require('babel');

// consts
var PLUGIN_NAME = 'gulp-es5';

// exporting the plugin main function
module.exports = compile;

// plugin level function (dealing with files)
function compile(options) {
  if(!options) options = {};
  var extname = options.extname || /.js$/;
  // creating a stream through which each file will pass
  return through.obj(function(file, enc, next) {
    if (!file.isBuffer()) return next();
    var contents = file.contents.toString();
    try {
      var result = babel.transform(contents, options);
      contents = result.code;
    } catch (e) {
      console.log(e.toString());
      return next(new PluginError(PLUGIN_NAME, 'babel transform Error: Source file "' + file.path + '"'));
    }
    file.contents = new Buffer(contents);
    file.path = file.path.replace(extname, '.js');
    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    next();
  });
}
