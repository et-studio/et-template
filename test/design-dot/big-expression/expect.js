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
    var _this = this
    var _scope = this

    _tp_createElement(_this, 2, 'DIV')
    _tp_createLine(_this, 3)
    _tp_createFragment(_this, 4)
    _tp_createText(_this, 6, 'Bigger than 1.')
    _tp_createText(_this, 10, 'Smaller than 1.')
    _tp_setRoot(_this, 2)
    _tp_append(_this, 2, 3)
  },
  update: function update(it) {
    var _this = this
    var _last = this.last
    if (it.number > 1) {
      if (_last[0] !== 0) {
        _last[0] = 0

        _tp_remove(_this, 10)
        _tp_append(_this, 4, 6)
        _tp_after(_this, 3, 4)
      }
    } else {
      if (_last[0] !== 1) {
        _last[0] = 1
        
        _tp_remove(_this, 6)
        _tp_append(_this, 4, 10)
        _tp_after(_this, 3, 4)
      }
    }
  }
})

module.exports = exports['default'] = Template_0
