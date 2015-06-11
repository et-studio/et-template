// {{
_line = _doms.${id.lineId};
// }}
for (var i = 0; i < it.doms.length; i++) {
  var dom = it.doms[i];
  var condition = '';
  if (dom.tag !== 'else') {
    condition = `(${dom.condition})`;
  }
  // {{
  ${dom.tag} ${condition} {
    if (_last.${it.indexValueId} !== ${i}) {
      // }}
      for (var j = 0; j < dom.siblings.length; j++) {
        var sibling = dom.siblings[j];
        // {{
        var _et = doms.${sibling.id};
        if (_et) {
          _et.remove();
        }
        // }}
      }
      // {{
    }
    // }}
    if (dom.id) {
      // {{
      var _et = _doms.${dom.id};
      if (!_et) {
        _doms.${dom.id} = _et = new ${dom.templateName}();
      }
      if (_last.${it.indexValueId} !== ${i}) {
        _util.before(_line, _et.get());
      }
      _et.update(${dom.args.join(',')});
      // }}
    }
    // {{
    _last.${it.indexValueId} = ${i};
  }
  // }}
}
