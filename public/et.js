'use strict';

var Dom = require('./dom');
var compiler = require('./compiler');

module.exports = function(str, options) {
  var dom = new Dom(str, options);
  return compiler.compile(dom, options);
};