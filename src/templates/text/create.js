
var parentElementId = it.parentId
if (it.isRoot) parentElementId = null
// {{
@.createText(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.text)}')
// }}
