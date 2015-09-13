'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_createElement = _dep.tp_createElement
var _tp_bind = _dep.tp_bind
var _tp_setRoot = _dep.tp_setRoot

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _this = this
    var _scope = this.options.scope

    _tp_createElement(_this, 2, 'DIV')
    _tp_createElement(_this, 4, 'INPUT')
    _tp_bind(_this, 4, 'change keyup', function(e) {
      _scope.name = e.target.value
    })
    _tp_setRoot(_this, 2)
  }
})

module.exports = exports['default'] = Template_0
