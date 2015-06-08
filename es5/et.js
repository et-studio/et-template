'use strict';

// var Parser = require('./parser')
var Compiler = require('./compiler');
var Formatter = require('./formatter');

module.exports = function (str) {
  var options = arguments[1] === undefined ? {} : arguments[1];

  // TODO: wait et-parser
  //var parser = new Parser(options.parser);
  //var compiler = new Compiler(options.compiler);
  //var formatter = new Formatter(options.formatter);

  //var dom = parser.parse(str);
  //var result = compiler.compile(dom);
  //return formatter.format(result);
  return str;
};