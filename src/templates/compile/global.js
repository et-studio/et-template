
var dependencies = it.dependencies || []
var requires = []
for (var i = 0, len = dependencies.length; i < len; i++) {
  var item = dependencies[i]
  requires.push(`var ${item.name} = global['${item.path}'];`)
}

// {{
;(function(global){
  ${requires.join('\n')}
  ${this.compile_template(it)}
  global['${it.moduleId}'] = ${it.templateName};
})(window);
// }}
