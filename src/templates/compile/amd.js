
var paths = [`'${it.dependency}'`]
var variables = ['_dep']
for (var i = 0, len = it.requires.length; i < len; i++) {
  var item = it.requires[i]
  paths.push(`'${item.path}'`)
  variables.push(item.name)
}

// {{
;define('${it.moduleId}', [${paths.join(',')}], function(${variables.join(',')}){
  ${this.compile_template(it)}
  return ${it.templateName}
})
// }}
