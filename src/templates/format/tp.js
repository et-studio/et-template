
var declares = it.methods.map((method) => {
  return `var _tp_${method} = _dep.tp_${method}`
})
// {{
${it.header}

${declares.join('\n')}

${it.body}
// }}
