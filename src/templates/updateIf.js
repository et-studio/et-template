// {{
var _line = _doms.${it.lineId};
// }}
_.each(it.doms, (dom, i) => {
  var condition = '';
  if (dom.tag !== 'else') {
    condition = `(${dom.condition})`;
  }
  // {{
  ${dom.tag} ${condition} {
    if (_last.${it.indexValueId} !== ${i}) {
      _last.${it.indexValueId} = ${i};
      // }}
      if (dom.id) {
        // {{
        var _et = _doms.${dom.id};
        if (!_et) {
          _doms.${dom.id} = _et = new ${dom.templateName}();
        }
        _util.before(_line, _et.get());
        // }}
        if (it.isRoot) {
          // {{
          _roots.${dom.id} = _et;
          // }}
        }
      }
      _.each(dom.siblings, (sibling) => {
        // {{
        var _et = _doms.${sibling.id};
        if (_et) {
          _et.remove();
          // }}
          if (it.isRoot) {
            // {{
            _roots.${sibling.id} = null;
            // }}
          }
          // {{
        }
        // }}
      });
      // {{
    }
    // }}
    if (dom.id) {
      // {{
      _doms.${dom.id}.update(${dom.args.join(',')});
      // }}
    }
    // {{
  }
  // }}
});
