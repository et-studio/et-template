
var declares = it.methods.map((method) => {
  return `var ${method} = _dep.${method.substr(1)};`
})
// {{
${it.header}

${declares.join('\n')}

${it.body}
// }}
