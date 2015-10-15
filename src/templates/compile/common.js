
var requires = []
for (var i = 0, len = it.dependencies.length; i < len; i++) {
  var item = it.dependencies[i]
  requires.push(`var ${item.name} = require('${item.path}')`)
}

// {{
'use strict'

${requires.join('\n')}
${this.compile_template(it)}
module.exports = exports['default'] = ${it.templateName}
// }}
