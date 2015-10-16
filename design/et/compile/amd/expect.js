;define('Template', ['et-dependency'], function(_dep) {
  var _dep_createTemplate = _dep.dep_createTemplate
  var _tp_createElement = _dep.tp_createElement
  var _tp_createText = _dep.tp_createText

  var Template_0 = _dep_createTemplate({
    create: function() {
      var _this = this
      _tp_createElement(_this, null, 2, 'DIV')
      _tp_createText(_this, 2, 4, 'test')
    }
  })
  return Template_0
})
