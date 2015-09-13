'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_createElement = _dep.tp_createElement
var _tp_html = _dep.tp_html
var _tp_setRoot = _dep.tp_setRoot

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _this = this
    var _scope = this

    _tp_createElement(_this, 2, 'DIV')
    _tp_html(_this, 2, '<div></div>')
    _tp_setRoot(_this, 2)
  }
})

module.exports = exports['default'] = Template_0
