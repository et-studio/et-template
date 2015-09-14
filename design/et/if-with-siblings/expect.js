'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_createText = _dep.tp_createText
var _tp_createLine = _dep.tp_createLine
var _tp_createFragment = _dep.tp_createFragment
var _tp_setRoot = _dep.tp_setRoot
var _tp_append = _dep.tp_append
var _tp_after = _dep.tp_after
var _tp_remove = _dep.tp_remove
var _tp_removeRoot = _dep.tp_removeRoot

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _elements = this.elements
    var _scope = this

    _tp_createText(_elements, 2, 'It is before.')
    _tp_createLine(_elements, 3)
    _tp_createFragment(_elements, 4)
    _tp_createText(_elements, 6, 'It is number and is even')

    _tp_setRoot(this, 2)
    _tp_setRoot(this, 3)
  },
  update: function update(it) {
    var _elements = this.elements
    var _last = this.last

    if (it.isNumber && it.isEven) {
      if (_last[0] !== 0) {
        _last[0] = 0

        _tp_append(_elements, 4, 6)
        _tp_setRoot(this, 6)
        _tp_after(_elements, 3, 4)
      }
    } else {
      if (_last[0] !== 1) {
        _last[0] = 1

        _tp_remove(_elements, 6)
        _tp_removeRoot(this, 6)
      }
    }
  }
})
module.exports = exports['default'] = Template_0
