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
    var it = _this.context

    _tp_createElement(_this, null, 2, 'DIV')
    _tp_createLine(_this, 2, 3)
  },
  update: function() {
    var _this = this
    var _last = _this.last
    var it = _this.context

    var _index
    var _templateId = _last[1]
    var _template = _tp_getTemplate(_this, _templateId)
    if (it.number > 1) {
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
      if (it.number > 1) {
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
    if (_template) _template.update()
  }
})
var Template_4 = _dep_createTemplate({
  create: function() {
    var _this = this
    var it = _this.context

    _tp_createText(_this, null, 6, 'Bigger than 1.')
  }
})
var Template_8 = _dep_createTemplate({
  create: function() {
    var _this = this
    var it = _this.context

    _tp_createText(_this, null, 10, 'Smaller than 1.')
  }
})
module.exports = exports['default'] = Template_0
