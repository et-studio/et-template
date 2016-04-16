'use strict'

var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_efor = _dep.efor;
var _dep_element = _dep.element;
var _dep_text = _dep.text;
var _dep_updateText = _dep.updateText;

var Template_0 = _dep_template(function (_template) {
  _dep_efor(_template, 0, 1, Template_1, function (it, _args) {
    return it.users;
  }, function (it, _args) {
    var user = _args[0];
    var index = _args[1];
    return user.id;
  });
});

var Template_1 = _dep_template(function (_template) {
  _dep_element(_template, 1, 2, 'H1');
  _dep_text(_template, 2, 3);
  _dep_element(_template, 1, 4, 'P');
  _dep_text(_template, 4, 5);

}, function (it, _args) {
  var user = _args[0];
  var index = _args[1];

  var _patches = [];
  _patches[0] = [user.id, user.name];
  _patches[1] = user.description;
  return _patches;

}, function (_template, it, _args, _patches, _cache) {
  var user = _args[0];
  var index = _args[1];

  var _tmp = _patches[0];
  if (_cache(0, _tmp)) {
    var _value0 = _tmp[0];
    var _value1 = _tmp[1];
    _dep_updateText(_template, 3, _value0 + ': ' + _value1);
  }

  var _tmp = _patches[1];
  if (_cache(1, _tmp)) {
    _dep_updateText(_template, 5, _tmp);
  }
});

module.exports = Template_0;
