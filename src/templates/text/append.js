if (it.isRoot) {
  // {{
  @.setRoot(${it.id})
  // }}
} else {
  // {{
  @.append(${it.parentId}, ${it.id})
  // }}
}
