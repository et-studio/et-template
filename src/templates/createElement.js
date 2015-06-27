
if (it.attributes) {
  // {{
  var _et = _util.createElement('${it.nodeName.toUpperCase()}', ${_.stringify(it.attributes)});
  // }}
} else {
  // {{
  var _et = _util.createElement('${it.nodeName.toUpperCase()}');
  // }}
}

// {{
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
