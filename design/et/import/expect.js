'use strict'

var _dep = require('et-dependency')
var Template_4 = require('./models/user')

var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_createTemplate = _dep.tp_createTemplate
var _tp_createText = _dep.tp_createText
var _tp_getTemlate = _dep.tp_getTemlate

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    var it = _this.context

    _tp_createElement(_this, null, 2, 'DIV')
    _tp_createTemplate(_this, 2, Template_4, it.userContext)
    _tp_createText(_this, 2, 6, '1234567890')
  },
  update: function() {
    var _this = this
    var _last = _this.last
    var it = _this.context

    var _template = _tp_getTemlate(_this, 4)
    _template.update()
  }
})
module.exports = exports['default'] = Template_0
