
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
  @.createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}', ${attributesString}, ${propertiesString})
  // }}
} else if (attributesString !== nullString) {
  // {{
  @.createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}', ${attributesString})
  // }}
} else {
  // {{
  @.createElement(_this, ${parentElementId}, ${it.id}, '${_.translateMarks(it.nodeName)}')
  // }}
}

if (it.modelKey) {
  // {{
  @.bind(_this, ${it.id}, 'change keyup', function (e) {
    // }}
    if (it.modelType === 'model') {
      // {{
      _scope.set('${_.translateMarks(it.modelKey)}', e.target.value)
      // }}
    } else if (it.modelType === 'object') {
      // {{
      _scope${it.modelKey} = e.target.value
      // }}
    } else {
      // {{
      _scope.trigger('et-model', '${_.translateMarks(it.modelKey)}', e.target.value, e)
      // }}
    }
    // {{
  })
  // }}
}
