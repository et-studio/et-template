'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_createElement = _dep.tp_createElement
var _tp_setRoot = _dep.tp_setRoot
var _tp_setAttribute = _dep.tp_setAttribute
var _tp_removeAttribute = _dep.tp_removeAttribute

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _elements = this.elements
    var _scope = this

    _tp_createElement(_elements, 2, 'DIV', {
      "disabled": ""
    })
    _tp_setRoot(this, 2)
  },
  update: function update(it) {
    var _elements = this.elements
    var _last = this.last

    var _tmp = 'aaa' + it.id + 'bbb' + it.getSrc()
    if (_last[0] !== _tmp) {
      _last[0] = _tmp
      _tp_setAttribute(_elements, 2, 'id', _tmp)
    }

    var _tmp = (function() {
      return it.a + it.b;
    })()
    if (_last[1] !== _tmp) {
      _last[1] = _tmp
      _tp_setAttribute(_elements, 2, 'data-type', _tmp)
    }

    if (it.isTrue) {
      if (_last[2] !== 0) {
        _last[2] = 0
        _tp_setAttribute(_elements, 2, 'class', 'class-true')
      }
    } else {
      if (_last[2] !== 1) {
        _last[2] = 1
        _tp_removeAttribute(_elements, 2, 'class')
      }
    }
  }
})

module.exports = exports['default'] = Template_0
