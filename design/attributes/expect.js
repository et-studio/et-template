'use strict'

var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_element = _dep.element;

var Template_0 = _dep_template(function (_template) {
  _dep_element(_template, 0, 1, 'DIV', [
    ['id', 'test'],
    ['data-title', 'Sorry, you can\'t do it.']
  ]);
  _dep_element(_template, 0, 2, 'BR');
});

module.exports = Template_0;
