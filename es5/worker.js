
'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

exports['default'] = {

  attributes_remove: function attributes_remove(it) {
    var re = '';

    var attrs = arguments[1] || [];
    if (attrs.length === 1) {
      re = re + ('\n  @.removeAttribute(' + it.id + ', \'' + _util2['default'].translateMarks(attrs[0]) + '\')\n');
    } else if (attrs.length > 1) {
      var exclusions = attrs.map(function (item) {
        return '\'' + _util2['default'].translateMarks(item) + '\'';
      });
      re = re + ('\n  @.removeAttributes(' + it.id + ', ' + exclusions.join(',') + ')\n');
    }

    return re;
  },
  attributes_update: function attributes_update(it) {
    var re = '';

    var attrs = arguments[1] || [];
    _util2['default'].each(attrs, function (attr) {
      if (attr.isErratic) {
        if (attr.isProperty) {
          re = re + ('\n      var _tmp = ' + attr.valueString + '\n      if (@.getProperty(' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\') !== _tmp) {\n        @.setProperty(' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', tmp)\n      }\n');
        } else {
          re = re + ('\n      var _tmp = ' + attr.valueString + '\n      if (_last[' + attr.valueId + '] !== _tmp) {\n        _last[' + attr.valueId + '] = _tmp\n        @.setAttribute(' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', _tmp)\n      }\n');
        }
      } else {
        if (attr.isProperty) {
          re = re + ('\n      @.setProperty(' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', \'' + _util2['default'].translateMarks(attr.value) + '\')\n');
        } else {
          re = re + ('\n      @.setAttribute(' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', \'' + _util2['default'].translateMarks(attr.value) + '\')\n');
        }
      }
    });

    return re;
  },
  element_append: function element_append(it) {
    var re = '';
    if (it.parentId) {
      re = re + ('\n  @.append(' + it.parentId + ', ' + it.id + ')\n');
    }
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(' + it.id + ')\n');
    }

    return re;
  },
  element_create: function element_create(it) {
    var re = '';

    var nullString = 'null';
    var attributesString = nullString;
    var propertiesString = nullString;

    if (!_util2['default'].isEmpty(it.attributes)) {
      attributesString = JSON.stringify(it.attributes, null, '  ');
    }
    if (!_util2['default'].isEmpty(it.properties)) {
      propertiesString = JSON.stringify(it.properties, null, '  ');
    }

    if (propertiesString !== nullString) {
      re = re + ('\n  @.createElement(' + it.id + ', \'' + _util2['default'].translateMarks(it.nodeName) + '\', ' + attributesString + ', ' + propertiesString + ')\n');
    } else if (attributesString !== nullString) {
      re = re + ('\n  @.createElement(' + it.id + ', \'' + _util2['default'].translateMarks(it.nodeName) + '\', ' + attributesString + ')\n');
    } else {
      re = re + ('\n  @.createElement(' + it.id + ', \'' + _util2['default'].translateMarks(it.nodeName) + '\')\n');
    }

    if (it.modelKey) {
      re = re + ('\n  @.bind(' + it.id + ', \'change keyup\', function (e) {\n');
      if (it.modelType === 'model') {
        re = re + ('\n      _scope.set(\'' + _util2['default'].translateMarks(it.modelKey) + '\', e.target.value)\n');
      } else if (it.modelType === 'object') {
        re = re + ('\n      _scope' + it.modelKey + ' = e.target.value\n');
      } else {
        re = re + ('\n      _scope.trigger(\'et-model\', \'' + _util2['default'].translateMarks(it.modelKey) + '\', e.target.value, e)\n');
      }
      re = re + '\n  })\n';
    }

    return re;
  },
  element_remove: function element_remove(it) {
    var re = '';

    re = re + ('\n@.remove(' + it.id + ')\n');
    if (it.isRoot) {
      re = re + ('\n  @.removeRoot(' + it.id + ')\n');
    }

    return re;
  },
  element_update: function element_update(it) {
    var _this = this;

    var re = '';

    if (it.erraticAttributes.length || it.expressions.length) {
      re = re + ('\n  ' + this.attributes_update(it, it.erraticAttributes) + '\n');

      _util2['default'].each(it.expressions, function (items) {
        _util2['default'].each(items, function (item, i) {
          var condition = '';
          if (item.tag !== 'else') {
            condition = '(' + item.condition + ')';
          }
          re = re + ('\n      ' + item.tag + ' ' + condition + ' {\n        if (_last[' + item.valueId + '] !== ' + i + ') {\n          _last[' + item.valueId + '] = ' + i + '\n          ' + _this.attributes_update(it, item.residentAttributes) + '\n          ' + _this.attributes_remove(it, item.exclusions) + '\n        }\n        ' + _this.attributes_update(it, item.erraticAttributes) + '\n      }\n');
        });
      });
    }

    return re;
  },
  for_append: function for_append(it) {
    var re = '';

    if (it.parentId) {
      re = re + ('\n  @.append(' + it.parentId + ', ' + lineId + ')\n');
    }
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(' + it.lineId + ')\n  @.setRoot(' + it.id + ', 0)\n');
    }

    return re;
  },
  for_create: function for_create(it) {
    var re = '';

    re = re + ('\n@.craeteLine(' + it.lineId + ')\n@.craeteFragment(' + it.id + ')\n');

    return re;
  },
  for_remove: function for_remove(it) {
    var re = '';

    re = re + ('\nvar _len = _last[' + it.valueId + ']\nfor (var _i = 0; _i < _len; _i++) {\n  @.remove(\'' + it.id + '_\' + _i)\n}\n');
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(' + it.id + ', _last[' + it.valueId + '] = 0)\n');
    }

    return re;
  },
  for_update: function for_update(it) {
    var re = '';

    re = re + ('\nvar _lastLength = _last[' + it.valueId + '] || 0\nvar _list = ' + it.expression + ' || []\n\nvar _index = 0\nvar _len = _last[' + it.valueId + '] = _list.length\nfor (; _index < _len; _index++) {\n  var ' + it.indexName + ' = _index\n  var ' + it.itemName + ' = _list[_index]\n\n  var _template = @.getTemplate(\'' + it.id + '_\' + _index, ' + it.templateName + ')\n  if (_index >= _lastLength) {\n    @.append(' + it.id + ', \'' + it.id + '_\' + _index)\n  }\n  _template.update(' + it.args.join(', ') + ')\n}\nfor (; _index < _lastLength; _index++) {\n  @.remove(\'' + it.id + '_\' + _index)\n}\n@.after(' + it.lineId + ', ' + it.id + ')\n');

    if (it.isRoot) {
      re = re + ('\n  @.setRoot(' + it.id + ', _len)\n');
    }

    return re;
  },
  format_amd: function format_amd(it) {
    var re = '';

    var ids = it.moduleIds.map(function (item) {
      return '\'' + item + '\'';
    });
    re = re + ('\ndefine(\'' + it.moduleId + '\', [' + ids.join(',') + '], function([' + it.moduleIds.join(',') + ']){\n  var module = {}\n  ' + it.content + '\n  return module.exports\n})\n');

    return re;
  },
  format_cmd: function format_cmd(it) {
    var re = '';

    re = re + ('\ndefine(function(require, exports, module){\n  ' + it.content + '\n})\n');

    return re;
  },
  format_global: function format_global(it) {
    var re = '';

    re = re + ('\n(function(global){\n  var module = {}\n  ' + it.content + '\n  global.' + it.moduleId + ' = module.exports\n})(window)\n');

    return re;
  },
  format_tp: function format_tp(it) {
    var re = '';

    var declares = it.methods.map(function (method) {
      return 'var _tp_' + method + ' = _dep.tp_' + method;
    });
    re = re + ('\n' + it.header + '\n\n' + declares.join('\n') + '\n\n' + it.body + '\n');

    return re;
  },
  html_create: function html_create(it) {
    var re = '';

    re = re + ('\n@.html(' + it.parentId + ', \'' + _util2['default'].translateMarks(it.expression) + '\')\n');

    return re;
  },
  html_update: function html_update(it) {
    var re = '';

    re = re + ('\nvar _tmp = ' + it.valueString + '\nif (_last[' + it.valueId + '] !== _tmp) {\n  _last[' + it.valueId + '] = _tmp\n  @.html(' + it.parentId + ', _tmp)\n}\n');

    return re;
  },
  if_append: function if_append(it) {
    var re = '';

    if (it.parentId) {
      re = re + ('\n  @.append(' + it.parentId + ', ' + it.lineId + ')\n');
    }
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(' + it.lineId + ')\n');
    }

    return re;
  },
  if_create: function if_create(it) {
    var re = '';

    re = re + ('\n@.createLine(' + it.lineId + ')\n@.createFragment(' + it.id + ')\n');

    return re;
  },
  if_remove: function if_remove(it) {
    var re = '';

    re = re + ('\nswitch (_last[' + it.valueId + ']) {\n');
    _util2['default'].each(it.expressions, function (expression, i) {
      if (expression.removeList.length) {
        re = re + ('\n      case ' + i + ':\n        ' + expression.removeList.join('\n') + '\n        break\n');
      }
    });
    re = re + ('\n}\n_last[' + it.valueId + '] = -1\n@.remove(' + id.lindId + ')\n');
    if (it.isRoot) {
      re = re + ('\n  @.removeRoot(' + it.lindId + ')\n');
    }

    return re;
  },
  if_update: function if_update(it) {
    var re = '';

    _util2['default'].each(it.expressions, function (expression, i) {
      var condition = '';
      if (expression.tag !== 'else') {
        condition = '(' + expression.condition + ')';
      }
      re = re + ('\n  ' + expression.tag + ' ' + condition + ' {\n    if (_last[' + it.valueId + '] !== ' + i + ') {\n      _last[' + it.valueId + '] = ' + i + '\n\n      ' + expression.removeList.join('\n') + '\n      ' + expression.appendList.join('\n') + '\n      @.after(' + it.lineId + ', ' + it.id + ')\n    }\n    ' + expression.updateList.join('\n') + '\n  }\n');
    });

    return re;
  },
  import_append: function import_append(it) {
    var re = '';
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(' + it.id + ')\n');
    } else {
      re = re + ('\n  @.append(' + it.parentId + ', ' + it.id + ')\n');
    }

    return re;
  },
  import_create: function import_create(it) {
    var re = '';
    re = re + ('\n@.getTemplate(' + it.id + ', ' + it.templateName + ')\n');

    return re;
  },
  import_remove: function import_remove(it) {
    var re = '';

    re = re + ('\n@.removeTemplate(' + it.id + ')\n');
    if (it.isRoot) {
      re = re + ('\n  @.removeRoot(' + it.id + ')\n');
    }

    return re;
  },
  import_update: function import_update(it) {
    var re = '';

    re = re + ('\n@.updateTemplate(' + it.id + ', ' + it.args.join(', ') + ')\n');

    return re;
  },
  require: function require(it) {
    var re = '';

    re = re + ('\nvar ' + it.name + ' = require(\'' + it.path + '\')\n');

    return re;
  },
  template: function template(it) {
    var re = '';

    re = re + ('\n\'use strict\'\n\nvar _dep = require(\'' + it.dependency + '\')\nvar _prototype = _dep.template\nvar _extend = _dep.extend\n\n' + it.requires.join('\n') + '\n');

    _util2['default'].each(it.newDoms, function (dom) {
      re = re + ('\n  function ' + dom.templateName + ' (options) {\n    this.init(options)\n  }\n');
    });

    _util2['default'].each(it.newDoms, function (dom) {
      if (dom.createList.length || dom.updateList.length) {
        re = re + ('\n    _extend(' + dom.templateName + '.prototype, _prototype, {\n      create: function create () {\n        var _this = this\n');
        if (it.modelType === 'model' || it.modelType === 'object') {
          re = re + '\n          var _scope = this.options.scope\n';
        } else {
          re = re + '\n          var _scope = this\n';
        }

        re = re + ('\n        ' + dom.createList.join('\n') + '\n        ' + dom.appendList.join('\n') + '\n      }' + (dom.updateList.length ? ',' : '') + '\n');

        if (dom.updateList.length) {
          re = re + ('\n        update: function update (' + dom.args.join(', ') + ') {\n          var _this = this\n          var _last = this.last\n\n          ' + dom.updateList.join('\n') + '\n        }\n');
        }

        re = re + '\n    })\n';
      }
    });

    re = re + ('\nmodule.exports = exports[\'default\'] = ' + it.templateName + '\n');

    return re;
  },
  text_append: function text_append(it) {
    var re = '';
    if (it.parentId) {
      re = re + ('\n  @.append(' + it.parentId + ', ' + it.id + ')\n');
    }
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(' + it.id + ')\n');
    }

    return re;
  },
  text_create: function text_create(it) {
    var re = '';

    re = re + ('\n@.createText(' + it.id + ', \'' + _util2['default'].translateMarks(it.text) + '\')\n');

    return re;
  },
  text_remove: function text_remove(it) {
    var re = '';

    re = re + ('\n@.remove(' + it.id + ')\n');
    if (it.isRoot) {
      re = re + ('\n  @.removeRoot(' + it.id + ')\n');
    }

    return re;
  },
  text_update: function text_update(it) {
    var re = '';

    re = re + ('\nvar _tmp = ' + it.valueString + '\nif (_last[' + it.valueId + '] !== _tmp) {\n  _last[' + it.valueId + '] = _tmp\n  @.text(' + it.id + ', _tmp)\n}\n');

    return re;
  }

};
module.exports = exports['default'];