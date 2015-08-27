if (it && it.length === 1) {
  // {{
  _util.removeAttribute(_et, '${_.translateMarks(it[0])}');
  // }}
} else if (it && it.length > 1) {
  var exclusions = it.map((item) => {return `'${_.translateMarks(item)}'`})
  // {{
  _util.removeAttributes(_et, ${exclusions.join(',')});
  // }}
}
