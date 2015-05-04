'use strict';

var Dom = require('./dom');

module.exports = function(str, options) {
  var dom = new Dom(str, options);
  var list = [];
  list.push('var ETBASE = require("ETBASE");');
  list.push('module.exports = ' + dom.getTemplateName() + ';');
  list = list.concat(dom.compile());
  return list.join('\n');
};