'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_craeteLine = _dep.tp_craeteLine
var _tp_craeteFragment = _dep.tp_craeteFragment
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
    var _this = this
    var _scope = this

    _tp_craeteLine(_this, 1)
    _tp_craeteFragment(_this, 2)
    _tp_setRoot(_this, 1)
    _tp_setRoot(_this, 2, 0)
  },
  update: function update(it) {
    var _this = this
    var _last = this.last

    var _lastLength = _last[0] || 0
    var _list = it.matrix[it.members[1]] || []
    var _index = 0
    var _len = _last[0] = _list.length
    for (; _index < _len; _index++) {
      var index = _index
      var item = _list[_index]
      var _template = _tp_getTemplate(_this, '2_' + _index, Template_2)
      if (_index >= _lastLength) {
        _tp_append(_this, 2, '2_' + _index)
      }
      _template.update(it, item, index)
    }
    for (; _index < _lastLength; _index++) {
      _tp_remove(_this, '2_' + _index)
    }
    _tp_after(_this, 1, 2)
    _tp_setRoot(_this, 2, _len)
  }
})
_extend(Template_2.prototype, _prototype, {
  create: function create() {
    var _this = this
    var _scope = this

    _tp_createText(_this, 4, '')
    _tp_setRoot(_this, 4)
  },
  update: function update(it, item, index) {
    var _this = this
    var _last = this.last

    var _tmp = 'it is for loop ' + index
    if (_last[0] !== _tmp) {
      _last[0] = _tmp
      _tp_text(_this, 4, _tmp)
    }
  }
})
module.exports = exports['default'] = Template_0
