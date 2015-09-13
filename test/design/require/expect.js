'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var Template_4 = require('./models/user')
var _tp_createElement = _dep.tp_createElement
var _tp_getTemplate = _dep.tp_getTemplate
var _tp_createText = _dep.tp_createText
var _tp_setRoot = _dep.tp_setRoot
var _tp_append = _dep.tp_append
var _tp_updateTemplate = _dep.tp_updateTemplate

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _this = this
    var _scope = this

    _tp_createElement(_this, 2, 'DIV')
    _tp_getTemplate(_this, 4, Template_4)
    _tp_createText(_this, 6, '1234567890')

    _tp_setRoot(_this, 2)
    _tp_append(_this, 2, 4)
    _tp_append(_this, 2, 6)
  },
  update: function update(it) {
    var _this = this
    var _last = this.last
    _tp_updateTemplate(_this, 4, it, it.test)
  }
})

module.exports = exports['default'] = Template_0
