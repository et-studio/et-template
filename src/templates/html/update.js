
if (!it.isErratic) return ''
// {{
var _tmp = ${it.valueString}
if (_last[${it.valueId}] !== _tmp) {
  _last[${it.valueId}] = _tmp
  @.html(_this, ${it.parentId}, _tmp)
}
// }}
