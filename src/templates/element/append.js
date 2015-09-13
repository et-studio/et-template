if (it.isRoot) {
  // {{
  @.setRoot(${it.id})
  // }}
} else if (it.parentId) {
  // {{
  @.append(${it.parentId}, ${it.id})
  // }}
}
