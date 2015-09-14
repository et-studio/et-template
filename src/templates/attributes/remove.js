
var attrs = arguments[1] || []
if (attrs.length === 1) {
  // {{
  @.removeAttribute(_elements, ${it.id}, '${_.translateMarks(attrs[0])}')
  // }}
} else if (attrs.length > 1) {
  var exclusions = attrs.map((item) => {return `'${_.translateMarks(item)}'`})
  // {{
  @.removeAttributes(_elements, ${it.id}, ${exclusions.join(',')})
  // }}
}
