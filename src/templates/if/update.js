
// {{
var _index
var _templateId = _last[${it.saveId}]
var _template = _tp_getTemplate(_this, _templateId)

// }}
_.each(it.doms, (dom, i) => {
  var condition = ''
  if (dom.tag !== 'else') condition = `(${dom.condition})`
  // {{
  ${dom.tag} ${condition} {
    _index = ${i}
  }
  // }}
})
// {{

if (_last[${it.valueId}] !== _index) {
  _last[${it.valueId}] = _index

  if (_template) {
    _template.remove()
    // }}
    if (it.isRoot) {
      // {{
      _tp_removeRoot(_this, _templateId)
      // }}
    }
    // {{
  }

  var _currentTemplateId
  var _TemplateConstructor
  // }}
  _.each(it.doms, (dom, i) => {
    var condition = ''
    if (dom.tag !== 'else') condition = `(${dom.condition})`
    // {{
    ${dom.tag} ${condition} {
      _currentTemplateId = ${dom.id?dom.id:null}
      _TemplateConstructor = ${dom.id?dom.templateName:null}
    }
    // }}
  })
  // {{
  if (_TemplateConstructor) {
    _last[${it.saveId}] = _currentTemplateId
    _template = _tp_getConditionTemplate(_this, _currentTemplateId, _TemplateConstructor, this.options)
    _tp_after(_this, ${it.lineId}, _currentTemplateId)
    // }}
    if (it.isRoot) {
      // {{
      _tp_setRoot(_this, _currentTemplateId)
      // }}
    }
    // {{
  } else {
    _last[${it.saveId}] = null
    _template = null
  }
}
if (_template) _template.update(it)
// }}
