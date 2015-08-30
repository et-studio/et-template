_.each(it, (attr) => {
  if (attr.isErratic) {
    if (attr.isProperty) {
      // {{
      var _tmp = ${attr.valueString};
      if (_et.${attr.key} !== _tmp) {
        _et.${attr.key} = _tmp;
      }
      // }}
    } else {
      // {{
      var _tmp = ${attr.valueString};
      if (_last[${attr.valueId}] !== _tmp) {
        _last[${attr.valueId}] = _tmp;
        _util.setAttribute(_et, '${_.translateMarks(attr.key)}', _tmp);
      }
      // }}
    }
  }
})
