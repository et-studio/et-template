
var requires = []
for (var i = 0, len = it.dependencies.length; i < len; i++) {
  var item = it.dependencies[i]
  requires.push(`var ${item.name} = require('${item.path}')`)
}

// {{
;define(function(require, exports, module){
  ${requires.join('\n')}
  var _dep = require('${it.dependency}')
  ${this.compile_template(it)}
  module.exports = exports['default'] = ${it.templateName}
})
// }}
