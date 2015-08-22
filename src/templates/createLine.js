
// {{
var _line = _util.createLine();
_doms[${it.lineId}] = _line;
// }}

if (it.isRoot) {
  // {{
  _roots[${it.lineId}] = _line;
  // }}
} else {
  // {{
  _util.appendChild(_doms[${it.parentId}], _line);
  // }}
}
