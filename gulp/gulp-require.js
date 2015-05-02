'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var esformatter = require('esformatter');

// consts
var PLUGIN_NAME = 'gulp-require';
var REG = /^define|^\/\/\signore/;

// exporting the plugin main function
module.exports = Compile;

// plugin level function (dealing with files)
function Compile(options) {
  // creating a stream through which each file will pass
  return through.obj(function(file, enc, next) {
    if (!file.isBuffer()) return next();
    var contents = file.contents.toString();
    try {
      if(!REG.test(contents)){
        contents = '"use strict";\ndefine(function(require, exports, module){\n' + contents + '\n});';
      }
      // contents = esformatter.format(contents, options);
    } catch (e) {
      return next(new PluginError(PLUGIN_NAME, 'Require compile Error: Source file "' + file.path + '"'));
    }
    file.contents = new Buffer(contents);
    // make sure the file goes through the next gulp plugin
    this.push(file);
    // tell the stream engine that we are done with this file
    next();
  });
}
