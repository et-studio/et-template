'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_createElement = _dep.tp_createElement
var _tp_createLine = _dep.tp_createLine
var _tp_createFragment = _dep.tp_createFragment
var _tp_createText = _dep.tp_createText
var _tp_setRoot = _dep.tp_setRoot
var _tp_append = _dep.tp_append
var _tp_remove = _dep.tp_remove
var _tp_after = _dep.tp_after

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _elements = this.elements
    var _scope = this

    _tp_createElement(_elements, 2, 'DIV')
    _tp_createLine(_elements, 3)
    _tp_createFragment(_elements, 4)
    _tp_createText(_elements, 6, 'It is true.')
    _tp_createText(_elements, 10, 'It is elseTrue.')
    _tp_createText(_elements, 14, 'It is else.')

    _tp_setRoot(this, 2)
    _tp_append(_elements, 2, 3)
  },
  update: function update(it) {
    var _elements = this.elements
    var _last = this.last

    if (it.isTrue) {
      if (_last[0] !== 0) {
        _last[0] = 0

        _tp_remove(_elements, 10)
        _tp_remove(_elements, 14)
        _tp_append(_elements, 4, 6)
        _tp_after(_elements, 3, 4)
      }
    } else if (it.elseTrue) {
      if (_last[0] !== 1) {
        _last[0] = 1

        _tp_remove(_elements, 6)
        _tp_remove(_elements, 14)
        _tp_append(_elements, 4, 10)
        _tp_after(_elements, 3, 4)
      }
    } else {
      if (_last[0] !== 2) {
        _last[0] = 2

        _tp_remove(_elements, 6)
        _tp_remove(_elements, 10)
        _tp_append(_elements, 4, 14)
        _tp_after(_elements, 3, 4)
      }
    }
  }
})
module.exports = exports['default'] = Template_0
