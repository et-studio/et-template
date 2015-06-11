
for (var i = 0; i < it.expressions.length; i++) {
  var expression = it.expressions[i];
  if (expression.condition) {
    // {{
    if (${expression.condition}) {
      if (_last.${expression.valueId} !== 0) {
        _last.${expression.valueId} = 0;
        // }}
        for (var i = 0; i < expression.attributes.length; i++) {
          var attr1 = expression.attributes[i];
          if (attr1.isErratic) {
            // {{
            var _tmp = ${attr1.valueString};
            if (_last.${attr1.valueId} !== _tmp) {
              _last.${attr1.valueId} = _tmp;
              _util.setAttribute(_doms.${it.id}, '${attr1.key}', _tmp);
            }
            // }}
          } else {
            // {{
            _util.removeAttribute(_doms.${it.id}, '${attr1.key}', '${attr1.value}');
            // }}
          }
        }
        // {{
      }
    } else {
      if (_last.${expression.valueId} !== 1) {
        _last.${expression.valueId} = 1;
        // }}
        for (var i = 0; i < expression.attributes.length; i++) {
          var attr2 = expression.attributes[i];
          // {{
          _util.removeAttribute(_doms.${it.id}, '${attr2.key}');
          // }}
        }
        // {{
      }
    }
    // }}
  } else {
    for (var i = 0; i < expression.attributes.length; i++) {
      var attr3 = expression.attributes[i];
      if (attr3.isErratic) {
        // {{
        var _tmp = ${attr3.valueString};
        if (_last.${attr3.valueId} !== _tmp) {
          _last.${attr3.valueId} = _tmp;
          _util.setAttribute(_doms.${it.id}, '${attr3.key}', _tmp);
        }
        // }}
      } else {
        // {{
        _util.removeAttribute(_doms.${it.id}, '${attr3.key}', '${attr3.value}');
        // }}
      }
    }
  }
}
