'use strict'

var _dep = require('et-dependency')
var _dep_createTemplate = _dep.dep_createTemplate
var _tp_createElement = _dep.tp_createElement

var Template_0 = _dep_createTemplate({
  create: function() {
    var _this = this
    _tp_createElement(_this, null, 2, 'DIV', {
      "id": "test",
      "data-title": "Sorry, you can't do it."
    })
    _tp_createElement(_this, null, 4, 'BR')
  }
})
module.exports = exports['default'] = Template_0
