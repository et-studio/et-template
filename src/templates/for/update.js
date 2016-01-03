
// {{
var _lastLength = _last[${it.valueId}] || 0
var _list = ${it.expression} || []

var _index = 0
var _len = _last[${it.valueId}] = _list.length
for (; _index < _len; _index++) {
  var ${it.indexName} = _index
  var ${it.itemName} = _list[_index]
  // }}

  if (!it.trackBy) {
    // {{
    ${this.for_without_track_by(it)}
    // }}
  } else {
    // {{
    ${this.for_with_track_by(it)}
    // }}
  }

  // {{
  _template.update(${it.args.join(', ')})
}
for (; _index < _lastLength; _index++) {
  _tp_remove(_this, '${it.id}_' + _index)
}
// }}

if (it.isRoot) {
  // {{
  _tp_setRoot(this, ${it.id}, _len)
  // }}
}
