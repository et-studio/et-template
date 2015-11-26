'use strict'

var _dep = require('et-dependency')
var Template_6 = require('./memberView')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_createLine = _dep.tp_createLine
var _tp_getConditionTemplate = _dep.tp_getConditionTemplate
var _tp_after = _dep.tp_after
var _tp_remove = _dep.tp_remove

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    var it = _this.context

    _tp_createElement(_this, null, 2, 'UL')
    _tp_createLine(_this, 2, 3)
  },
  update: function() {
    var _this = this
    var _last = _this.last
    var it = _this.context
    var _lastLength = _last[0] || 0
    var _list = it.members || []
    var _index = 0
    var _len = _last[0] = _list.length
    for (; _index < _len; _index++) {
      var index = _index
      var item = _list[_index]
      var _itemId = '4_' + _index
      var _template = _tp_getConditionTemplate(_this, _itemId, Template_6, it.membersContext[index])
      if (_index >= _lastLength) {
        var _prevId = _index ? ('4_' + (_index - 1)) : 3
        _tp_after(_this, _prevId, _itemId)
      }
      _template.update()
    }
    for (; _index < _lastLength; _index++) {
      _tp_remove(_this, '4_' + _index)
    }
  }
})
module.exports = exports['default'] = Template_0
