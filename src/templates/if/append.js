
if (it.isRoot) {
  // {{
  @.setRoot(${it.lineId})
  // }}
} else {
  // {{
  @.append(${it.parentId}, ${it.lineId})
  // }}
}
