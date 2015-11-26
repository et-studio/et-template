'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_createLine = _dep.tp_createLine
var _tp_getConditionTemplate = _dep.tp_getConditionTemplate
var _tp_after = _dep.tp_after
var _tp_remove = _dep.tp_remove
var _tp_createText = _dep.tp_createText
var _tp_getTemplate = _dep.tp_getTemplate
var _tp_text = _dep.tp_text

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    var it = _this.context

    _tp_createElement(_this, null, 2, 'UL', {
      "class": "list"
    })
    _tp_createLine(_this, 2, 3)
  },
  update: function() {
    var _this = this
    var _last = _this.last
    var it = _this.context

    var _lastLength = _last[0] || 0
    var _list = it.list || []
    var _index = 0
    var _len = _last[0] = _list.length
    for (; _index < _len; _index++) {
      var index = _index
      var item = _list[_index]
      var _itemId = '4_' + _index
      var _template = _tp_getConditionTemplate(_this, _itemId, Template_4)
      if (_index >= _lastLength) {
        var _prevId = _index ? ('4_' + (_index - 1)) : 3
        _tp_after(_this, _prevId, _itemId)
      }
      _template.update(item, index)
    }
    for (; _index < _lastLength; _index++) {
      _tp_remove(_this, '4_' + _index)
    }
  }
})
var Template_4 = _dep_createTemplate({
  create: function() {
    var _this = this
    var it = _this.context

    _tp_createElement(_this, null, 6, 'LI', {
      "class": "item"
    })
    _tp_createLine(_this, 6, 7)
    _tp_createText(_this, 6, 12, '')
  },
  update: function(item, index) {
    var _this = this
    var _last = _this.last
    var it = _this.context

    var _index
    var _templateId = _last[1]
    var _template = _tp_getTemplate(_this, _templateId)
    if (index === 0) {
      _index = 0
    } else {
      _index = 1
    }
    if (_last[0] !== _index) {
      _last[0] = _index
      if (_template) {
        _template.remove()
      }
      var _currentTemplateId
      var _TemplateConstructor
      if (index === 0) {
        _currentTemplateId = 8
        _TemplateConstructor = Template_8
      } else {
        _currentTemplateId = null
        _TemplateConstructor = null
      }
      if (_TemplateConstructor) {
        _last[1] = _currentTemplateId
        _template = _tp_getConditionTemplate(_this, _currentTemplateId, _TemplateConstructor)
        _tp_after(_this, 7, _currentTemplateId)
      } else {
        _last[1] = null
        _template = null
      }
    }
    if (_template) _template.update(item, index)
    var _tmp = (item)
    if (_last[2] !== _tmp) {
      _last[2] = _tmp
      _tp_text(_this, 12, _tmp)
    }
  }
})
var Template_8 = _dep_createTemplate({
  create: function() {
    var _this = this
    var it = _this.context

    _tp_createText(_this, null, 10, 'It is 0.')
  }
})
module.exports = exports['default'] = Template_0
