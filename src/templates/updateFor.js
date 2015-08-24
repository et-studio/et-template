
// {{
var _line = _doms[${it.lineId}];
var _lastLength = _last[${it.valueId}] || 0;
var _list = ${it.expression} || [];

var _i = 0;
var _len = _list.length;
_last[${it.valueId}] = _len;
for (; _i < _len; _i++) {
  var _et = _doms['${it.id}_' + _i];
  var _item = _list[_i];
  var ${it.indexName} = _i;
  var ${it.itemName} = _item;

  if (!_et) {
    _doms['${it.id}_' + _i] = _et = new ${it.templateName}();
  }
  if (_i >= _lastLength) {
    _util.after(_line, _et.get());
  }
  _et.update(${it.args.join(',')});
}
for (; _i < _lastLength; _i++) {
  var _et = _doms['${it.id}_' + _i];
  _et.remove();
}
// }}

if (it.isRoot) {
  // {{
  var _lastLength = _last[${it.valueId}];
  var _et = _doms[${it.id}];
  _et.roots = {};
  for (_i = 0; _i < _lastLength; _i++) {
    _et.doms[_i] = _et.roots[_i] = _doms['${it.id}_' + _i];
  }
  // }}
}
