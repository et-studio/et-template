
if (it.isRoot) {
  // {{
  @.setRoot(${it.lineId})
  @.setRoot(${it.id}, 0)
  // }}
} else {
  // {{
  @.append(${it.parentId}, ${lineId})
  // }}
}
