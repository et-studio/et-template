
var parentElementId = it.parentId
if (it.isRoot) parentElementId = null
var text = it.isErratic ? '' : it.text
// {{
@.createText(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(text)}')
// }}
