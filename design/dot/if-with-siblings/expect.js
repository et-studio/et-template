'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createText = _dep.tp_createText
var _tp_createLine = _dep.tp_createLine
var _tp_getTemplate = _dep.tp_getTemplate
var _tp_setRoot = _dep.tp_setRoot
var _tp_getConditionTemplate = _dep.tp_getConditionTemplate
var _tp_after = _dep.tp_after

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createText(_this, null, 2, 'It is before.')
    _tp_createLine(_this, null, 3)
  },
  update: function(it) {
    var _this = this
    var _last = this.last

    var _index
    var _templateId = last[1]
    var _template = _tp_getTemplate(_this, _templateId)
    if (it.isNumber && it.isEven) {
      _index = 0
    } else {
      _index = 1
    }
    if (_last[0] !== _index) {
      _last[0] = _index
      if (_template) {
        _template.remove()
        _tp_setRoot(_this, _templateId, false)
      }
      var _currentTemplateId
      var _TemplateConstructor
      if (it.isNumber && it.isEven) {
        _currentTemplateId = 4
        _TemplateConstructor = Template_4
      } else {
        _currentTemplateId = null
        _TemplateConstructor = null
      }
      if (_TemplateConstructor) {
        _last[1] = _currentTemplateId
        _template = _tp_getConditionTemplate(_this, _currentTemplateId, _TemplateConstructor, this.options)
        _tp_after(_this, 3, _currentTemplateId)
        _tp_setRoot(_this, _currentTemplateId, true)
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
    _tp_createText(_this, null, 6, 'It is number and is even')
  }
})
module.exports = exports['default'] = Template_0
