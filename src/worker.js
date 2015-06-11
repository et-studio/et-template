
'use strict';
class Worker {
  constructor(options) {
    this.options = options;
  }

  createComment(it) {
    var re = '';

    re = re + `
var _et = _util.createComment('${it.text}');
_doms.${it.id} = _et;
`;

    if (it.isRoot) {
      re = re + `
  _rootIds.push('${it.id}');
  _roots.${it.id} = _et;
`;
    } else {
      re = re + `
  _util.appendChild(_doms.${it.parentId}, _et);
`;
    }

    return re;
  }


  createDom(it) {
    var re = '';

    if (it.attributes) {
      re = re + `
  var _et = _util.createElement('${it.nodeName.toUpperCase()}', ${JSON.stringify(it.attributes)});
`;
    } else {
      re = re + `
  var _et = _util.createElement('${it.nodeName.toUpperCase()}'});
`;
    }

    re = re + `
_doms.${it.id} = _et;
`;

    if (it.isRoot) {
      re = re + `
  _rootIds.push('${it.id}');
  _roots.${it.id} = _et;
`;
    } else {
      re = re + `
  _util.appendChild(_doms.${it.parentId}, _et);
`;
    }

    return re;
  }


  createFor(it) {
    var re = '';

    re = re + `
var _et = new Template_for;
_doms.${it.id} = _et;
`;

    if (it.isRoot) {
      re = re + `
  _rootIds.push('${it.id}');
  _roots.${it.id} = _et;
`;
    }

    return re;
  }


  createLine(it) {
    var re = '';

    re = re + `
var _line = _util.createLine();
_doms.${it.lineId} = _line;
`;

    if (it.isRoot) {
      re = re + `
  _rootIds.push('${it.lineId}');
  _roots.${it.lineId} = _line;
`;
    } else {
      re = re + `
  _util.appendChild(_doms.${it.parentId}, _line);
`;
    }

    return re;
  }


  createNull(it) {
    var re = '';

    re = re + `
var _et = null;
_doms.${it.id} = _et;
`;

    if (it.isRoot) {
      re = re + `
  _rootIds.push('${it.id}');
  _roots.${it.id} = _et;
`;
    }

    return re;
  }


  createText(it) {
    var re = '';

    re = re + `
var _et = _util.createTextNode('${it.textContent}');
_doms.${it.id} = _et;
`;

    if (it.isRoot) {
      re = re + `
  _rootIds.push('${it.id}');
  _roots.${it.id} = _et;
`;
    } else {
      re = re + `
  _util.appendChild(_doms.${it.parentId}, _et);
`;
    }

    return re;
  }


  template(it) {
    var re = '';

    if (it.hasFor) {
      re = re + `
  function Template_for(options) {
    this.init(options);
  }
`;
    }
    for (var i = 0; i < it.newDoms.length; i++) {
      var dom = it.newDoms[i];
      re = re + `
  function ${dom.templateName}(options) {
    this.init(options);
  }
`;
    }

    if (it.hasFor) {
      re = re + `
  _util.extend(Template_for.prototype, _prototype);
`;
    }
    for (var i = 0; i < it.newDoms.length; i++) {
      var dom = it.newDoms[i];
      if (dom.createList.length && dom.updateList.length) {
        re = re + `
    _util.extend(${dom.templateName}.prototype, _prototype, {
      create: function create() {
        var _doms = this.doms;
        var _roots = this.roots;
        var _rootIds = this.rootIds;
        ${dom.createList.join('\n')}
      }${dom.updateList.length ? ',' : ''}
`;

        if (dom.updateList.length) {
          re = re + `
      update: function update(${dom.args.join(',')}) {
        var _doms = this.doms;
        var _roots = this.roots;
        var _last = this.last;
        ${dom.updateList.join('\n')}
      }
`;
        }
        re = re + `
    }
`;
      }
    }

    re = re + `
module.exports = ${it.templateName};
`;

    return re;
  }


