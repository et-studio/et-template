
var attrs = arguments[1] || []
if (attrs.length === 1) {
  // {{
  @.removeAttribute(${it.id}, '${_.translateMarks(attrs[0])}')
  // }}
} else if (attrs.length > 1) {
  var exclusions = attrs.map((item) => {return `'${_.translateMarks(item)}'`})
  // {{
  @.removeAttributes(${it.id}, ${exclusions.join(',')})
  // }}
}
