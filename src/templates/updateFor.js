
// {{
var _line = _doms.${it.lineId};
var _lastLength = _last.${it.valueId};
var _list = ${it.condition};
var _i = 0;
var _len = _list.length;
for (; _i < _len; _i++) {
  var _et = _doms['${it.id}_' + _i];
  var _item = _list[_i];
  var ${it.indexName} = _i;
  var ${it.itemName} = _item;

  if (!_et) {
    _doms['${it.id}_' + _i] = _et = new ${it.templateName}();
  }
  if (!_lastLength || _lastLength < _i) {
    _util.before(_line, _et.get());
  }
  _et.update(${it.args.join(',')});
}

_last.${it.valueId} = _i;
for (; _i < _lastLength; _i++) {
  var _et = _doms['${it.id}_' + _i];
  _et.remove();
}
// }}

if (it.isRoot) {
  // {{
  var _lastLength = _last.${it.valueId};
  var _et = _doms.${it.id};
  _et.rootIds = [];
  for (_i = 0; _i < _lastLength; _i++) {
    _et.rootIds.push('${it.id}_' + _i);
    _et.doms['${it.id}_' + _i] = _doms['${it.id}_' + _i];
  }
  // }}
}
