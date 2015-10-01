
var requires = []
for (var i = 0, len = it.requires.length; i < len; i++) {
  var item = it.requires[i]
  requires.push(`var ${item.name} = require('${item.path}')`)
}

// {{
'use strict'

${requires.join('\n')}
var _dep = require('${it.dependency}')
${this.compile_template(it)}
module.exports = exports['default'] = ${it.templateName}
// }}
