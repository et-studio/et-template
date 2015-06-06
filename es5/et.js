'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Dom = require('./dom');
var Compiler = require('./compiler');

var ET = function ET(str, options) {
  _classCallCheck(this, ET);

  var dom = new Dom(str, options);
  var compiler = new Compiler(options);
  return compiler.compile(dom, options);
};

module.exports = ET;