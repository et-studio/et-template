
var parentElementId = it.parentId
if (it.isRoot) parentElementId = null

_.each(it.doms, (dom, i) => {
  var condition = ''
  if (dom.tag !== 'else') {
    condition = `(${expression.condition})`
  }
  
  if (dom.id) {
    // {{
    ${dom.tag} ${condition} {
      var _template = _tp_getConditionTemplate(_this, ${parentElementId}, ${dom.id}, ${dom.templateName}, this.options)
      if (_last[${it.valueId}] !== ${i}) {
        _last[${it.valueId}] = ${i}

        var _lastTemplateId = _last[${it.saveId}]
        var _lastTemplate = _tp_getTemplate(_this, _lastTemplateId)
        if (_lastTemplate) {
          _lastTemplate.remove()
          // }}
          if (it.isRoot) {
            // {{
            _tp_removeRoot(_this, _lastTemplateId)
            // }}
          }
          // {{
        }

        _last[${it.saveId}] = ${dom.id}
        _tp_after(_this, ${it.lineId}, ${dom.id})
        // }}
        if (it.isRoot) {
          // {{
          _tp_setRoot(_this, ${dom.id})
          // }}
        }
        // {{
      }
      _template.update(${dom.args.join(', ')})
    }
    // }}
  } else {
    // {{
    ${dom.tag} ${condition} {
      if (_last[${it.valueId}] !== ${i}) {
        _last[${it.valueId}] = ${i}

        var _lastTemplateId = _last[${it.saveId}]
        var _lastTemplate = _tp_getTemplate(_this, _lastTemplateId)
        if (_lastTemplate) {
          _lastTemplate.remove()
          // }}
          if (it.isRoot) {
            // {{
            _tp_removeRoot(_this, _lastTemplateId)
            // }}
          }
          // {{
        }
        _last[${it.saveId}] = null
      }
    }
    // }}
  }
})
