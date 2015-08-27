
'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

exports['default'] = {

  createElement: function createElement(it) {
    var re = '';

    if (it.attributes) {
      re = re + ('\n  var _et = _util.createElement(\'' + _util2['default'].translateMarks(it.nodeName.toUpperCase()) + '\', ' + JSON.stringify(it.attributes, null, '  ') + ');\n');
    } else {
      re = re + ('\n  var _et = _util.createElement(\'' + _util2['default'].translateMarks(it.nodeName.toUpperCase()) + '\');\n');
    }

    re = re + ('\n_doms[' + it.id + '] = _et;\n');

    if (it.modelKey) {
      if (it.modelType === 'model') {
        re = re + ('\n    _util.on(_et, \'change keyup\', function (e) {\n      _scope.set(\'' + it.modelKey + '\', e.target.value)\n    });\n');
      } else if (it.modelType === 'object') {
        re = re + ('\n    _util.on(_et, \'change keyup\', function (e) {\n      _scope' + it.modelKey + ' = e.target.value\n    });\n');
      } else {
        re = re + ('\n    _util.on(_et, \'change keyup\', function (e) {\n      _scope.trigger(\'et-model\', \'' + it.modelKey + '\', e.target.value, e)\n    });\n');
      }
    }

    if (it.isRoot) {
      re = re + ('\n  _roots[' + it.id + '] = _et;\n');
    } else {
      re = re + ('\n  _util.appendChild(_doms[' + it.parentId + '], _et);\n');
    }

    return re;
  },
  createFor: function createFor(it) {
    var re = '';

    re = re + ('\nvar _et = new Template_for(this.options);\n_doms[' + it.id + '] = _et;\n');

    if (it.isRoot) {
      re = re + ('\n  _roots[' + it.id + '] = _et;\n');
    }

    return re;
  },
  createHtml: function createHtml(it) {
    var re = '';
    re = re + ('\n_doms[' + it.parentId + '].innerHTML = \'' + _util2['default'].translateMarks(it.expression) + '\';\n');

    return re;
  },
  createImport: function createImport(it) {
    var re = '';
    re = re + ('\nvar _ET = require(\'' + _util2['default'].translateMarks(it.path) + '\');\nvar _et = new _ET(this.options);\n_doms[' + it.id + '] = _et;\n');
    if (it.isRoot) {
      re = re + ('\n  _roots[' + it.id + '] = _et;\n');
    } else {
      re = re + ('\n  _util.appendChild(_doms[' + it.parentId + '], _et.get());\n');
    }

    return re;
  },
  createLine: function createLine(it) {
    var re = '';

    re = re + ('\nvar _line = _util.createLine();\n_doms[' + it.lineId + '] = _line;\n');

    if (it.isRoot) {
      re = re + ('\n  _roots[' + it.lineId + '] = _line;\n');
    } else {
      re = re + ('\n  _util.appendChild(_doms[' + it.parentId + '], _line);\n');
    }

    return re;
  },
  createNull: function createNull(it) {
    var re = '';

    re = re + ('\n_doms[' + it.id + '] = null;\n');

    if (it.isRoot) {
      re = re + ('\n  _roots[' + it.id + '] = null;\n');
    }

    return re;
  },
  createText: function createText(it) {
    var re = '';

    re = re + ('\nvar _et = _util.createTextNode(\'' + _util2['default'].translateMarks(it.text) + '\');\n_doms[' + it.id + '] = _et;\n');

    if (it.isRoot) {
      re = re + ('\n  _roots[' + it.id + '] = _et;\n');
    } else {
      re = re + ('\n  _util.appendChild(_doms[' + it.parentId + '], _et);\n');
    }

    return re;
  },
  removeAttributes: function removeAttributes(it) {
    var re = '';
    if (it && it.length === 1) {
      re = re + ('\n  _util.removeAttribute(_et, \'' + _util2['default'].translateMarks(it[0]) + '\');\n');
    } else if (it && it.length > 1) {
      var exclusions = it.map(function (item) {
        return '\'' + _util2['default'].translateMarks(item) + '\'';
      });
      re = re + ('\n  _util.removeAttributes(_et, ' + exclusions.join(',') + ');\n');
    }

    return re;
  },
  template: function template(it) {
    var re = '';

    re = re + '\n\'use strict\';\n\nvar _dep = require(\'etDependency\');\nvar _util = _dep._util;\nvar _prototype = _dep._prototype;\n';

    if (it.hasFor) {
      re = re + '\n  function Template_for(options) {\n    this.init(options);\n  }\n';
    }
    _util2['default'].each(it.newDoms, function (dom) {
      re = re + ('\n  function ' + dom.templateName + '(options) {\n    this.init(options);\n  }\n');
    });

    if (it.hasFor) {
      re = re + '\n  _util.extend(Template_for.prototype, _prototype);\n';
    }
    _util2['default'].each(it.newDoms, function (dom) {
      if (!dom.createList.length && dom.updateList.length) {
        throw new Error('If dom has updateList, it must have createList.');
      }
      if (dom.createList.length || dom.updateList.length) {
        re = re + ('\n    _util.extend(' + dom.templateName + '.prototype, _prototype, {\n      create: function create() {\n        var _doms = this.doms;\n        var _roots = this.roots;\n');

        if (it.hasModelKey && (it.modelType === 'model' || it.modelType === 'object')) {
          re = re + '\n          var _scope = this.options.scope\n';
        } else if (it.hasModelKey) {
          re = re + '\n          var _scope = this\n';
        }

        re = re + ('\n        ' + dom.createList.join('\n') + '\n      }' + (dom.updateList.length ? ',' : '') + '\n');

        if (dom.updateList.length) {
          re = re + ('\n      update: function update(' + dom.args.join(',') + ') {\n        var _doms = this.doms;\n        var _roots = this.roots;\n        var _last = this.last;\n        ' + dom.updateList.join('\n') + '\n      }\n');
        }
        re = re + '\n    });\n';
      }
    });

    re = re + ('\nmodule.exports = ' + it.templateName + ';\n');

    return re;
  },
  updateAttributes: function updateAttributes(it) {
    var _this = this;

    var re = '';

    if (it.erraticAttributes.length || it.expressions.length) {
      re = re + ('\n  var _et = _doms[' + it.id + '];\n  ' + this.updateErraticAttributes(it.erraticAttributes) + '\n');

      _util2['default'].each(it.expressions, function (items) {
        _util2['default'].each(items, function (item, i) {
          var condition = '';
          if (item.tag !== 'else') {
            condition = '(' + item.condition + ')';
          }
          re = re + ('\n      ' + item.tag + ' ' + condition + ' {\n        if (_last[' + item.valueId + '] !== ' + i + ') {\n          _last[' + item.valueId + '] = ' + i + ';\n          ' + _this.updateResidentAttributes(item.attributes) + '\n          ' + _this.removeAttributes(item.exclusions) + '\n        }\n        ' + _this.updateErraticAttributes(item.attributes) + '\n      }\n');
        });
      });
    }

    return re;
  },
  updateErraticAttributes: function updateErraticAttributes(it) {
    var re = '';
    _util2['default'].each(it, function (attr) {
      if (attr.isErratic) {
        if (attr.isDirect) {
          re = re + ('\n      var _tmp = ' + attr.valueString + ';\n      if (_et.' + attr.key + ' !== _tmp) {\n        _et.' + attr.key + ' = _tmp;\n      }\n');
        } else {
          re = re + ('\n      var _tmp = ' + attr.valueString + ';\n      if (_last[' + attr.valueId + '] !== _tmp) {\n        _last[' + attr.valueId + '] = _tmp;\n        _util.setAttribute(_et, \'' + _util2['default'].translateMarks(attr.key) + '\', _tmp);\n      }\n');
        }
      }
    });

    return re;
  },
  updateFor: function updateFor(it) {
    var re = '';

    re = re + ('\nvar _line = _doms[' + it.lineId + '];\nvar _lastLength = _last[' + it.valueId + '] || 0;\nvar _list = ' + it.expression + ' || [];\n\nvar _i = 0;\nvar _len = _list.length;\n_last[' + it.valueId + '] = _len;\nfor (; _i < _len; _i++) {\n  var _et = _doms[\'' + it.id + '_\' + _i];\n  var _item = _list[_i];\n  var ' + it.indexName + ' = _i;\n  var ' + it.itemName + ' = _item;\n\n  if (!_et) {\n    _doms[\'' + it.id + '_\' + _i] = _et = new ' + it.templateName + '(this.options);\n  }\n  if (_i >= _lastLength) {\n    _util.after(_line, _et.get());\n  }\n  _et.update(' + it.args.join(',') + ');\n}\nfor (; _i < _lastLength; _i++) {\n  var _et = _doms[\'' + it.id + '_\' + _i];\n  _et.remove();\n}\n');

    if (it.isRoot) {
      re = re + ('\n  var _lastLength = _last[' + it.valueId + '];\n  var _et = _doms[' + it.id + '];\n  _et.roots = {};\n  for (_i = 0; _i < _lastLength; _i++) {\n    _et.doms[_i] = _et.roots[_i] = _doms[\'' + it.id + '_\' + _i];\n  }\n');
    }

    return re;
  },
  updateHtml: function updateHtml(it) {
    var re = '';

    re = re + ('\nvar _et = _doms[' + it.parentId + '];\nvar _tmp = ' + it.valueString + ';\nif (_last[' + it.valueId + '] !== _tmp) {\n  _last[' + it.valueId + '] = _tmp;\n  _et.innerHTML = _tmp;\n}\n');

    return re;
  },
  updateIf: function updateIf(it) {
    var re = '';
    re = re + ('\nvar _line = _doms[' + it.lineId + '];\n');
    _util2['default'].each(it.doms, function (dom, i) {
      var condition = '';
      if (dom.tag !== 'else') {
        condition = '(' + dom.condition + ')';
      }
      re = re + ('\n  ' + dom.tag + ' ' + condition + ' {\n    if (_last[' + it.indexValueId + '] !== ' + i + ') {\n      _last[' + it.indexValueId + '] = ' + i + ';\n');
      if (dom.id) {
        re = re + ('\n        var _et = _doms[' + dom.id + '];\n        if (!_et) {\n          _doms[' + dom.id + '] = _et = new ' + dom.templateName + '(this.options);\n        }\n        _util.after(_line, _et.get());\n');
        if (it.isRoot) {
          re = re + ('\n          _roots[' + dom.id + '] = _et;\n');
        }
      }
      _util2['default'].each(dom.siblings, function (sibling) {
        re = re + ('\n        var _et = _doms[' + sibling.id + '];\n        if (_et) {\n          _et.remove();\n');
        if (it.isRoot) {
          re = re + ('\n            _roots[' + sibling.id + '] = null;\n');
        }
        re = re + '\n        }\n';
      });
      re = re + '\n    }\n';
      if (dom.id) {
        re = re + ('\n      _doms[' + dom.id + '].update(' + dom.args.join(',') + ');\n');
      }
      re = re + '\n  }\n';
    });

    return re;
  },
  updateImport: function updateImport(it) {
    var re = '';
    re = re + ('\nvar _et = _doms[' + it.id + '];\n_et.update(' + it.args.join(', ') + ');\n');

    return re;
  },
  updateResidentAttributes: function updateResidentAttributes(it) {
    var re = '';
    _util2['default'].each(it, function (attr) {
      if (!attr.isErratic) {
        if (attr.isDirect) {
          re = re + ('\n      _et.' + attr.key + ' = \'' + _util2['default'].translateMarks(attr.value) + '\';\n');
        } else {
          re = re + ('\n      _util.setAttribute(_et, \'' + _util2['default'].translateMarks(attr.key) + '\', \'' + _util2['default'].translateMarks(attr.value) + '\');\n');
        }
      }
    });

    return re;
  },
  updateText: function updateText(it) {
    var re = '';

    re = re + ('\nvar _et = _doms[' + it.id + '];\nvar _tmp = ' + it.valueString + ';\nif (_last[' + it.valueId + '] !== _tmp) {\n  _last[' + it.valueId + '] = _tmp;\n  _util.text(_et, _tmp);\n}\n');

    return re;
  }

};
module.exports = exports['default'];