
if (it.parentId) {
  // {{
  @.append(${it.parentId}, ${it.lineId})
  // }}
}
if (it.isRoot) {
  // {{
  @.setRoot(${it.lineId})
  // }}
}
