'use strict';

var through = require('through2');

var handlers = {
  'js': function(file) {
    var str = file.contents.toString();
    var list = [];
    list.push('\'use strict\';');
    list.push('define(function(require, exports, module){');
    list.push(str);
    list.push('});');

    file.contents = new Buffer(list.join('\n'));
    return file;
  },
  'json': function(file) {
    var str = file.contents.toString();
    var list = [];
    list.push('\'use strict\';');
    list.push('define(function(require, exports, module){');
    list.push('module.exports = ' + str);
    list.push('});');

    file.path = file.path + '.js';
    file.contents = new Buffer(list.join('\n'));
    return file;
  }
};

function Compile() {
  var outputStream =  through.obj(function(file, enc, next) {
    if (!file.isBuffer()) {
      return next();
    }

    var matches, extname, handler;

    matches = file.path.match(/\.([\w_-]*?)$/i);
    extname = matches[1];
    if (extname) {
      extname = extname.toString().toLowerCase();
      handler = handlers[extname];
    }

    if (handler) {
      file = handler(file);
    }

    this.push(file);
    next();
  });

  return outputStream;
}

module.exports = Compile;
