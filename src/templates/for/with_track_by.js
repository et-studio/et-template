
// {{
var _savedCache = [];
for (; _index < _len; _index++) {
  var ${it.indexName} = _index;
  var ${it.itemName} = _list[_index];
  var _itemId = '${it.id}_' + ${it.trackBy};
  // }}
  if (it.context) {
    // {{
    var _template = _tp_getConditionTemplate(_this, _itemId, ${it.templateName}, ${it.context});
    // }}
  } else {
    // {{
    var _template = _tp_getConditionTemplate(_this, _itemId, ${it.templateName});
    // }}
  }

  // {{
  var _isTemplateChanged = false;
  var _lastItemId = _last['for_item_id_' + '${it.id}_' + _index];
  _last['for_item_id_' + '${it.id}_' + _index] = _itemId;
  if (_lastItemId && _lastItemId !== _itemId) {
    // if come to here the lastTemplate should be created
    var _lastTemplate = _tp_getTemplate(_this, _lastItemId);
    if (_lastTemplate && !~_savedCache.indexOf(_lastItemId)) _lastTemplate.remove();
    _isTemplateChanged = true;
  }

  if (_index >= _lastLength || _isTemplateChanged) {
    var _prevId = _index?(_last['for_item_id_' + '${it.id}_' + (_index - 1)]) : ${it.lineId};
    _tp_after(_this, _prevId, _itemId);
  }

  _savedCache.push(_itemId);
  _template.update(${it.args.join(', ')});
}
for (; _index < _lastLength; _index++) {
  var _tmpItemId = _last['for_item_id_' + '${it.id}_' + _index];
  _last['for_item_id_' + '${it.id}_' + _index] = null;
  if (!~_savedCache.indexOf(_tmpItemId)) {
    _tp_remove(_this, _tmpItemId);
  }
}
// }}
