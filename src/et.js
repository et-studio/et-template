'use strict';

var Dom = require('./dom');
var Compiler = require('./compiler');

class ET {
  constructor(str, options) {
    var dom = new Dom(str, options);
    var compiler = new Compiler(options);
    return compiler.compile(dom, options);
  }
}

module.exports = ET;
