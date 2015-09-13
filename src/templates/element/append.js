if (it.parentId) {
  // {{
  @.append(${it.parentId}, ${it.id})
  // }}
}
if (it.isRoot) {
  // {{
  @.setRoot(${it.id})
  // }}
}
