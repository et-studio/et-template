'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_createElement = _dep.tp_createElement
var _tp_createText = _dep.tp_createText
var _tp_setRoot = _dep.tp_setRoot
var _tp_append = _dep.tp_append
var _tp_text = _dep.tp_text

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _elements = this.elements
    var _scope = this

    _tp_createElement(_elements, 2, 'DIV')
    _tp_createText(_elements, 4, '')
    _tp_createElement(_elements, 6, 'P')
    _tp_createText(_elements, 8, 'Sorry, you can\'t do it. bbbbbbbbb')
    _tp_createElement(_elements, 10, 'P')
    _tp_createText(_elements, 12, '')

    _tp_setRoot(this, 2)
    _tp_append(_elements, 2, 4)
    _tp_setRoot(this, 6)
    _tp_append(_elements, 6, 8)
    _tp_setRoot(this, 10)
    _tp_append(_elements, 10, 12)
  },
  update: function update(it) {
    var _elements = this.elements
    var _last = this.last

    var _tmp = 'aaaa[' + it.src + ']'
    if (_last[0] !== _tmp) {
      _last[0] = _tmp
      _tp_text(_elements, 4, _tmp)
    }

    var _tmp = it.unreadCount > 99 ? '99+' : it.unreadCount
    if (_last[1] !== _tmp) {
      _last[1] = _tmp
      _tp_text(_elements, 12, _tmp)
    }
  }
})

module.exports = exports['default'] = Template_0
