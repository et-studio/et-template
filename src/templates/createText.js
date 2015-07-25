
// {{
var _et = _util.createTextNode('${_.translateMarks(it.text)}');
_doms.${it.id} = _et;
// }}

if (it.isRoot) {
  // {{
  _roots.${it.id} = _et;
  _rootIds.push('${it.id}');
  // }}
} else {
  // {{
  _util.appendChild(_doms.${it.parentId}, _et);
  // }}
}
