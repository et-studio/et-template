if (it.parentId) {
  // {{
  @.append(_elements, ${it.parentId}, ${it.id})
  // }}
}
if (it.isRoot) {
  // {{
  @.setRoot(this, ${it.id})
  // }}
}
