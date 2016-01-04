
// {{
var _lastLength = _last[${it.valueId}] || 0;
var _list = ${it.expression} || [];

var _index = 0;
var _len = _last[${it.valueId}] = _list.length;
// }}

if (it.trackBy) {
  // {{
  ${this.for_with_track_by(it)}
  // }}
} else {
  // {{
  ${this.for_without_track_by(it)}
  // }}
}

if (it.isRoot) {
  // {{
  _tp_setRoot(this, ${it.id}, _len);
  // }}
}
