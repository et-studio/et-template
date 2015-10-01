
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
      re = re + ('\n  @.removeAttribute(_elements, ' + it.id + ', \'' + _util2['default'].translateMarks(attrs[0]) + '\')\n');
    } else if (attrs.length > 1) {
      var exclusions = attrs.map(function (item) {
        return '\'' + _util2['default'].translateMarks(item) + '\'';
      });
      re = re + ('\n  @.removeAttributes(_elements, ' + it.id + ', ' + exclusions.join(',') + ')\n');
    }

    return re;
  },
  attributes_update: function attributes_update(it) {
    var re = '';

    var attrs = arguments[1] || [];
    _util2['default'].each(attrs, function (attr) {
      if (attr.isErratic) {
        if (attr.isProperty) {
          re = re + ('\n      var _tmp = ' + attr.valueString + '\n      if (@.getProperty(_elements, ' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\') !== _tmp) {\n        @.setProperty(_elements, ' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', _tmp)\n      }\n');
        } else {
          re = re + ('\n      var _tmp = ' + attr.valueString + '\n      if (_last[' + attr.valueId + '] !== _tmp) {\n        _last[' + attr.valueId + '] = _tmp\n        @.setAttribute(_elements, ' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', _tmp)\n      }\n');
        }
      } else {
        if (attr.isProperty) {
          re = re + ('\n      @.setProperty(_elements, ' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', \'' + _util2['default'].translateMarks(attr.value) + '\')\n');
        } else {
          re = re + ('\n      @.setAttribute(_elements, ' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', \'' + _util2['default'].translateMarks(attr.value) + '\')\n');
        }
      }
    });

    return re;
  },
  compile_amd: function compile_amd(it) {
    var re = '';

    var paths = ['\'' + it.dependency + '\''];
    var variables = ['_dep'];
    for (var i = 0, len = it.requires.length; i < len; i++) {
      var item = it.requires[i];
      paths.push('\'' + item.path + '\'');
      variables.push(item.name);
    }

    re = re + ('\n;define(\'' + it.moduleId + '\', [' + paths.join(',') + '], function(' + variables.join(',') + '){\n  ' + this.compile_template(it) + '\n  return ' + it.templateName + '\n})\n');

    return re;
  },
  compile_angular: function compile_angular(it) {
    var re = '';

    var paths = ['\'' + it.dependency + '\''];
    var variables = ['_dep'];
    for (var i = 0, len = it.requires.length; i < len; i++) {
      var item = it.requires[i];
      paths.push('\'' + item.path + '\'');
      variables.push(item.name);
    }

    re = re + ('\nangular.module(\'' + it.angularModuleName + '\').factory(\'' + it.moduleId + '\', [' + paths.join(',') + ', function(' + variables.join(',') + ') {\n  ' + this.compile_template(it) + '\n  return ' + it.templateName + '\n}]);\n');

    return re;
  },
  compile_cmd: function compile_cmd(it) {
    var re = '';

    var requires = [];
    for (var i = 0, len = it.requires.length; i < len; i++) {
      var item = it.requires[i];
      requires.push('var ' + item.name + ' = require(\'' + item.path + '\')');
    }

    re = re + ('\n;define(function(require, exports, module){\n  ' + requires.join('\n') + '\n  var _dep = require(\'' + it.dependency + '\')\n  ' + this.compile_template(it) + '\n  module.exports = exports[\'default\'] = ' + it.templateName + '\n})\n');

    return re;
  },
  compile_common: function compile_common(it) {
    var re = '';

    var requires = [];
    for (var i = 0, len = it.requires.length; i < len; i++) {
      var item = it.requires[i];
      requires.push('var ' + item.name + ' = require(\'' + item.path + '\')');
    }

    re = re + ('\n\'use strict\'\n\n' + requires.join('\n') + '\nvar _dep = require(\'' + it.dependency + '\')\n' + this.compile_template(it) + '\nmodule.exports = exports[\'default\'] = ' + it.templateName + '\n');

    return re;
  },
  compile_global: function compile_global(it) {
    var re = '';

    var requires = [];
    for (var i = 0, len = it.requires.length; i < len; i++) {
      var item = it.requires[i];
      requires.push('var ' + item.name + ' = global[\'' + item.path + '\']');
    }

    re = re + ('\n;(function(global){\n  ' + requires.join('\n') + '\n  var _dep = global[\'' + it.dependency + '\']\n  ' + this.compile_template(it) + '\n  global.' + it.moduleId + ' = ' + it.templateName + '\n})(window)\n');

    return re;
  },
  compile_template: function compile_template(it) {
    var re = '';

    re = re + '\n// 默认认为_dep对象已经存在了\nvar _prototype = _dep.template\nvar _extend = _dep.extend\n// __bodyStart__\n';

    _util2['default'].each(it.newDoms, function (dom) {
      re = re + ('\n  function ' + dom.templateName + ' (options) {\n    this.init(options)\n  }\n');
    });

    _util2['default'].each(it.newDoms, function (dom) {
      re = re + ('\n  _extend(' + dom.templateName + '.prototype, _prototype, {\n    create: function create () {\n      var _elements = this.elements\n');
      if (it.modelType === 'model' || it.modelType === 'object') {
        re = re + '\n        var _scope = this.options.scope\n';
      } else {
        re = re + '\n        var _scope = this\n';
      }

      re = re + ('\n      ' + dom.createList.join('\n') + '\n      ' + dom.appendList.join('\n') + '\n    }' + (dom.updateList.length ? ',' : '') + '\n');

      if (dom.updateList.length) {
        re = re + ('\n      update: function update (' + dom.args.join(', ') + ') {\n        var _elements = this.elements\n        var _last = this.last\n\n        ' + dom.updateList.join('\n') + '\n      }\n');
      }

      re = re + '\n  })\n';
    });

    return re;
  },
  element_append: function element_append(it) {
    var re = '';
    if (it.parentId) {
      re = re + ('\n  @.append(_elements, ' + it.parentId + ', ' + it.id + ')\n');
    }
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(this, ' + it.id + ')\n');
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
      re = re + ('\n  @.createElement(_elements, ' + it.id + ', \'' + _util2['default'].translateMarks(it.nodeName) + '\', ' + attributesString + ', ' + propertiesString + ')\n');
    } else if (attributesString !== nullString) {
      re = re + ('\n  @.createElement(_elements, ' + it.id + ', \'' + _util2['default'].translateMarks(it.nodeName) + '\', ' + attributesString + ')\n');
    } else {
      re = re + ('\n  @.createElement(_elements, ' + it.id + ', \'' + _util2['default'].translateMarks(it.nodeName) + '\')\n');
    }

    if (it.modelKey) {
      re = re + ('\n  @.bind(this, ' + it.id + ', \'change keyup\', function (e) {\n');
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

    re = re + ('\n@.remove(_elements, ' + it.id + ')\n');
    if (it.isRoot) {
      re = re + ('\n  @.removeRoot(this, ' + it.id + ')\n');
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
      re = re + ('\n  @.append(_elements, ' + it.parentId + ', ' + it.lineId + ')\n');
    }
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(this, ' + it.id + ', 0)\n  @.setRoot(this, ' + it.lineId + ')\n');
    }

    return re;
  },
  for_create: function for_create(it) {
    var re = '';

    re = re + ('\n@.createFragment(_elements, ' + it.id + ')\n@.createLine(_elements, ' + it.lineId + ')\n');

    return re;
  },
  for_remove: function for_remove(it) {
    var re = '';

    re = re + ('\nvar _len = _last[' + it.valueId + ']\nfor (var _i = 0; _i < _len; _i++) {\n  @.remove(_elements, \'' + it.id + '_\' + _i)\n}\n');
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(this, ' + it.id + ', _last[' + it.valueId + '] = 0)\n');
    }

    return re;
  },
  for_update: function for_update(it) {
    var re = '';

    re = re + ('\nvar _lastLength = _last[' + it.valueId + '] || 0\nvar _list = ' + it.expression + ' || []\n\nvar _index = 0\nvar _len = _last[' + it.valueId + '] = _list.length\nfor (; _index < _len; _index++) {\n  var ' + it.indexName + ' = _index\n  var ' + it.itemName + ' = _list[_index]\n\n  var _template = @.getTemplate(_elements, \'' + it.id + '_\' + _index, ' + it.templateName + ', this.options)\n  if (_index >= _lastLength) {\n    @.append(_elements, ' + it.id + ', \'' + it.id + '_\' + _index)\n  }\n  _template.update(' + it.args.join(', ') + ')\n}\nfor (; _index < _lastLength; _index++) {\n  @.remove(_elements, \'' + it.id + '_\' + _index)\n}\n@.before(_elements, ' + it.lineId + ', ' + it.id + ')\n');

    if (it.isRoot) {
      re = re + ('\n  @.setRoot(this, ' + it.id + ', _len)\n');
    }

    return re;
  },
  format_amd: function format_amd(it) {
    var re = '';

    var ids = it.moduleIds.map(function (item) {
      return '\'' + item + '\'';
    });
    re = re + ('\n;define(\'' + it.moduleId + '\', [' + ids.join(',') + '], function([' + it.moduleIds.join(',') + ']){\n  var module = {}\n  ' + it.content + '\n  return module.exports\n})\n');

    return re;
  },
  format_cmd: function format_cmd(it) {
    var re = '';

    re = re + ('\n;define(function(require, exports, module){\n  ' + it.content + '\n})\n');

    return re;
  },
  format_global: function format_global(it) {
    var re = '';

    re = re + ('\n;(function(global){\n  var module = {}\n  var exports = {}\n  function require (key) {\n    return global[key]\n  }\n\n  ' + it.content + '\n  global.' + it.moduleId + ' = module.exports\n})(window)\n');

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

    re = re + ('\n@.html(_elements, ' + it.parentId + ', \'' + _util2['default'].translateMarks(it.expression) + '\')\n');

    return re;
  },
  html_update: function html_update(it) {
    var re = '';

    re = re + ('\nvar _tmp = ' + it.valueString + '\nif (_last[' + it.valueId + '] !== _tmp) {\n  _last[' + it.valueId + '] = _tmp\n  @.html(_elements, ' + it.parentId + ', _tmp)\n}\n');

    return re;
  },
  if_append: function if_append(it) {
    var re = '';

    if (it.parentId) {
      re = re + ('\n  @.append(_elements, ' + it.parentId + ', ' + it.lineId + ')\n');
    }
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(this, ' + it.lineId + ')\n');
    }

    return re;
  },
  if_create: function if_create(it) {
    var re = '';

    re = re + ('\n@.createLine(_elements, ' + it.lineId + ')\n@.createFragment(_elements, ' + it.id + ')\n');

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
    re = re + ('\n}\n_last[' + it.valueId + '] = -1\n@.remove(_elements, ' + id.lindId + ')\n');
    if (it.isRoot) {
      re = re + ('\n  @.removeRoot(this, ' + it.lindId + ')\n');
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
      re = re + ('\n  ' + expression.tag + ' ' + condition + ' {\n    if (_last[' + it.valueId + '] !== ' + i + ') {\n      _last[' + it.valueId + '] = ' + i + '\n\n      ' + expression.removeList.join('\n') + '\n      ' + expression.appendList.join('\n') + '\n');
      if (expression.endIndex > expression.startIndex) {
        re = re + ('\n        @.after(_elements, ' + it.lineId + ', ' + it.id + ')\n');
      }
      re = re + ('\n    }\n    ' + expression.updateList.join('\n') + '\n  }\n');
    });

    return re;
  },
  import_append: function import_append(it) {
    var re = '';
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(this, ' + it.id + ')\n');
    } else {
      re = re + ('\n  @.append(_elements, ' + it.parentId + ', ' + it.id + ')\n');
    }

    return re;
  },
  import_create: function import_create(it) {
    var re = '';
    re = re + ('\n@.getTemplate(_elements, ' + it.id + ', ' + it.templateName + ', this.options)\n');

    return re;
  },
  import_remove: function import_remove(it) {
    var re = '';

    re = re + ('\n@.remove(_elements, ' + it.id + ')\n');
    if (it.isRoot) {
      re = re + ('\n  @.removeRoot(this, ' + it.id + ')\n');
    }

    return re;
  },
  import_update: function import_update(it) {
    var re = '';

    re = re + ('\n_this.doms[' + it.id + '].update(' + it.args.join(', ') + ')\n');

    return re;
  },
  text_append: function text_append(it) {
    var re = '';
    if (it.parentId) {
      re = re + ('\n  @.append(_elements, ' + it.parentId + ', ' + it.id + ')\n');
    }
    if (it.isRoot) {
      re = re + ('\n  @.setRoot(this, ' + it.id + ')\n');
    }

    return re;
  },
  text_create: function text_create(it) {
    var re = '';

    re = re + ('\n@.createText(_elements, ' + it.id + ', \'' + _util2['default'].translateMarks(it.text) + '\')\n');

    return re;
  },
  text_remove: function text_remove(it) {
    var re = '';

    re = re + ('\n@.remove(_elements, ' + it.id + ')\n');
    if (it.isRoot) {
      re = re + ('\n  @.removeRoot(this, ' + it.id + ')\n');
    }

    return re;
  },
  text_update: function text_update(it) {
    var re = '';

    re = re + ('\nvar _tmp = ' + it.valueString + '\nif (_last[' + it.valueId + '] !== _tmp) {\n  _last[' + it.valueId + '] = _tmp\n  @.text(_elements, ' + it.id + ', _tmp)\n}\n');

    return re;
  }

};
module.exports = exports['default'];