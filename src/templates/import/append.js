if (it.isRoot) {
  // {{
  @.setRoot(this, ${it.id})
  // }}
} else {
  // {{
  @.append(_elements, ${it.parentId}, ${it.id})
  // }}
}
