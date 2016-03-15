'use strict'

var _dep = require('et-dependency');
var _dep_template = _dep.template;
var _dep_element = _dep.element;

var Template_0 = _dep_template(function (_template) {
  _dep_element(_template, 0, 1, 'DIV');
  _dep_element(_template, 1, 2, 'INPUT', [
    ['type', 'file']
  ], [
    ['change input', function ($event, it, _args) {
      it.file = this.file;
      it.value = this.value;
    }]
  ]);
});

module.exports = Template_0;
