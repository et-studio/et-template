
var nullString = 'null'
var attributesString = nullString
var propertiesString = nullString

if (!_.isEmpty(it.attributes)) {
  attributesString = JSON.stringify(it.attributes, null, '  ')
}
if (!_.isEmpty(it.properties)) {
  propertiesString = JSON.stringify(it.properties, null, '  ')
}

if (propertiesString !== nullString) {
  // {{
  @.createElement(_elements, ${it.id}, '${_.translateMarks(it.nodeName)}', ${attributesString}, ${propertiesString})
  // }}
} else if (attributesString !== nullString) {
  // {{
  @.createElement(_elements, ${it.id}, '${_.translateMarks(it.nodeName)}', ${attributesString})
  // }}
} else {
  // {{
  @.createElement(_elements, ${it.id}, '${_.translateMarks(it.nodeName)}')
  // }}
}

if (it.modelKey) {
  // {{
  @.bind(this, ${it.id}, 'change keyup', function (e) {
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
