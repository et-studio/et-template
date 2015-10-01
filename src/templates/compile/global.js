
var requires = []
for (var i = 0, len = it.requires.length; i < len; i++) {
  var item = it.requires[i]
  requires.push(`var ${item.name} = global['${item.path}']`)
}

// {{
;(function(global){
  ${requires.join('\n')}
  var _dep = global['${it.dependency}']
  ${this.compile_template(it)}
  global.${it.moduleId} = ${it.templateName}
})(window)
// }}
