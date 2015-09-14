
// {{
switch (_last[${it.valueId}]) {
  // }}
  _.each(it.expressions, (expression, i) => {
    if (expression.removeList.length) {
      // {{
      case ${i}:
        ${expression.removeList.join('\n')}
        break
      // }}
    }
  })
  // {{
}
_last[${it.valueId}] = -1
@.remove(_elements, ${id.lindId})
// }}
if (it.isRoot) {
  // {{
  @.removeRoot(this, ${it.lindId})
  // }}
}
