
'use strict'
import _ from './util'
export default {

  createElement(it) {
    var re = ''
    re = re + `
var _et = _util.createElement('${_.translateMarks(it.nodeName.toUpperCase())}');
`
    if (!_.isEmpty(it.attributes)) {
      re = re + `
  _util.setAttributes(_et, ${JSON.stringify(it.attributes, null, '  ')});
`
    }
    if (!_.isEmpty(it.propertis)) {
      re = re + `
  _util.setProperties(_et, ${JSON.stringify(it.propertis, null, '  ')});
`
    }

    re = re + `
_doms[${it.id}] = _et;
`

    if (it.modelKey) {
      if (it.modelType === 'model') {
        re = re + `
    _util.on(_et, 'change keyup', function (e) {
      _scope.set('${it.modelKey}', e.target.value)
    });
`
      } else if (it.modelType === 'object') {
        re = re + `
    _util.on(_et, 'change keyup', function (e) {
      _scope${it.modelKey} = e.target.value
    });
`
      } else {
        re = re + `
    _util.on(_et, 'change keyup', function (e) {
      _scope.trigger('et-model', '${it.modelKey}', e.target.value, e)
    });
`
      }
    }

    if (it.isRoot) {
      re = re + `
  _roots[${it.id}] = _et;
`
    } else {
      re = re + `
  _util.appendChild(_doms[${it.parentId}], _et);
`
    }

    return re
  },
  createFor(it) {
    var re = ''

    re = re + `
var _et = new Template_for(this.options);
_doms[${it.id}] = _et;
`

    if (it.isRoot) {
      re = re + `
  _roots[${it.id}] = _et;
`
    }

    return re
  },
  createHtml(it) {
    var re = ''
    re = re + `
_doms[${it.parentId}].innerHTML = '${_.translateMarks(it.expression)}';
`

    return re
  },
  createImport(it) {
    var re = ''
    re = re + `
var _ET = require('${_.translateMarks(it.path)}');
var _et = new _ET(this.options);
_doms[${it.id}] = _et;
`
    if (it.isRoot) {
      re = re + `
  _roots[${it.id}] = _et;
`
    } else {
      re = re + `
  _util.appendChild(_doms[${it.parentId}], _et.get());
`
    }

    return re
  },
  createLine(it) {
    var re = ''

    re = re + `
var _line = _util.createLine();
_doms[${it.lineId}] = _line;
`

    if (it.isRoot) {
      re = re + `
  _roots[${it.lineId}] = _line;
`
    } else {
      re = re + `
  _util.appendChild(_doms[${it.parentId}], _line);
`
    }

    return re
  },
  createNull(it) {
    var re = ''

    re = re + `
_doms[${it.id}] = null;
`

    if (it.isRoot) {
      re = re + `
  _roots[${it.id}] = null;
`
    }

    return re
  },
  createText(it) {
    var re = ''

    re = re + `
var _et = _util.createTextNode('${_.translateMarks(it.text)}');
_doms[${it.id}] = _et;
`

    if (it.isRoot) {
      re = re + `
  _roots[${it.id}] = _et;
`
    } else {
      re = re + `
  _util.appendChild(_doms[${it.parentId}], _et);
`
    }

    return re
  },
  removeAttributes(it) {
    var re = ''
    if (it && it.length === 1) {
      re = re + `
  _util.removeAttribute(_et, '${_.translateMarks(it[0])}');
`
    } else if (it && it.length > 1) {
      var exclusions = it.map((item) => {
        return `'${_.translateMarks(item)}'`
      })
      re = re + `
  _util.removeAttributes(_et, ${exclusions.join(',')});
`
    }

    return re
  },
  template(it) {
    var re = ''

    re = re + `
'use strict';

var _dep = require('etDependency');
var _util = _dep._util;
var _prototype = _dep._prototype;
`

    if (it.hasFor) {
      re = re + `
  function Template_for(options) {
    this.init(options);
  }
`
    }
    _.each(it.newDoms, (dom) => {
      re = re + `
  function ${dom.templateName}(options) {
    this.init(options);
  }
`
    });

    if (it.hasFor) {
      re = re + `
  _util.extend(Template_for.prototype, _prototype);
`
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
`

        if (it.hasModelKey && (it.modelType === 'model' || it.modelType === 'object')) {
          re = re + `
          var _scope = this.options.scope
`
        } else if (it.hasModelKey) {
          re = re + `
          var _scope = this
`
        }

        re = re + `
        ${dom.createList.join('\n')}
      }${dom.updateList.length ? ',' : ''}
`

        if (dom.updateList.length) {
          re = re + `
      update: function update(${dom.args.join(',')}) {
        var _doms = this.doms;
        var _roots = this.roots;
        var _last = this.last;
        ${dom.updateList.join('\n')}
      }
`
        }
        re = re + `
    });
`
      }
    });

    re = re + `
module.exports = ${it.templateName};
`

    return re
  },
  updateAttributes(it) {
    var re = ''

    if (it.erraticAttributes.length || it.expressions.length) {
      re = re + `
  var _et = _doms[${it.id}];
  ${this.updateErraticAttributes(it.erraticAttributes)}
