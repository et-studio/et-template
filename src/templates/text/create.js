
var parentElementId = it.parentId
if (it.isRoot) parentElementId = null
var text = it.isErratic ? '' : it.text
// {{
_tp_createText(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(text)}')
// }}
