
_.each(it.expressions, (expression, i) => {
  var condition = ''
  if (expression.tag !== 'else') {
    condition = `(${expression.condition})`
  }
  // {{
  ${expression.tag} ${condition} {
    if (_last[${it.valueId}] !== ${i}) {
      _last[${it.valueId}] = ${i}

      ${expression.removeList.join('\n')}
      ${expression.appendList.join('\n')}
      // }}
      if (expression.endIndex > expression.startIndex) {
        // {{
        @.after(_elements, ${it.lineId}, ${it.id})
        // }}
      }
      // {{
    }
    ${expression.updateList.join('\n')}
  }
  // }}
})
