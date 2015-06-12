
if (it.erraticAttributes.length || it.expressions.length) {
  // {{
  var _et = _doms.${it.id};
  // }}
  _.each(it.erraticAttributes, (attr) => {
    if (attr.isErratic) {
      // {{
      var _tmp = ${attr.valueString};
      if (_last.${attr.valueId} !== _tmp) {
        _last.${attr.valueId} = _tmp;
        _util.setAttribute(_et, '${attr.key}', _tmp);
      }
      // }}
    }
  });

  _.each(it.expressions, (expression) => {
    // {{
    if (${expression.condition || false}) {
      if (_last.${expression.valueId} !== 0) {
        _last.${expression.valueId} = 0;
        // }}
        _.each(expression.attributes, (attr) => {
          if (!attr.isErratic) {
            // {{
            _util.setAttribute(_et, '${attr.key}', '${attr.value}');
            // }}
          }
        });
        // {{
      }
      // }}
      _.each(expression.attributes, (attr) => {
        if (attr.isErratic) {
          // {{
          var _tmp = ${attr.valueString};
          if (_last.${attr.valueId} !== _tmp) {
            _last.${attr.valueId} = _tmp;
            _util.setAttribute(_et, '${attr.key}', _tmp);
          }
          // }}
        }
      });
      // {{
    } else {
      if (_last.${expression.valueId} !== 1) {
        _last.${expression.valueId} = 1;
        // }}
        _.each(expression.attributes, (attr) => {
          // {{
          _util.removeAttribute(_et, '${attr.key}');
          // }}
        });
        // {{
      }
    }
    // }}
  });

}
