// {{
var _ET = require('${_.translateMarks(it.path)}');
var _et = new _ET();
_doms.${it.id} = _et;
// }}
if (it.isRoot) {
  // {{
  _roots.${it.id} = _et;
  _rootIds.push('${it.id}');
  // }}
} else {
  // {{
  _util.appendChild(_doms.${it.parentId}, _et.get());
  // }}
}
