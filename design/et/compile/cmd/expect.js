;define(function(require, exports, module) {
  var _dep = require('et-dependency')
  var _dep_createTemplate = _dep.dep_createTemplate
  var _tp_createElement = _dep.tp_createElement
  var _tp_createText = _dep.tp_createText

  var Template_0 = _dep_createTemplate({
    create: function() {
      var _this = this
      var it = _this.context

      _tp_createElement(_this, null, 2, 'DIV')
      _tp_createText(_this, 2, 4, 'test')
    }
  })
  module.exports = exports['default'] = Template_0
})
