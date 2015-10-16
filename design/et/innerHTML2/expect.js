'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_html = _dep.tp_html

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createElement(_this, null, 2, 'DIV')
  },
  update: function(it) {
    var _this = this
    var _last = this.last

    var _tmp = 'aaa' + it.html + 'bbb'
    if (_last[0] !== _tmp) {
      _last[0] = _tmp
      _tp_html(_this, 2, _tmp)
    }
  }
})
module.exports = exports['default'] = Template_0
