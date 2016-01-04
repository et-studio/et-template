
var dependencies = it.dependencies || []
var requires = []
for (var i = 0, len = dependencies.length; i < len; i++) {
  var item = dependencies[i]
  requires.push(`var ${item.name} = require('${item.path}');`)
}

// {{
;define(function(require, exports, module){
  ${requires.join('\n')}
  ${this.compile_template(it)}
  module.exports = exports['default'] = ${it.templateName};
});
// }}
