'use strict';

var Parser = require('./parser')
var Compiler = require('./compiler');
var formatter = require('./parsers/format');

class ET {
  constructor(options = {}) {
    this.options = options;
    this.parser = new Parser(options.parser);
    this.compiler = new Compiler(options.compiler);
  }
  translate(str) {
    var dom = this.parse(str);
    var result = this.compile(dom);
    return this.format(result);
  }
  parse(str) {
    return this.parser.parse(str);
  }
  compile(dom) {
    return this.compiler.compile(dom);
  }
  format(str) {
    return formatter.parse(str);
  }
}

module.exports = ET;
