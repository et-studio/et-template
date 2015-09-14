'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_createLine = _dep.tp_createLine
var _tp_createFragment = _dep.tp_createFragment
var _tp_setRoot = _dep.tp_setRoot
var _tp_getTemplate = _dep.tp_getTemplate
var _tp_append = _dep.tp_append
var _tp_remove = _dep.tp_remove
var _tp_after = _dep.tp_after
var _tp_createText = _dep.tp_createText
var _tp_text = _dep.tp_text

function Template_0(options) {
  this.init(options)
}
function Template_2(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _elements = this.elements
    var _scope = this

    _tp_createLine(_elements, 1)
    _tp_createFragment(_elements, 2)

    _tp_setRoot(this, 1)
    _tp_setRoot(this, 2, 0)
  },
  update: function update(it) {
    var _elements = this.elements
    var _last = this.last

    var _lastLength = _last[0] || 0
    var _list = it.matrix[it.members[1]] || []
    var _index = 0
    var _len = _last[0] = _list.length
    for (; _index < _len; _index++) {
      var index = _index
      var item = _list[_index]
      var _template = _tp_getTemplate(_elements, '2_' + _index, Template_2, this.options)
      if (_index >= _lastLength) {
        _tp_append(_elements, 2, '2_' + _index)
      }
      _template.update(it, item, index)
    }
    for (; _index < _lastLength; _index++) {
      _tp_remove(_elements, '2_' + _index)
    }
    _tp_after(_elements, 1, 2)
    _tp_setRoot(this, 2, _len)
  }
})
_extend(Template_2.prototype, _prototype, {
  create: function create() {
    var _elements = this.elements
    var _scope = this

    _tp_createText(_elements, 4, '')
    _tp_setRoot(this, 4)
  },
  update: function update(it, item, index) {
    var _elements = this.elements
    var _last = this.last

    var _tmp = 'it is for loop ' + index
    if (_last[0] !== _tmp) {
      _last[0] = _tmp
      _tp_text(_elements, 4, _tmp)
    }
  }
})
module.exports = exports['default'] = Template_0