`

      _.each(it.expressions, (items) => {
        _.each(items, (item, i) => {
          var condition = '';
          if (item.tag !== 'else') {
            condition = `(${item.condition})`;
          }
          re = re + `
      ${item.tag} ${condition} {
        if (_last[${item.valueId}] !== ${i}) {
          _last[${item.valueId}] = ${i};
          ${this.updateResidentAttributes(item.attributes)}
          ${this.removeAttributes(item.exclusions)}
        }
        ${this.updateErraticAttributes(item.attributes)}
      }
`
        })
      })
    }

    return re
  },
  updateErraticAttributes(it) {
    var re = ''
    _.each(it, (attr) => {
      if (attr.isErratic) {
        if (attr.isProperty) {
          re = re + `
      var _tmp = ${attr.valueString};
      if (_et.${attr.key} !== _tmp) {
        _et.${attr.key} = _tmp;
      }
`
        } else {
          re = re + `
      var _tmp = ${attr.valueString};
      if (_last[${attr.valueId}] !== _tmp) {
        _last[${attr.valueId}] = _tmp;
        _util.setAttribute(_et, '${_.translateMarks(attr.key)}', _tmp);
      }
`
        }
      }
    })

    return re
  },
  updateFor(it) {
    var re = ''

    re = re + `
var _line = _doms[${it.lineId}];
var _lastLength = _last[${it.valueId}] || 0;
var _list = ${it.expression} || [];

var _i = 0;
var _len = _list.length;
_last[${it.valueId}] = _len;
for (; _i < _len; _i++) {
  var _et = _doms['${it.id}_' + _i];
  var _item = _list[_i];
  var ${it.indexName} = _i;
  var ${it.itemName} = _item;

  if (!_et) {
    _doms['${it.id}_' + _i] = _et = new ${it.templateName}(this.options);
  }
  if (_i >= _lastLength) {
    _util.after(_line, _et.get());
  }
  _et.update(${it.args.join(',')});
}
for (; _i < _lastLength; _i++) {
  var _et = _doms['${it.id}_' + _i];
  _et.remove();
}
`

    if (it.isRoot) {
      re = re + `
  var _lastLength = _last[${it.valueId}];
  var _et = _doms[${it.id}];
  _et.roots = {};
  for (_i = 0; _i < _lastLength; _i++) {
    _et.doms[_i] = _et.roots[_i] = _doms['${it.id}_' + _i];
  }
`
    }

    return re
  },
  updateHtml(it) {
    var re = ''

    re = re + `
var _et = _doms[${it.parentId}];
var _tmp = ${it.valueString};
if (_last[${it.valueId}] !== _tmp) {
  _last[${it.valueId}] = _tmp;
  _et.innerHTML = _tmp;
}
`

    return re
  },
  updateIf(it) {
    var re = ''
    re = re + `
var _line = _doms[${it.lineId}];
`
    _.each(it.doms, (dom, i) => {
      var condition = '';
      if (dom.tag !== 'else') {
        condition = `(${dom.condition})`;
      }
      re = re + `
  ${dom.tag} ${condition} {
    if (_last[${it.indexValueId}] !== ${i}) {
      _last[${it.indexValueId}] = ${i};
`
      if (dom.id) {
        re = re + `
        var _et = _doms[${dom.id}];
        if (!_et) {
          _doms[${dom.id}] = _et = new ${dom.templateName}(this.options);
        }
        _util.after(_line, _et.get());
`
        if (it.isRoot) {
          re = re + `
          _roots[${dom.id}] = _et;
`
        }
      }
      _.each(dom.siblings, (sibling) => {
        re = re + `
        var _et = _doms[${sibling.id}];
        if (_et) {
          _et.remove();
`
        if (it.isRoot) {
          re = re + `
            _roots[${sibling.id}] = null;
`
        }
        re = re + `
        }
`
      });
      re = re + `
    }
`
      if (dom.id) {
        re = re + `
      _doms[${dom.id}].update(${dom.args.join(',')});
`
      }
      re = re + `
  }
`
    });

    return re
  },
  updateImport(it) {
    var re = ''
    re = re + `
var _et = _doms[${it.id}];
_et.update(${it.args.join(', ')});
`

    return re
  },
  updateResidentAttributes(it) {
    var re = ''
    _.each(it, (attr) => {
      if (!attr.isErratic) {
        if (attr.isProperty) {
          re = re + `
      _et.${attr.key} = '${_.translateMarks(attr.value)}';
`
        } else {
          re = re + `
      _util.setAttribute(_et, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}');
`
        }
      }
    })

    return re
  },
  updateText(it) {
    var re = ''

    re = re + `
var _et = _doms[${it.id}];
var _tmp = ${it.valueString};
if (_last[${it.valueId}] !== _tmp) {
  _last[${it.valueId}] = _tmp;
  _util.text(_et, _tmp);
}
`

    return re
  }

}
