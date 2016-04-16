'use strict'

var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_element = _dep.element;
var _dep_eif = _dep.eif;
var _dep_text = _dep.text;
var _dep_efor = _dep.efor;
var _dep_updateText = _dep.updateText;

var Template_0 = _dep_template(function (_template) {
  _dep_element(_template, 0, 1, 'DIV', [
    ['id', 'content']
  ]);
  _dep_eif(_template, 1, 2, function (it, _args) {
    if (it.isTrue) return [0, Template_2];
    else return [1, Template_4];
  });
  _dep_element(_template, 1, 6, 'P');
  _dep_text(_template, 6, 7, 'It is P label.');

  _dep_efor(_template, 1, 8, Template_8, function (it, _args) {
    return it.matrix[it.members[1]];
  });
});

var Template_2 = _dep_template(function (_template) {
  _dep_text(_template, 2, 3, 'It is true.');
});

var Template_4 = _dep_template(function (_template) {
  _dep_text(_template, 4, 5, 'It is else.');
});

var Template_8 = _dep_template(function (_template) {
  _dep_text(_template, 8, 9);
}, function (it, _args) {
  var item = _args[0];
  var index = _args[1];

  var _patches = [];
  _patches[0] = index;
  return _patches;
}, function (_template, it, _args, _patches, _cache) {
  var item = _args[0];
  var index = _args[1];

  var _tmp = _patches[0];
  if (_cache(0, _tmp)) {
    _dep_updateText(_template, 9, 'it is for loop ' + _tmp);
  }
});

module.exports = Template_0;
