
if (it.attributes) {
  // {{
  var _et = _util.createElement('${_.translateMarks(it.nodeName.toUpperCase())}', ${JSON.stringify(it.attributes, null, '  ')});
  // }}
} else {
  // {{
  var _et = _util.createElement('${_.translateMarks(it.nodeName.toUpperCase())}');
  // }}
}

// {{
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
