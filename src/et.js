'use strict';

// var Parser = require('./parser')
var Compiler = require('./compiler');
var formatter = require('./formatter');

class ET {
  constructor (options) {
    this.options = options;
    // TODO: wait et-parser
    // this.parser = new Parser(options);
    this.compiler = new Compiler(options);
  }
  compile (str) {
    var dom = {} ;
    return this.compileDom(dom);
  }
  compileDom (dom) {
    var result = this.compiler.compile(dom);
    return formatter.format(result);
  }
}

module.exports = ET;
