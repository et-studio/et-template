
var attrs = arguments[1] || []
_.each(attrs, (attr) => {
  if (attr.isErratic) {
    if (attr.isProperty) {
      // {{
      var _tmp = ${attr.valueString}
      if (_tp_getProperty(_this, ${it.id}, '${_.translateMarks(attr.key)}') !== _tmp) {
        _tp_setProperty(_this, ${it.id}, '${_.translateMarks(attr.key)}', _tmp)
      }
      // }}
    } else {
      // {{
      var _tmp = ${attr.valueString}
      if (_last[${attr.valueId}] !== _tmp) {
        _last[${attr.valueId}] = _tmp
        _tp_setAttribute(_this, ${it.id}, '${_.translateMarks(attr.key)}', _tmp)
      }
      // }}
    }
  } else {
    if (attr.isProperty) {
      // {{
      _tp_setProperty(_this, ${it.id}, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}')
      // }}
    } else {
      // {{
      _tp_setAttribute(_this, ${it.id}, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}')
      // }}
    }
  }
})
