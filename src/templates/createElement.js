// {{
var _et = _util.createElement('${_.translateMarks(it.nodeName.toUpperCase())}');
// }}
if (!_.isEmpty(it.attributes)) {
  // {{
  _util.setAttributes(_et, ${JSON.stringify(it.attributes, null, '  ')});
  // }}
}
if (!_.isEmpty(it.propertis)) {
  // {{
  _util.setProperties(_et, ${JSON.stringify(it.propertis, null, '  ')});
  // }}
}

// {{
_doms[${it.id}] = _et;
// }}

if (it.modelKey) {
  if (it.modelType === 'model') {
    // {{
    _util.on(_et, 'change keyup', function (e) {
      _scope.set('${it.modelKey}', e.target.value)
    });
    // }}
  } else if (it.modelType === 'object') {
    // {{
    _util.on(_et, 'change keyup', function (e) {
      _scope${it.modelKey} = e.target.value
    });
    // }}
  } else {
    // {{
    _util.on(_et, 'change keyup', function (e) {
      _scope.trigger('et-model', '${it.modelKey}', e.target.value, e)
    });
    // }}
  }
}

if (it.isRoot) {
  // {{
  _roots[${it.id}] = _et;
  // }}
} else {
  // {{
  _util.appendChild(_doms[${it.parentId}], _et);
  // }}
}
