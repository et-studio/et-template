
// {{
var _lastLength = _last[${it.valueId}] || 0
var _list = ${it.expression} || []

var _index = 0
var _len = _last[${it.valueId}] = _list.length
for (; _index < _len; _index++) {
  var ${it.indexName} = _index
  var ${it.itemName} = _list[_index]

  var _template = @.getTemplate('${it.id}_' + _index, ${it.templateName})
  if (_index >= _lastLength) {
    @.append(${it.id}, '${it.id}_' + _index)
  }
  _template.update(${it.args.join(', ')})
}
for (; _index < _lastLength; _index++) {
  @.remove('${it.id}_' + _index)
}
@.after(${it.lineId}, ${it.id})
// }}

if (it.isRoot) {
  // {{
  @.setRoot(${it.id}, _len)
  // }}
}
