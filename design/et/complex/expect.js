'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_createLine = _dep.tp_createLine
var _tp_createText = _dep.tp_createText
var _tp_getTemplate = _dep.tp_getTemplate
var _tp_getConditionTemplate = _dep.tp_getConditionTemplate
var _tp_after = _dep.tp_after
var _tp_remove = _dep.tp_remove
var _tp_text = _dep.tp_text

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this

    _tp_createElement(_this, null, 2, 'DIV', {
      "id": "content"
    })
    _tp_createLine(_this, 2, 3)
    _tp_createElement(_this, 2, 12, 'P')
    _tp_createText(_this, 12, 14, 'It is P label.')
    _tp_createLine(_this, 2, 15)
  },
  update: function(it) {
    var _this = this
    var _last = this.last

    var _index
    var _templateId = _last[1]
    var _template = _tp_getTemplate(_this, _templateId)
    if (it.isTrue) {
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
      if (it.isTrue) {
        _currentTemplateId = 4
        _TemplateConstructor = Template_4
      } else {
        _currentTemplateId = 8
        _TemplateConstructor = Template_8
      }

      if (_TemplateConstructor) {
        _last[1] = _currentTemplateId
        _template = _tp_getConditionTemplate(_this, _currentTemplateId, _TemplateConstructor, this.options)
        _tp_after(_this, 3, _currentTemplateId)
      } else {
        _last[1] = null
        _template = null
      }
    }
    if (_template) _template.update(it)

    var _lastLength = _last[2] || 0
    var _list = it.matrix[it.members[1]] || []
    var _index = 0
    var _len = _last[2] = _list.length
    for (; _index < _len; _index++) {
      var index = _index
      var item = _list[_index]
      var _itemId = '16_' + _index
      var _template = _tp_getConditionTemplate(_this, _itemId, Template_16, this.options)
      if (_index >= _lastLength) {
        var _prevId = _index ? ('16_' + (_index - 1)) : 15
        _tp_after(_this, _prevId, _itemId)
      }
      _template.update(it, item, index)
    }
    for (; _index < _lastLength; _index++) {
      _tp_remove(_this, '16_' + _index)
    }
  }
})

var Template_4 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createText(_this, null, 6, 'It is true.')
  }
})

var Template_8 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createText(_this, null, 10, 'It is else.')
  }
})

var Template_16 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createText(_this, null, 18, '')
  },
  update: function(it, item, index) {
    var _this = this
    var _last = this.last

    var _tmp = 'it is for loop ' + index
    if (_last[0] !== _tmp) {
      _last[0] = _tmp
      _tp_text(_this, 18, _tmp)
    }
  }
})

module.exports = exports['default'] = Template_0
