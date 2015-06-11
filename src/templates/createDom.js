
if (it.attributes) {
  // {{
  var _et = _util.createElement('${it.nodeName.toUpperCase()}', ${JSON.stringify(it.attributes)});
  // }}
} else {
  // {{
  var _et = _util.createElement('${it.nodeName.toUpperCase()}'});
  // }}
}

// {{
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
