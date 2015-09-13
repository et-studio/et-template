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

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _this = this
    var _scope = this

    _tp_createText(_this, 2, 'It is before.')
    _tp_createLine(_this, 3)
    _tp_createFragment(_this, 4)
    _tp_createText(_this, 6, 'It is number and is even')

    _tp_setRoot(_this, 2)
    _tp_setRoot(_this, 3)
  },
  update: function update(it) {
    var _this = this
    var _last = this.last

    if (it.isNumber && it.isEven) {
      if (_last[0] !== 0) {
        _last[0] = 0

        _tp_append(_this, 4, 6)
        _tp_setRoot(_this, 6)
        _tp_after(_this, 3, 4)
      }
    }
  }
})

module.exports = exports['default'] = Template_0
