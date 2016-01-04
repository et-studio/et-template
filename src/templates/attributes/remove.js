
var attrs = arguments[1] || []
if (attrs.length === 1) {
  // {{
  _tp_removeAttribute(_this, ${it.id}, '${_.translateMarks(attrs[0])}');
  // }}
} else if (attrs.length > 1) {
  var exclusions = attrs.map((item) => {return `'${_.translateMarks(item)}'`})
  // {{
  _tp_removeAttributes(_this, ${it.id}, ${exclusions.join(',')});
  // }}
}
