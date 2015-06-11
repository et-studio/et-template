
// {{
var _et = _util.createTextNode('${it.textContent}');
_doms.${it.id} = _et;
// }}

if (it.isRoot) {
  // {{
  _rootIds.push('${it.id}');
  _roots.${it.id} = _et;
  // }}
} else {
  // {{
  _util.appendChild(_doms.${it.parentId}, _et);
  // }}
}
