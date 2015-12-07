'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_bind = _dep.tp_bind

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    var it = _this.context
    _tp_createElement(_this, null, 2, 'DIV')
    _tp_createElement(_this, 2, 4, 'INPUT', {
      "type": "file"
    })
    _tp_bind(_this, 4, 'change input', function() {
      it.file = this.file
      it.value = this.value
    })
  }
})
module.exports = exports['default'] = Template_0
