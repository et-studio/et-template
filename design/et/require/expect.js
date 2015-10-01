'use strict'

var Template_4 = require('./models/user')
var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_createElement = _dep.tp_createElement
var _tp_getTemplate = _dep.tp_getTemplate
var _tp_createText = _dep.tp_createText
var _tp_setRoot = _dep.tp_setRoot
var _tp_append = _dep.tp_append

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _elements = this.elements
    var _scope = this

    _tp_createElement(_elements, 2, 'DIV')
    _tp_getTemplate(_elements, 4, Template_4, this.options)
    _tp_createText(_elements, 6, '1234567890')

    _tp_setRoot(this, 2)
    _tp_append(_elements, 2, 4)
    _tp_append(_elements, 2, 6)
  },
  update: function update(it) {
    var _elements = this.elements
    var _last = this.last
    _this.doms[4].update(it, it.test)
  }
})
module.exports = exports['default'] = Template_0
