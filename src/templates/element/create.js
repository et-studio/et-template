
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
  _tp_bind(_this, ${it.id}, 'change input', function () {
    ${_.translateMarks(it.output)} = this.value
  })
  // }}
}

if (!_.isEmpty(it.outputs)) {
  // {{
  _tp_bind(_this, ${it.id}, 'change input', function () {
    // }}
    it.outputs.map((output, index, list) => {
      var name = output.propName
      var expression = output.expression
      // {{
      ${_.translateMarks(expression)} = this.${_.translateMarks(name)}
      // }}
    })
    // {{
  })
  // }}
}

if (!_.isEmpty(it.events)) {
  var eventsStringList = []
  Object.keys(it.events).map((eventName, index, list) => {
    var isLast = (list.length - 1) === index
    var event = it.events[eventName]
    var expression = event.expression
    var args = event.args
    var isJustEvent = args.every(item => item === '$event')
    var argsStrList = args.map((item, index) => {
      if (item === '$event') {
        return item
      } else {
        return `_args[${index}]`
      }
    })
    if (!args.length) {
      eventsStringList.push(`'${_.translateMarks(eventName)}': function () {
        ${expression}()
      }`)
    } else if (isJustEvent) {
      eventsStringList.push(`'${_.translateMarks(eventName)}': function ($event) {
        ${expression}(${argsStrList.join(', ')})
      }`)
    } else {
      eventsStringList.push(`'${_.translateMarks(eventName)}': function ($event) {
        var _args = _tp_getEventArguments(_this, ${it.id}, '${_.translateMarks(eventName)}')
        ${expression}(${argsStrList.join(', ')})
      }`)
    }
  })
  // {{
  _tp_bindEventsByMap(_this, ${it.id}, {
    ${eventsStringList.join(',\n')}
  })
  // }}
}
