'use strict'

var _dep = require('et-dependency');
var _dep_template = _dep.template;
var _dep_element = _dep.element;
var _dep_updateAttr = _dep.updateAttr;

var Template_0 = _dep_template(function (_template) {
  _dep_element(_template, 0, 1, 'DIV');
  _dep_element(_template, 1, 2, 'INPUT', 0, [
    ['change input', function ($event, it, _args) {
      it.name = this.value;
    }]
  ]);
}, function (it, _args) {
  var _patches = [];
  _patches[0] = it.name;
  return _patches;

}, function (_template, it, _args, _patches, _cache) {
  var _tmp = _patches[0];
  if (_cache(0, _tmp)) {
    _dep_updateAttr(_template, 2, 'value', _tmp);
  }
});

module.exports = Template_0;
