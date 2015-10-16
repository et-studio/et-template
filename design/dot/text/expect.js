'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_createText = _dep.tp_createText
var _tp_text = _dep.tp_text

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    
    _tp_createElement(_this, null, 2, 'DIV')
    _tp_createText(_this, 2, 4, '')
  },
  update: function(it) {
    var _this = this
    var _last = this.last

    var _tmp = 'aaaa' + it.src
    if (_last[0] !== _tmp) {
      _last[0] = _tmp
      _tp_text(_this, 4, _tmp)
    }
  }
})
module.exports = exports['default'] = Template_0
