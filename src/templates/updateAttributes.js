
if (it.erraticAttributes.length || it.expressions.length) {
  // {{
  var _et = _doms[${it.id}];
  // }}
  _.each(it.erraticAttributes, (attr) => {
    if (attr.isErratic) {
      // {{
      var _tmp = ${attr.valueString};
      if (_last[${attr.valueId}] !== _tmp) {
        _last[${attr.valueId}] = _tmp;
        _util.setAttribute(_et, '${attr.key}', _tmp);
      }
      // }}
    }
  });

  _.each(it.expressions, (items) => {
    _.each(items, (item, i) => {
      var condition = '';
      if (item.tag !== 'else') {
        condition = `(${item.condition})`;
      }
      // {{
      ${item.tag} ${condition} {
        if (_last[${item.valueId}] !== ${i}) {
          _last[${item.valueId}] = ${i};
          // }}
          _.each(item.attributes, (attr) => {
            if (!attr.isErratic) {
              // {{
              _util.setAttribute(_et, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}');
              // }}
            }
          });
          if (item.exclusions && item.exclusions.length === 1) {
            // {{
            _util.removeAttribute(_et, '${_.translateMarks(item.exclusions[0])}');
            // }}
          } else if (item.exclusions && item.exclusions.length > 1) {
            var exclusions = item.exclusions.map((item) => {return `'${_.translateMarks(item)}'`})
            // {{
            _util.removeAttributes(_et, ${exclusions.join(',')});
            // }}
          }
          // {{
        }
        // }}
        _.each(item.attributes, (attr) => {
          if (attr.isErratic) {
            // {{
            var _tmp = ${attr.valueString};
            if (_last[${attr.valueId}] !== _tmp) {
              _last[${attr.valueId}] = _tmp;
              _util.setAttribute(_et, '${_.translateMarks(attr.key)}', _tmp);
            }
            // }}
          }
        });
        // {{
      }
      // }}
    })
  })
}
