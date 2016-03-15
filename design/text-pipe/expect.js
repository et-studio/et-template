'use strict'

var util = require('./util');
var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_element = _dep.element;
var _dep_text = _dep.text;
var _dep_updateText = _dep.updateText;

var Template_0 = _dep_template(function (_template) {
  _dep_element(_template, 0, 2, 'A');
  _dep_text(_template, 2, 3);
}, function (it, _args) {
  var _patches = [];
  _patches[0] = it.isMe ? 'ME' : 'YOU | HE';
  return _patches;

}, function (_template, it, _args, _patches, _cache) {
  var _tmp = _patches[0];
  if (_cache(0, _tmp)) {
    _tmp = util.format(_tmp);
    _tmp = util.trim(_tmp, ' | ', ' , ');
    _dep_updateText(_template, 3, _tmp);
  }
});

module.exports = Template_0;
