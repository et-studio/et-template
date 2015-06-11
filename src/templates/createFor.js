
// {{
var _et = new Template_for;
_doms.${it.id} = _et;
// }}

if (it.isRoot) {
  // {{
  _rootIds.push('${it.id}');
  _roots.${it.id} = _et;
  // }}
}
