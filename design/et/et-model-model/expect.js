'use strict'

var _dep = require('et-dependency')
var _prototype = _dep.template
var _extend = _dep.extend

var _tp_createElement = _dep.tp_createElement
var _tp_bind = _dep.tp_bind
var _tp_setRoot = _dep.tp_setRoot
var _tp_append = _dep.tp_append

function Template_0(options) {
  this.init(options)
}
_extend(Template_0.prototype, _prototype, {
  create: function create() {
    var _elements = this.elements
    var _scope = this.options.scope

    _tp_createElement(_elements, 2, 'DIV')
    _tp_createElement(_elements, 4, 'INPUT')
    _tp_bind(this, 4, 'change keyup', function(e) {
      _scope.set('name', e.target.value)
    })
    _tp_setRoot(this, 2)
    _tp_append(_elements, 2, 4)
  }
})

module.exports = exports['default'] = Template_0
