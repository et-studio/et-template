'use strict'

var _dep = require('et-dependency');

var _dep_template = _dep.template;
var _dep_element = _dep.element;
var _dep_concatMatrix = _dep.concatMatrix;
var _dep_concatMatrixOthers = _dep.concatMatrixOthers;
var _dep_setAttributesCondition = _dep.setAttributesCondition;
var _dep_updateAttr = _dep.updateAttr;

var Template_0 = _dep_template(function(_template) {
  _dep_element(_template, 0, 1, 'DIV', [
    ['disabled', ''],
    ['class', 'class-true']
  ]);
}, function (it, _args) {
  var _patches = [];

  var _conditions = [];
  if (it.isTrue) _conditions[0] = 0;
  _patches[0] = _conditions;

  _patches[1] = [it.id, it.getSrc()];
  _patches[2] = (function(){return it.a + it.b})();

  return _patches;
}, function (_template, it, _args, _patches, _cache) {
  var _tmp = _patches[0];
  if (_cache(0, _tmp)) {
    var _includes = [];
    var _excludes = [];

    var _matrix0 = [['class']];
    _dep_concatMatrix(_includes, _matrix0, _tmp[0]);
    _dep_concatMatrixOthers(_excludes, _matrix0, _tmp[0]);

    _dep_setAttributesCondition(_template, 1, _includes, _excludes);
  }

  var _tmp = _patches[1];
  if (_cache(1, _tmp)) {
    var _value0 = _tmp[0];
    _value0 = util.format(_value0);
    var _value1 = _tmp[1];
    _dep_updateAttr(_template, 1, 'id', 'aaa' + _value0 + 'bbb' + _value1);
  }

  var _tmp = _patches[2];
  if (_cache(2, _tmp)) {
    _dep_updateAttr(_template, 1, 'data-type', _tmp);
  }
});

module.exports = Template_0;
