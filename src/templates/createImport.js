// {{
var _et = require('${it.path}');
_doms.${it.id} = _et;
// }}
if (it.isRoot) {
  // {{
  _roots.${it.id} = _et;
  // }}
}
// {{
_util_appendChild(_doms.${it.parentId}, _et.get());
// }}
