
'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

exports['default'] = {

  createComment: function createComment(it) {
    var re = '';

    re = re + ('\nvar _et = _util.createComment(\'' + it.text + '\');\n_doms.' + it.id + ' = _et;\n');

    if (it.isRoot) {
      re = re + ('\n  _roots.' + it.id + ' = _et;\n  _rootIds.push(\'' + it.id + '\');\n');
    } else {
      re = re + ('\n  _util.appendChild(_doms.' + it.parentId + ', _et);\n');
    }

    return re;
  },
  createElement: function createElement(it) {
    var re = '';

    if (it.attributes) {
      re = re + ('\n  var _et = _util.createElement(\'' + it.nodeName.toUpperCase() + '\', ' + _util2['default'].stringify(it.attributes) + ');\n');
    } else {
      re = re + ('\n  var _et = _util.createElement(\'' + it.nodeName.toUpperCase() + '\');\n');
    }

    re = re + ('\n_doms.' + it.id + ' = _et;\n');

    if (it.isRoot) {
      re = re + ('\n  _roots.' + it.id + ' = _et;\n  _rootIds.push(\'' + it.id + '\');\n');
    } else {
      re = re + ('\n  _util.appendChild(_doms.' + it.parentId + ', _et);\n');
    }

    return re;
  },
  createFor: function createFor(it) {
    var re = '';

    re = re + ('\nvar _et = new Template_for();\n_doms.' + it.id + ' = _et;\n');

    if (it.isRoot) {
      re = re + ('\n  _roots.' + it.id + ' = _et;\n  _rootIds.push(\'' + it.id + '\');\n');
    }

    return re;
  },
  createHtml: function createHtml(it) {
    var re = '';
    re = re + ('\n_doms.' + it.parentId + '.innerHTML = \'' + it.expression + '\';\n');

    return re;
  },
  createLine: function createLine(it) {
    var re = '';

    re = re + ('\nvar _line = _util.createLine();\n_doms.' + it.lineId + ' = _line;\n');

    if (it.isRoot) {
      re = re + ('\n  _roots.' + it.lineId + ' = _line;\n  _rootIds.push(\'' + it.lineId + '\');\n');
    } else {
      re = re + ('\n  _util.appendChild(_doms.' + it.parentId + ', _line);\n');
    }

    return re;
  },
  createNull: function createNull(it) {
    var re = '';

    re = re + ('\n_doms.' + it.id + ' = null;\n');

    if (it.isRoot) {
      re = re + ('\n  _roots.' + it.id + ' = null;\n  _rootIds.push(\'' + it.id + '\');\n');
    }

    return re;
  },
  createText: function createText(it) {
    var re = '';

    re = re + ('\nvar _et = _util.createTextNode(\'' + it.text + '\');\n_doms.' + it.id + ' = _et;\n');

    if (it.isRoot) {
      re = re + ('\n  _roots.' + it.id + ' = _et;\n  _rootIds.push(\'' + it.id + '\');\n');
    } else {
      re = re + ('\n  _util.appendChild(_doms.' + it.parentId + ', _et);\n');
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
        re = re + ('\n    _util.extend(' + dom.templateName + '.prototype, _prototype, {\n      create: function create() {\n        var _doms = this.doms;\n        var _roots = this.roots;\n        var _rootIds = this.rootIds;\n        ' + dom.createList.join('\n') + '\n      }' + (dom.updateList.length ? ',' : '') + '\n');

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
    var re = '';

    if (it.erraticAttributes.length || it.expressions.length) {
      re = re + ('\n  var _et = _doms.' + it.id + ';\n');
      _util2['default'].each(it.erraticAttributes, function (attr) {
        if (attr.isErratic) {
          re = re + ('\n      var _tmp = ' + attr.valueString + ';\n      if (_last.' + attr.valueId + ' !== _tmp) {\n        _last.' + attr.valueId + ' = _tmp;\n        _util.setAttribute(_et, \'' + attr.key + '\', _tmp);\n      }\n');
        }
      });

      _util2['default'].each(it.expressions, function (expression) {
        re = re + ('\n    if (' + (expression.condition || false) + ') {\n      if (_last.' + expression.valueId + ' !== 0) {\n        _last.' + expression.valueId + ' = 0;\n');
        _util2['default'].each(expression.attributes, function (attr) {
          if (!attr.isErratic) {
            re = re + ('\n            _util.setAttribute(_et, \'' + attr.key + '\', \'' + attr.value + '\');\n');
          }
        });
        re = re + '\n      }\n';
        _util2['default'].each(expression.attributes, function (attr) {
          if (attr.isErratic) {
            re = re + ('\n          var _tmp = ' + attr.valueString + ';\n          if (_last.' + attr.valueId + ' !== _tmp) {\n            _last.' + attr.valueId + ' = _tmp;\n            _util.setAttribute(_et, \'' + attr.key + '\', _tmp);\n          }\n');
          }
        });
        re = re + ('\n    } else {\n      if (_last.' + expression.valueId + ' !== 1) {\n        _last.' + expression.valueId + ' = 1;\n');
        _util2['default'].each(expression.attributes, function (attr) {
          re = re + ('\n          _util.removeAttribute(_et, \'' + attr.key + '\');\n');
        });
        re = re + '\n      }\n    }\n';
      });
    }

    return re;
  },
  updateFor: function updateFor(it) {
    var re = '';

    re = re + ('\nvar _line = _doms.' + it.lineId + ';\nvar _lastLength = _last.' + it.valueId + ';\nvar _list = ' + it.expression + ';\nvar _i = 0;\nvar _len = _list.length;\nfor (; _i < _len; _i++) {\n  var _et = _doms[\'' + it.id + '_\' + _i];\n  var _item = _list[_i];\n  var ' + it.indexName + ' = _i;\n  var ' + it.itemName + ' = _item;\n\n  if (!_et) {\n    _doms[\'' + it.id + '_\' + _i] = _et = new ' + it.templateName + '();\n  }\n  if (!_lastLength || _lastLength < _i) {\n    _util.before(_line, _et.get());\n  }\n  _et.update(' + it.args.join(',') + ');\n}\n\n_last.' + it.valueId + ' = _i;\nfor (; _i < _lastLength; _i++) {\n  var _et = _doms[\'' + it.id + '_\' + _i];\n  _et.remove();\n}\n');

    if (it.isRoot) {
      re = re + ('\n  var _lastLength = _last.' + it.valueId + ';\n  var _et = _doms.' + it.id + ';\n  _et.rootIds = [];\n  for (_i = 0; _i < _lastLength; _i++) {\n    _et.rootIds.push(\'' + it.id + '_\' + _i);\n    _et.doms[\'' + it.id + '_\' + _i] = _doms[\'' + it.id + '_\' + _i];\n  }\n');
    }

    return re;
  },
  updateHtml: function updateHtml(it) {
    var re = '';

    re = re + ('\nvar _et = _doms.' + it.parentId + ';\nvar _tmp = ' + it.valueString + ';\nif (_last.' + it.valueId + ' !== _tmp) {\n  _last.' + it.valueId + ' = _tmp;\n  _et.innerHTML = _tmp;\n}\n');

    return re;
  },
  updateIf: function updateIf(it) {
    var re = '';
    re = re + ('\nvar _line = _doms.' + it.lineId + ';\n');
    _util2['default'].each(it.doms, function (dom, i) {
      var condition = '';
      if (dom.tag !== 'else') {
        condition = '(' + dom.condition + ')';
      }
      re = re + ('\n  ' + dom.tag + ' ' + condition + ' {\n    if (_last.' + it.indexValueId + ' !== ' + i + ') {\n      _last.' + it.indexValueId + ' = ' + i + ';\n');
      if (dom.id) {
        re = re + ('\n        var _et = _doms.' + dom.id + ';\n        if (!_et) {\n          _doms.' + dom.id + ' = _et = new ' + dom.templateName + '();\n        }\n        _util.before(_line, _et.get());\n');
        if (it.isRoot) {
          re = re + ('\n          _roots.' + dom.id + ' = _et;\n');
        }
      }
      _util2['default'].each(dom.siblings, function (sibling) {
        re = re + ('\n        var _et = _doms.' + sibling.id + ';\n        if (_et) {\n          _et.remove();\n');
        if (it.isRoot) {
          re = re + ('\n            _roots.' + sibling.id + ' = null;\n');
        }
        re = re + '\n        }\n';
      });
      re = re + '\n    }\n';
      if (dom.id) {
        re = re + ('\n      _doms.' + dom.id + '.update(' + dom.args.join(',') + ');\n');
      }
      re = re + '\n  }\n';
    });

    return re;
  },
  updateText: function updateText(it) {
    var re = '';

    re = re + ('\nvar _et = _doms.' + it.id + ';\nvar _tmp = ' + it.valueString + ';\nif (_last.' + it.valueId + ' !== _tmp) {\n  _last.' + it.valueId + ' = _tmp;\n  _util.text(_et, _tmp);\n}\n');

    return re;
  }

};
module.exports = exports['default'];