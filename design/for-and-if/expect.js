'use strict'

var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_element = _dep.element;
var _dep_efor = _dep.efor;
var _dep_eif = _dep.eif;
var _dep_text = _dep.text;
var _dep_updateText = _dep.updateText;

var Template_0 = _dep_template(function (_template) {
  _dep_element(_template, 0, 1, 'UL', [
    ['class', 'list']
  ]);
  _dep_efor(_template, 1, 2, Template_2, function (it, _args) {
    return it.list;
  });
});

var Template_2 = _dep_template(function (_template) {
  _dep_element(_template, 2, 3, 'LI', [
    ['class', 'item']
  ]);
  _dep_eif(_template, 3, 4, function (it, _args) {
    var item = _args[0];
    var index = _args[1];
    if (index === 0) return [0, Template_4];
  });
  _dep_text(_template, 3, 6);
}, function (it, _args) {
  var item = _args[0];
  var index = _args[1];

  var _patches = [];
  _patches[0] = item;
  return _patches;

}, function (_template, it, _args, _patches, _cache) {
  var item = _args[0];
  var index = _args[1];

  var _tmp = _patches[0];
  if (_cache(0, _tmp)) {
    _dep_updateText(_template, 6, _tmp);
  }
});

var Template_4 = _dep_template(function (_template) {
  _dep_text(_template, 4, 5, 'It is 0.');
});

module.exports = Template_0;
