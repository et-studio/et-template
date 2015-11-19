'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_createText = _dep.tp_createText

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    var it = _this.context

    _tp_createElement(_this, null, 2, 'DIV')
    _tp_createElement(_this, 2, 4, 'A')
    _tp_bindEventsByMap(_this, 4, {
      'click': it.onClick
    })
    _tp_createText(_this, 4, 6, 'Test click event!')
  },
  update: function() {
    var _this = this
    var _last = this
    var it = _this.context

    var _current = [name, city]
    var _saved = _tp_getEventArguments(_this, 4, 'click')
    if (!_tp_isArrayEqual(_saved, _current)) {
      _tp_saveEventArguments(_this, 4, 'click', _current)
    }
  }
})
module.exports = exports['default'] = Template_0
