
// {{
var _et = _util.createTextNode('${_.translateMarks(it.text)}');
_doms[${it.id}] = _et;
// }}

if (it.isRoot) {
  // {{
  _roots[${it.id}] = _et;
  // }}
} else {
  // {{
  _util.appendChild(_doms[${it.parentId}], _et);
  // }}
}
