'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement
var _tp_bind = _dep.tp_bind

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createElement(_this, null, 2, 'DIV')
    _tp_createElement(_this, 2, 4, 'INPUT')
    _tp_bind(_this, 4, 'change input', function(e) {
      var it = this // this is the context
      it.name = e.target.value
    })
  },
  update: function() {
    var _this = this
    var it = _this.context

    var _tmp = (it.name)
    if (_tp_getProperty(_this, 4, 'value') !== _tmp) {
      _tp_setProperty(_this, 4, 'value', _tmp)
    }
  }
})
module.exports = exports['default'] = Template_0
