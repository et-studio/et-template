
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

if (it.output) {
  // {{
  _tp_bind(_this, ${it.id}, 'change input', function (e) {
    var it = this
    ${_.translateMarks(it.output)} = e.target.value
  })
  // }}
}

if (!_.isEmpty(it.events)) {
  var eventsStringList = []
  Object.keys(it.events).map((key, index, list) => {
    var isLast = (list.length - 1) === index
    var event = it.events[key]
    var expression = event.expression
    var args = event.args
    eventsStringList.push(`'${_.translateMarks(key)}': [${expression}, ${args.length?true:false}] ${isLast?'':','}`)
  })
  // {{
  _tp_bindEventsByMap(_this, ${it.id}, {${eventsStringList.join('\n')}})
  // }}
}
