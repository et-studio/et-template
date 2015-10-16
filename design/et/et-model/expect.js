'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_bind = _dep.tp_bind
var _tp_setModel = _dep.tp_setModel

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createElement(_this, null, 2, 'DIV')
    _tp_createElement(_this, 2, 4, 'INPUT')
    _tp_bind(_this, 4, 'change keyup', function(e) {
      _tp_setModel(_this, 'event', 'name', e.target.value)
    })
  }
})
module.exports = exports['default'] = Template_0
