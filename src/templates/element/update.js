
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
          _last[${item.valueId}] = ${i}
          ${this.attributes_update(it, item.residentAttributes)}
          ${this.attributes_remove(it, item.exclusions)}
        }
        ${this.attributes_update(it, item.erraticAttributes)}
      }
      // }}
    })
  })
}
