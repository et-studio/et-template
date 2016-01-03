
// {{
var _itemId = '${it.id}_' + ${it.trackBy}
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
var _isTemplateChanged = false
var _lastItemId = _last['for_item_id_' + '2_' + _index]
_last['for_item_id_' + '2_' + _index] = itemId
if (_lastItemId && _lastItemId !== itemId) {
  // if come to here the lastTemplate should be created
  var _lastTemplate = _tp_getTemplate(_this, _itemId)
  if (_lastTemplate) _lastTemplate.remove()
  _isTemplateChanged = true
}

if (_index >= _lastLength || _isTemplateChanged) {
  var _prevId = _index?('${it.id}_' + (_index - 1)) : ${it.lineId}
  _tp_after(_this, _prevId, _itemId)
}
// }}
