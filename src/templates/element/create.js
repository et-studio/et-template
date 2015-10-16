
var nullString = 'null'
var attributesString = nullString
var propertiesString = nullString
var parentElementId = it.parentId
if (it.isRoot) parentElementId = nullString

if (!_.isEmpty(it.attributes)) {
  attributesString = JSON.stringify(it.attributes, null, 2)
}
if (!_.isEmpty(it.properties)) {
  propertiesString = JSON.stringify(it.properties, null, 2)
}

if (propertiesString !== nullString) {
  // {{
  _tp_createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}', ${attributesString}, ${propertiesString})
  // }}
} else if (attributesString !== nullString) {
  // {{
  _tp_createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}', ${attributesString})
  // }}
} else {
  // {{
  _tp_createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}')
  // }}
}

if (it.modelKey) {
  // {{
  _tp_bind(_this, ${it.id}, 'change keyup', function (e) {
    _tp_setModel(_this, '${it.modelType}', '${_.translateMarks(it.modelKey)}', e.target.value)
  })
  // }}
}
