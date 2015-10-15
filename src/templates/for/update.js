
// {{
var _lastLength = _last[${it.valueId}] || 0
var _list = ${it.expression} || []

var _index = 0
var _len = _last[${it.valueId}] = _list.length
for (; _index < _len; _index++) {
  var ${it.indexName} = _index
  var ${it.itemName} = _list[_index]
  var _itemId = '${it.id}_' + _index
  var _template = _tp_getConditionTemplate(_this, _itemId, ${it.templateName}, this.options)

  if (_index >= _lastLength) {
    var _prevId = _index?('${it.id}_' + (_index - 1)) : ${it.lineId}
    _tp_after(_this, _prevId, _itemId)
  }
  _template.update(${it.args.join(', ')})
}
for (; _index < _lastLength; _index++) {
  _tp_remove(_elements, '${it.id}_' + _index)
}
// }}

if (it.isRoot) {
  // {{
  _tp_setRoot(this, ${it.id}, _len)
  // }}
}
