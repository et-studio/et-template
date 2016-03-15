'use strict'

var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_text = _dep.text;
var _dep_eif = _dep.eif;

var Template_0 = _dep_template(function (_template) {
  _dep_text(_template, 0, 1, 'It is before.');
  _dep_eif(_template, 0, 2, function (it, _args) {
    if (it.isNumber && it.isEven) return [0, Template_2];
  });
});

var Template_2 = _dep_template(function (_template) {
  _dep_text(_template, 2, 3, 'It is number and is even');
});

module.exports = Template_0;
