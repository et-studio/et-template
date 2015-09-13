
if (it.parentId) {
  // {{
  @.append(${it.parentId}, ${lineId})
  // }}
}
if (it.isRoot) {
  // {{
  @.setRoot(${it.lineId})
  @.setRoot(${it.id}, 0)
  // }}
}
