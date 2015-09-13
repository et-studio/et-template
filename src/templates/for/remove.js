
// {{
var _len = _last[${it.valueId}]
for (var _i = 0; _i < _len; _i++) {
  @.remove('${it.id}_' + _i)
}
// }}
if (it.isRoot) {
  // {{
  @.setRoot(${it.id}, _last[${it.valueId}] = 0)
  // }}
}
