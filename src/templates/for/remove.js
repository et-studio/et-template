
// {{
var _len = _last[${it.valueId}]
for (var _i = 0; _i < _len; _i++) {
  @.remove(_elements, '${it.id}_' + _i)
}
// }}
if (it.isRoot) {
  // {{
  @.setRoot(this, ${it.id}, _last[${it.valueId}] = 0)
  // }}
}
