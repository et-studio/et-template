'use strict';

var fs = require('fs');
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util')

function handleString(method, string) {
  var list = string.split('\n');
  var re = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    if (item.indexOf('// {{') >= 0) {
      re.push('re = re + `');
    } else if (item.indexOf('// }}') >= 0) {
      re.push('`;');
    } else {
      re.push(item);
    }
  }
  return `
    ${method}(it) {
      var re = '';
      ${re.join('\n')}
      return re;
    }
  `;
}

module.exports = function() {
  var methods = [];
  var outputStream = through.obj(function(file, enc, next) {
    if (!file.isBuffer()) {
      return next();
    }
    var contents = file.contents.toString();
    var basename = path.basename(file.path);
    var method = basename.split('.')[0];

    methods.push(handleString(method, contents));
    next();
  }, function(next) {
    var data = `
      'use strict';
      class Worker {
        constructor(options) {
          this.options = options;
        }
        ${methods.join('\n')}
      }
      module.exports = Worker;
    `;
    outputStream.push(new gutil.File({
      path: 'worker.js',
      contents: new Buffer(data)
    }));
    next();
  });
  return outputStream;
};
