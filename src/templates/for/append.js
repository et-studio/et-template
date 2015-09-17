
if (it.parentId) {
  // {{
  @.append(_elements, ${it.parentId}, ${it.lineId})
  // }}
}
if (it.isRoot) {
  // {{
  @.setRoot(this, ${it.id}, 0)
  @.setRoot(this, ${it.lineId})
  // }}
}