  updateAttributes(it) {
    var re = '';

    for (var i = 0; i < it.expressions.length; i++) {
      var expression = it.expressions[i];
      if (expression.condition) {
        re = re + `
    if (${expression.condition}) {
      if (_last.${expression.valueId} !== 0) {
        _last.${expression.valueId} = 0;
`;
        for (var i = 0; i < expression.attributes.length; i++) {
          var attr1 = expression.attributes[i];
          if (attr1.isErratic) {
            re = re + `
            var _tmp = ${attr1.valueString};
            if (_last.${attr1.valueId} !== _tmp) {
              _last.${attr1.valueId} = _tmp;
              _util.setAttribute(_doms.${it.id}, '${attr1.key}', _tmp);
            }
`;
          } else {
            re = re + `
            _util.removeAttribute(_doms.${it.id}, '${attr1.key}', '${attr1.value}');
`;
          }
        }
        re = re + `
      }
    } else {
      if (_last.${expression.valueId} !== 1) {
        _last.${expression.valueId} = 1;
`;
        for (var i = 0; i < expression.attributes.length; i++) {
          var attr2 = expression.attributes[i];
          re = re + `
          _util.removeAttribute(_doms.${it.id}, '${attr2.key}');
`;
        }
        re = re + `
      }
    }
`;
      } else {
        for (var i = 0; i < expression.attributes.length; i++) {
          var attr3 = expression.attributes[i];
          if (attr3.isErratic) {
            re = re + `
        var _tmp = ${attr3.valueString};
        if (_last.${attr3.valueId} !== _tmp) {
          _last.${attr3.valueId} = _tmp;
          _util.setAttribute(_doms.${it.id}, '${attr3.key}', _tmp);
        }
`;
          } else {
            re = re + `
        _util.removeAttribute(_doms.${it.id}, '${attr3.key}', '${attr3.value}');
`;
          }
        }
      }
    }

    return re;
  }


  updateFor(it) {
    var re = '';

    re = re + `
var _line = _doms.${it.lineId};
var _lastLength = _last.${it.valueId};
var _list = ${it.expression};
var _i = 0;
var _len = _list.length;
for (; _i < _len; _i++) {
  var _et = _doms['${it.id}_' + _i];
  var _item = _list[_i];
  var ${it.indexName} = _i;
  var ${it.itemName} = _item;

  if (!_et) {
    _doms['${it.id}_' + _i] = _et = new ${it.templateName}();
  }
  if (!_lastLength || _lastLength < _i) {
    _util.before(_line, _et.get());
  }
  _et.update(${it.args.join(',')});
}

_last.${it.valueId} = _i;
for (; _i < _lastLength; _i++) {
  var _et = _doms['${it.id}_' + _i];
  _et.remove();
}
`;

    if (it.isRoot) {
      re = re + `
  var _lastLength = _last.${it.valueId};
  var _et = _doms.${it.id};
  _et.rootIds = [];
  for (_i = 0; _i < _lastLength; _i++) {
    _et.rootIds.push('${it.id}_' + _i);
    _et._doms['${it.id}_' + _i] = _doms['${it.id}_' + _i];
  }
`;
    }

    return re;
  }


  updateIf(it) {
    var re = '';
    re = re + `
_line = _doms.${id.lineId};
`;
    for (var i = 0; i < it.doms.length; i++) {
      var dom = it.doms[i];
      var condition = '';
      if (dom.tag !== 'else') {
        condition = `(${dom.condition})`;
      }
      re = re + `
  ${dom.tag} ${condition} {
    if (_last.${it.indexValueId} !== ${i}) {
`;
      for (var j = 0; j < dom.siblings.length; j++) {
        var sibling = dom.siblings[j];
        re = re + `
        var _et = doms.${sibling.id};
        if (_et) {
          _et.remove();
        }
`;
      }
      re = re + `
    }
`;
      if (dom.id) {
        re = re + `
      var _et = _doms.${dom.id};
      if (!_et) {
        _doms.${dom.id} = _et = new ${dom.templateName}();
      }
      if (_last.${it.indexValueId} !== ${i}) {
        _util.before(_line, _et.get());
      }
      _et.update(${dom.args.join(',')});
`;
      }
      re = re + `
    _last.${it.indexValueId} = ${i};
  }
`;
    }

    return re;
  }


  updateText(it) {
    var re = '';

    re = re + `
var _et = _doms.${it.id};
var _tmp = ${it.valueString};
if (_last.${it.valueId} !== _tmp) {
  _last.${it.valueId} = _tmp;
  _util.text(_et, _tmp);
}
`;

    return re;
  }

}
module.exports = Worker;
