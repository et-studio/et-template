'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_setAttribute = _dep.tp_setAttribute
var _tp_removeAttribute = _dep.tp_removeAttribute

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createElement(_this, null, 2, 'DIV', {
      "disabled": ""
    })
  },
  update: function(it) {
    var _this = this
    var _last = this.last

    var _tmp = 'aaa' + it.id + 'bbb' + it.getSrc()
    if (_last[0] !== _tmp) {
      _last[0] = _tmp
      _tp_setAttribute(_this, 2, 'id', _tmp)
    }

    var _tmp = (function() {
      return it.a + it.b
    })()
    if (_last[1] !== _tmp) {
      _last[1] = _tmp
      _tp_setAttribute(_this, 2, 'data-type', _tmp)
    }

    var _tmp = 'It is ' + (function() {
        if (it.isTrue) {
          return 'true'
        } else {
          return 'false'
        }
        return ''
      })() + '!!!'
    if (_last[2] !== _tmp) {
      _last[2] = _tmp
      _tp_setAttribute(_this, 2, 'data-title', _tmp)
    }

    if (it.isTrue) {
      if (_last[3] !== 0) {
        _last[3] = 0
        _tp_setAttribute(_this, 2, 'class', 'class-true')
      }
    } else {
      if (_last[3] !== 1) {
        _last[3] = 1
        _tp_removeAttribute(_this, 2, 'class')
      }
    }
  }
})

module.exports = exports['default'] = Template_0
