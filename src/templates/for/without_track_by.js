
// {{
var _itemId = '${it.id}_' + _index
// }}

if (it.context) {
  // {{
  var _template = _tp_getConditionTemplate(_this, _itemId, ${it.templateName}, ${it.context})
  // }}
} else {
  // {{
  var _template = _tp_getConditionTemplate(_this, _itemId, ${it.templateName})
  // }}
}
// {{
if (_index >= _lastLength) {
  var _prevId = _index?('${it.id}_' + (_index - 1)) : ${it.lineId}
  _tp_after(_this, _prevId, _itemId)
}
// }}
