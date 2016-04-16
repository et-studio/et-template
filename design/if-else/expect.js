'use strict'

var _dep = require('et-dependency');
var _dep_template = _dep.template;
var _dep_element = _dep.element;
var _dep_eif = _dep.eif;
var _dep_text = _dep.text;

var Template_0 = _dep_template(function (_template) {
  _dep_element(_template, 0, 1, 'DIV');
  _dep_eif(_template, 1, 2, function (it, _args) {
    if (it.isTrue) return [0, Template_2];
    else if (it.elseTrue) return [1, Template_4];
    else return [2, Template_6];
  });
});

var Template_2 = _dep_template(function (_template) {
  _dep_text(_template, 2, 3, 'It is true.');
});

var Template_4 = _dep_template(function (_template) {
  _dep_text(_template, 4, 5, 'It is elseTrue.');
});

var Template_6 = _dep_template(function (_template) {
  _dep_text(_template, 6, 7, 'It is else.');
});

module.exports = Template_0;
