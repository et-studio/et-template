'use strict';

var fs = require('fs');
var path = require('path');
var through = require('through2');

var TEMPLATES_NAME = ['cmd', 'delare', 'extend', 'global', 'umd', 'amd', 'common', 'create', 'update'];

// function transformES6String(str) {
//   str = '\'' + str + '\'';
//   str = str.replace(/\$\{([\s\S]*?)\}/g, function(match, grep){
//     return '\' + ' + grep + ' + \'';
//   });
//   return str;
// }

function getConfig() {
  var re, i, name, contents;

  re = {};
  for ( i = 0; i < TEMPLATES_NAME.length; i++) {
    name = TEMPLATES_NAME[i];
    contents = fs.readFileSync(path.resolve(__dirname, '../../src/templates/' + name + '.js'), {encoding: 'utf-8'});
    //contents = transformES6String(contents);
    //contents = contents.toString().replace(/[\r\n]/g, '');
    //contents.toString().replace(/[\r\n]/g, '');
    re[name] = contents;
  }
  return re;
}

function replace(str) {
  var config, name, i, reg;

  config = getConfig();
  for ( i = 0; i < TEMPLATES_NAME.length; i++) {
    name = TEMPLATES_NAME[i];
    reg = new RegExp('\\/\\/ @start: ' + name + '[\\s\\S]*?\\@end: ' + name, 'g');
    str = str.replace(reg, '// @start: ' + name + '\nreturn \`\n' + config[name] + '    \`;\n    // @end: ' + name);
  }
  return str;
}

module.exports = function() {
  var outputStream = through.obj(function(file, enc, next) {
    if (!file.isBuffer()) {
      return next();
    }

    var contents = file.contents.toString();
    contents = replace(contents);
    file.contents = new Buffer(contents);

    this.push(file);
    next();
  });

  return outputStream;
};
