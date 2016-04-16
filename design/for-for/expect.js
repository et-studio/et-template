'use strict'

var _dep = require('et-dependency');
var _dep_template = _dep.template;
var _dep_efor = _dep.efor;
var _dep_text = _dep.text;
var _dep_updateText = _dep.updateText;

var Template_0 = _dep_template(function(_template) {
  _dep_efor(_template, 0, 1, Template_1, function(it, _args) {
    return it.matrix;
  });
});
var Template_1 = _dep_template(function(_template) {
  _dep_efor(_template, 1, 2, Template_2, function(it, _args) {
    var list = _args[0];
    var index1 = _args[1];
    return list;
  });
});
var Template_2 = _dep_template(function(_template) {
  _dep_text(_template, 2, 3);
}, function (it, _args) {
  var list = _args[0];
  var index1 = _args[1];
  var item = _args[2];
  var index2 = _args[3];

  var _patches = [];
  _patches[0] = [index2, item];
  return _patches;

}, function (_template, it, _args, _patches, _cache) {
  var list = _args[0];
  var index1 = _args[1];
  var item = _args[2];
  var index2 = _args[3];

  var _tmp = _patches[0];
  if (_cache(0, _tmp)) {
    var _value0 = _tmp[0];
    var _value1 = _tmp[1];
    _dep_updateText(_template, 3, 'It is for loop ' + _value0 + ':' + _value1 + '.');
  }
});
module.exports = Template_0;