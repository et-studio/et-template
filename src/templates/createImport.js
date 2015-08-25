// {{
var _ET = require('${_.translateMarks(it.path)}');
var _et = new _ET(this.options);
_doms[${it.id}] = _et;
// }}
if (it.isRoot) {
  // {{
  _roots[${it.id}] = _et;
  // }}
} else {
  // {{
  _util.appendChild(_doms[${it.parentId}], _et.get());
  // }}
}
