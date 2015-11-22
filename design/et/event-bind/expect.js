'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_bindEventsByMap = _dep.tp_bindEventsByMap
var _tp_getEventArguments = _dep.tp_getEventArguments
var _tp_createText = _dep.tp_createText
var _tp_isArrayEqual = _dep.tp_isArrayEqual
var _tp_saveEventArguments = _dep.tp_saveEventArguments

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    var it = _this.context

    _tp_createElement(_this, null, 2, 'DIV')
    _tp_createElement(_this, 2, 4, 'A')
    _tp_bindEventsByMap(_this, 4, {
      'click': function(e) {
        var args = _tp_getEventArguments('click')
        it.onClick(e, args[0], args[1])
      }
    })
    _tp_createText(_this, 4, 6, 'on-click')
    _tp_createElement(_this, 2, 8, 'A')
    _tp_bindEventsByMap(_this, 8, {
      'click': function(e) {
        it.onClick(e)
      }
    })
    _tp_createText(_this, 8, 10, '(click)')
  },
  update: function() {
    var _this = this
    var _last = _this.last
    var it = _this.context

    var _current = [name, city]
    var _saved = _tp_getEventArguments(_this, 4, 'click')
    if (!_tp_isArrayEqual(_saved, _current)) {
      _tp_saveEventArguments(_this, 4, 'click', _current)
    }
  }
})

module.exports = exports['default'] = Template_0
