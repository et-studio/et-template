
if (it.parentId) {
  // {{
  @.append(_elements, ${it.parentId}, ${it.lineId})
  // }}
}
if (it.isRoot) {
  // {{
  @.setRoot(this, ${it.lineId})
  // }}
}
