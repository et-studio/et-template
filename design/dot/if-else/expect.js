'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_createLine = _dep.tp_createLine
var _tp_getTemplate = _dep.tp_getTemplate
var _tp_getConditionTemplate = _dep.tp_getConditionTemplate
var _tp_after = _dep.tp_after
var _tp_createText = _dep.tp_createText

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createElement(_this, null, 2, 'DIV')
    _tp_createLine(_this, 2, 3)
  },
  update: function(it) {
    var _this = this
    var _last = this.last

    var _index
    var _templateId = _last[1]
    var _template = _tp_getTemplate(_this, _templateId)
    if (it.isTrue) {
      _index = 0
    } else if (it.elseTrue) {
      _index = 1
    } else {
      _index = 2
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
      } else if (it.elseTrue) {
        _currentTemplateId = 8
        _TemplateConstructor = Template_8
      } else {
        _currentTemplateId = 12
        _TemplateConstructor = Template_12
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
    _tp_createText(_this, null, 10, 'It is elseTrue.')
  }
})
var Template_12 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createText(_this, null, 14, 'It is else.')
  }
})
module.exports = exports['default'] = Template_0
