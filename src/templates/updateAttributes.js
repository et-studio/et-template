
if (it.erraticAttributes.length || it.expressions.length) {
  // {{
  var _et = _doms[${it.id}];
  ${this.updateErraticAttributes(it.erraticAttributes)}
  // }}

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
          ${this.updateResidentAttributes(item.attributes)}
          ${this.removeAttributes(item.exclusions)}
        }
        ${this.updateErraticAttributes(item.attributes)}
      }
      // }}
    })
  })
}
