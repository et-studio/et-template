'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_createElement = _dep.tp_createElement
var _tp_setRoot = _dep.tp_setRoot

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _this = this
    var _scope = this

    _tp_createElement(_this, 2, 'DIV', {
      "id": "test",
      "data-title": "Sorry, you can't do it."
    })
    _tp_createElement(_this, 4, 'BR')

    _tp_setRoot(_this, 2)
    _tp_setRoot(_this, 4)
  }
})
module.exports = exports['default'] = Template_0
