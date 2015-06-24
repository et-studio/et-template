
'use strict';
var _ = require('./util');
var worker = {

  createComment(it) {
    var re = '';

    re = re + `
var _et = _util.createComment('${it.text}');
_doms.${it.id} = _et;
`;

    if (it.isRoot) {
      re = re + `
  _roots.${it.id} = _et;
  _rootIds.push('${it.id}');
`;
    } else {
      re = re + `
  _util.appendChild(_doms.${it.parentId}, _et);
`;
    }

    return re;
  },
  createElement(it) {
    var re = '';

    if (it.attributes) {
      re = re + `
  var _et = _util.createElement('${it.nodeName.toUpperCase()}', ${JSON.stringify(it.attributes)});
`;
    } else {
      re = re + `
  var _et = _util.createElement('${it.nodeName.toUpperCase()}');
`;
    }

    re = re + `
_doms.${it.id} = _et;
`;

    if (it.isRoot) {
      re = re + `
  _roots.${it.id} = _et;
  _rootIds.push('${it.id}');
`;
    } else {
      re = re + `
  _util.appendChild(_doms.${it.parentId}, _et);
`;
    }

    return re;
  },
  createFor(it) {
    var re = '';

    re = re + `
var _et = new Template_for();
_doms.${it.id} = _et;
`;

    if (it.isRoot) {
      re = re + `
  _roots.${it.id} = _et;
  _rootIds.push('${it.id}');
`;
    }

    return re;
  },
  createLine(it) {
    var re = '';

    re = re + `
var _line = _util.createLine();
_doms.${it.lineId} = _line;
`;

    if (it.isRoot) {
      re = re + `
  _roots.${it.lineId} = _line;
  _rootIds.push('${it.lineId}');
`;
    } else {
      re = re + `
  _util.appendChild(_doms.${it.parentId}, _line);
`;
    }

    return re;
  },
  createNull(it) {
    var re = '';

    re = re + `
var _et = null;
_doms.${it.id} = _et;
`;

    if (it.isRoot) {
      re = re + `
  _roots.${it.id} = _et;
  _rootIds.push('${it.id}');
`;
    }

    return re;
  },
  createText(it) {
    var re = '';

    re = re + `
var _et = _util.createTextNode('${it.text}');
_doms.${it.id} = _et;
`;

    if (it.isRoot) {
      re = re + `
  _roots.${it.id} = _et;
  _rootIds.push('${it.id}');
`;
    } else {
      re = re + `
  _util.appendChild(_doms.${it.parentId}, _et);
`;
    }

    return re;
  },
  template(it) {
    var re = '';

    re = re + `
var _et = require('_et');
var _util = _et._util;
var _prototype = _et._prototype;
`;

    if (it.hasFor) {
      re = re + `
  function Template_for(options) {
    this.init(options);
  }
`;
    }
    _.each(it.newDoms, (dom) => {
      re = re + `
  function ${dom.templateName}(options) {
    this.init(options);
  }
`;
    });

    if (it.hasFor) {
      re = re + `
  _util.extend(Template_for.prototype, _prototype);
`;
    }
    _.each(it.newDoms, (dom) => {
      if (!dom.createList.length && dom.updateList.length) {
        throw new Error('If dom has updateList, it must have createList.');
      }
      if (dom.createList.length || dom.updateList.length) {
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
    });
`;
      }
    });

    re = re + `
module.exports = ${it.templateName};
`;

    return re;
  },
  updateAttributes(it) {
    var re = '';

    if (it.erraticAttributes.length || it.expressions.length) {
      re = re + `
  var _et = _doms.${it.id};
`;
      _.each(it.erraticAttributes, (attr) => {
        if (attr.isErratic) {
          re = re + `
      var _tmp = ${attr.valueString};
      if (_last.${attr.valueId} !== _tmp) {
        _last.${attr.valueId} = _tmp;
        _util.setAttribute(_et, '${attr.key}', _tmp);
      }
`;
        }
      });

      _.each(it.expressions, (expression) => {
        re = re + `
    if (${expression.condition || false}) {
      if (_last.${expression.valueId} !== 0) {
        _last.${expression.valueId} = 0;
`;
        _.each(expression.attributes, (attr) => {
          if (!attr.isErratic) {
            re = re + `
            _util.setAttribute(_et, '${attr.key}', '${attr.value}');
`;
          }
        });
        re = re + `
      }
`;
        _.each(expression.attributes, (attr) => {
          if (attr.isErratic) {
            re = re + `
          var _tmp = ${attr.valueString};
          if (_last.${attr.valueId} !== _tmp) {
            _last.${attr.valueId} = _tmp;
            _util.setAttribute(_et, '${attr.key}', _tmp);
          }
`;
          }
        });
        re = re + `
    } else {
      if (_last.${expression.valueId} !== 1) {
        _last.${expression.valueId} = 1;
`;
        _.each(expression.attributes, (attr) => {
          re = re + `
          _util.removeAttribute(_et, '${attr.key}');
`;
        });
        re = re + `
      }
    }
`;
      });

    }

    return re;
  },
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
    _et.doms['${it.id}_' + _i] = _doms['${it.id}_' + _i];
  }
`;
    }

    return re;
  },
  updateIf(it) {
    var re = '';
    re = re + `
var _line = _doms.${it.lineId};
`;
    _.each(it.doms, (dom, i) => {
      var condition = '';
      if (dom.tag !== 'else') {
        condition = `(${dom.condition})`;
      }
      re = re + `
  ${dom.tag} ${condition} {
    if (_last.${it.indexValueId} !== ${i}) {
      _last.${it.indexValueId} = ${i};
`;
      if (dom.id) {
        re = re + `
        var _et = _doms.${dom.id};
        if (!_et) {
          _doms.${dom.id} = _et = new ${dom.templateName}();
        }
        _util.before(_line, _et.get());
`;
        if (it.isRoot) {
          re = re + `
          _roots.${dom.id} = _et;
`;
        }
      }
      _.each(dom.siblings, (sibling) => {
        re = re + `
        var _et = _doms.${sibling.id};
        if (_et) {
          _et.remove();
`;
        if (it.isRoot) {
          re = re + `
            _roots.${sibling.id} = null;
`;
        }
        re = re + `
        }
`;
      });
      re = re + `
    }
`;
      if (dom.id) {
        re = re + `
      _doms.${dom.id}.update(${dom.args.join(',')});
`;
      }
      re = re + `
  }
`;
    });

    return re;
  },
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
module.exports = worker;
