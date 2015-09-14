
var attrs = arguments[1] || []
_.each(attrs, (attr) => {
  if (attr.isErratic) {
    if (attr.isProperty) {
      // {{
      var _tmp = ${attr.valueString}
      if (@.getProperty(_elements, ${it.id}, '${_.translateMarks(attr.key)}') !== _tmp) {
        @.setProperty(_elements, ${it.id}, '${_.translateMarks(attr.key)}', _tmp)
      }
      // }}
    } else {
      // {{
      var _tmp = ${attr.valueString}
      if (_last[${attr.valueId}] !== _tmp) {
        _last[${attr.valueId}] = _tmp
        @.setAttribute(_elements, ${it.id}, '${_.translateMarks(attr.key)}', _tmp)
      }
      // }}
    }
  } else {
    if (attr.isProperty) {
      // {{
      @.setProperty(_elements, ${it.id}, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}')
      // }}
    } else {
      // {{
      @.setAttribute(_elements, ${it.id}, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}')
      // }}
    }
  }
})
