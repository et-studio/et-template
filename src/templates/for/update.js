
// {{
var _lastLength = _last[${it.valueId}] || 0
var _list = ${it.expression} || []

var _index = 0
var _len = _last[${it.valueId}] = _list.length
for (; _index < _len; _index++) {
  var ${it.indexName} = _index
  var ${it.itemName} = _list[_index]

  var _template = @.getTemplate(_elements, '${it.id}_' + _index, ${it.templateName}, this.options)
  if (_index >= _lastLength) {
    @.append(_elements, ${it.id}, '${it.id}_' + _index)
  }
  _template.update(${it.args.join(', ')})
}
for (; _index < _lastLength; _index++) {
  @.remove(_elements, '${it.id}_' + _index)
}
@.after(_elements, ${it.lineId}, ${it.id})
// }}

if (it.isRoot) {
  // {{
  @.setRoot(this, ${it.id}, _len)
  // }}
}
