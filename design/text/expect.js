'use strict'

var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_element = _dep.element;
var _dep_text = _dep.text;
var _dep_updateText = _dep.updateText;

var Template_0 = _dep_template(function (_template) {
  _dep_element(_template, 0, 1, 'DIV');
  _dep_text(_template, 1, 2);
  _dep_element(_template, 0, 3, 'P');
  _dep_text(_template, 3, 4, 'Sorry, you can\'t do it.\n\n\n  bbbbbbbbb');
  _dep_element(_template, 0, 5, 'P');
  _dep_text(_template, 5, 6);

}, function (it, _args) {
  var _patches = [];
  _patches[0] = it.src;
  _patches[1] = it.unreadCount > 99 ? '99+' : it.unreadCount;
  return _patches;

}, function (_template, it, _args, _patches, _cache) {
  var _tmp = _patches[0];
  if (_cache(0, _tmp)) {
    _dep_updateText(_template, 2, 'aaaa[' + _tmp + ']');
  }

  var _tmp = _patches[1];
  if (_cache(1, _tmp)) {
    _dep_updateText(_template, 6, _tmp);
  }
});

module.exports = Template_0;
