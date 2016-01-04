
var parentElementId = it.parentId
if (it.isRoot) parentElementId = null
if (it.context) {
  // {{
  _tp_createTemplate(_this, ${parentElementId}, ${it.templateName}, ${it.context});
  // }}
} else {
  // {{
  _tp_createTemplate(_this, ${parentElementId}, ${it.templateName});
  // }}
}
