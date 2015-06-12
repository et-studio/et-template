
// {{
var _line = _util.createLine();
_doms.${it.lineId} = _line;
// }}

if (it.isRoot) {
  // {{
  _roots.${it.lineId} = _line;
  _rootIds.push('${it.lineId}');
  // }}
} else {
  // {{
  _util.appendChild(_doms.${it.parentId}, _line);
  // }}
}
