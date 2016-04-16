'use strict'

var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_efor = _dep.efor;
var _dep_text = _dep.text;
var _dep_updateText = _dep.updateText;

var Template_0 = _dep_template(function (_template) {
  _dep_efor(_template, 0, 1, Template_1, function (it, _args) {
    return it.matrix[it.members[1]];
  }, function (it, _args) {
    var item = _args[0];
    var index = _args[1];
    return item.id;
  });
});

var Template_1 = _dep_template(function (_template) {
  _dep_text(_template, 1, 2);

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
    _tmp = it.format(_tmp);
    _dep_updateText(_template, 2, 'it is for loop ' + _tmp);
  }
});

module.exports = Template_0;
