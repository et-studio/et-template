
var ids = it.moduleIds.map((item) => {
  return `'${item}'`
})
// {{
define('${it.moduleId}', [${ids.join(',')}], function([${it.moduleIds.join(',')}]){
  var module = {}
  ${it.content}
  return module.exports
})
// }}
