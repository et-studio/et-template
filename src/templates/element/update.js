
if (it.erraticAttributes.length || it.expressions.length) {
  // {{
  ${this.attributes_update(it, it.erraticAttributes)}
  // }}

  _.each(it.expressions, (items) => {
    _.each(items, (item, i) => {
      var condition = ''
      if (item.tag !== 'else') {
        condition = `(${item.condition})`
      }
      // {{
      ${item.tag} ${condition} {
        if (_last[${item.valueId}] !== ${i}) {
          _last[${item.valueId}] = ${i};
          ${this.attributes_update(it, item.residentAttributes)}
          ${this.attributes_remove(it, item.exclusions)}
        }
        ${this.attributes_update(it, item.erraticAttributes)}
      }
      // }}
    })
  })
}

Object.keys(it.events).map((key, index, list) => {
  var isLast = (list.length - 1) === index
  var event = it.events[key]
  var args = event.args
  var isJustEvent = args.every(item => item === '$event')
  var argsStrList = args.map((item) => {
    if (item !== '$event') {
      return item
    } else {
      return 'null'
    }
  })
  if (args.length && !isJustEvent) {
    // {{
    var _current = [${argsStrList.join(', ')}];
    var _saved = _tp_getEventArguments(_this, ${it.id}, '${_.translateMarks(key)}');
    if (!_tp_isArrayEqual(_saved, _current)) {
      _tp_saveEventArguments(_this, ${it.id}, '${_.translateMarks(key)}', _current);
    }
    // }}
  }
})
