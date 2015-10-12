
var parentElementId = it.parentId
if (it.isRoot) parentElementId = null

_.each(it.doms, (dom, i) => {
  var condition = ''
  if (dom.tag !== 'else') {
    condition = `(${expression.condition})`
  }
  var exclusionStrings = dom.exclusions.map((id) =>
    return `@.remove(_this, ${id})`
  )

  // {{
  ${dom.tag} ${condition} {
    var _template = @.getOrCreateTemplate(_this, ${parentElementId}, ${it.id}, ${it.templateName}, this.options)
    if (_last[${it.valueId}] !== ${i}) {
      _last[${it.valueId}] = ${i}

      ${exclusionStrings.join('\n')}
      @.after(_this, ${it.lineId}, ${dom.id})
    }
    _template.update(${dom.args.join(', ')})
  }
  // }}
})
