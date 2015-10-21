'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createLine = _dep.tp_createLine
var _tp_getConditionTemplate = _dep.tp_getConditionTemplate
var _tp_after = _dep.tp_after
var _tp_remove = _dep.tp_remove
var _tp_setRoot = _dep.tp_setRoot
var _tp_createText = _dep.tp_createText
var _tp_text = _dep.tp_text

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createLine(_this, null, 1)
  },
  update: function(it) {
    var _this = this
    var _last = this.last

    var _lastLength = _last[0] || 0
    var _list = it.list || []
    var _index = 0
    var _len = _last[0] = _list.length
    for (; _index < _len; _index++) {
      var index = _index
      var item = _list[_index]
      var _itemId = '2_' + _index
      var _template = _tp_getConditionTemplate(_this, _itemId, Template_2, this.options)
      if (_index >= _lastLength) {
        var _prevId = _index ? ('2_' + (_index - 1)) : 1
        _tp_after(_this, _prevId, _itemId)
      }
      _template.update(it, item, index)
    }
    for (; _index < _lastLength; _index++) {
      _tp_remove(_this, '2_' + _index)
    }
    _tp_setRoot(this, 2, _len)
  }
})
var Template_2 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createText(_this, null, 4, '')
  },
  update: function(it, item, index) {
    var _this = this
    var _last = this.last

    var _tmp = 'it is for loop ' + (index)
    if (_last[0] !== _tmp) {
      _last[0] = _tmp
      _tp_text(_this, 4, _tmp)
    }
  }
})
module.exports = exports['default'] = Template_0
