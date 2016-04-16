'use strict'

var _dep = require('et-dependency');
var _dep_template = _dep.template;
var _dep_element = _dep.element;
var _dep_html = _dep.html;

var Template_0 = _dep_template(function (_template) {
  _dep_element(_template, 0, 1, 'DIV');

}, function (it, _args) {
  var _patches = [];
  _patches[0] = it.html;
  return _patches;

}, function (_template, it, _args, _patches, _cache) {
  var _tmp = _patches[0];
  if (_cache(0, _tmp)) {
    _dep_html(_template, 1, '<div></div>aaa' + _tmp + 'bbb');
  }
});

module.exports = Template_0;
