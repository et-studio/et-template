
if (it.attributes) {
  // {{
  var _et = _util.createElement('${_.translateMarks(it.nodeName.toUpperCase())}', ${JSON.stringify(it.attributes, null, '  ')});
  // }}
} else {
  // {{
  var _et = _util.createElement('${_.translateMarks(it.nodeName.toUpperCase())}');
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
