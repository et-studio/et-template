
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
      re = re + ('\n  _tp_removeAttribute(_this, ' + it.id + ', \'' + _util2['default'].translateMarks(attrs[0]) + '\')\n');
    } else if (attrs.length > 1) {
      var exclusions = attrs.map(function (item) {
        return '\'' + _util2['default'].translateMarks(item) + '\'';
      });
      re = re + ('\n  _tp_removeAttributes(_this, ' + it.id + ', ' + exclusions.join(',') + ')\n');
    }

    return re;
  },
  attributes_update: function attributes_update(it) {
    var re = '';

    var attrs = arguments[1] || [];
    _util2['default'].each(attrs, function (attr) {
      if (attr.isErratic) {
        if (attr.isProperty) {
          re = re + ('\n      var _tmp = ' + attr.valueString + '\n      if (_tp_getProperty(_this, ' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\') !== _tmp) {\n        _tp_setProperty(_this, ' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', _tmp)\n      }\n');
        } else {
          re = re + ('\n      var _tmp = ' + attr.valueString + '\n      if (_last[' + attr.valueId + '] !== _tmp) {\n        _last[' + attr.valueId + '] = _tmp\n        _tp_setAttribute(_this, ' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', _tmp)\n      }\n');
        }
      } else {
        if (attr.isProperty) {
          re = re + ('\n      _tp_setProperty(_this, ' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', \'' + _util2['default'].translateMarks(attr.value) + '\')\n');
        } else {
          re = re + ('\n      _tp_setAttribute(_this, ' + it.id + ', \'' + _util2['default'].translateMarks(attr.key) + '\', \'' + _util2['default'].translateMarks(attr.value) + '\')\n');
        }
      }
    });

    return re;
  },
  compile_amd: function compile_amd(it) {
    var re = '';

    var dependencies = it.dependencies || [];
    var paths = [];
    var variables = [];
    for (var i = 0, len = dependencies.length; i < len; i++) {
      var item = dependencies[i];
      paths.push('\'' + item.path + '\'');
      variables.push(item.name);
    }

    re = re + ('\n;define(\'' + it.moduleId + '\', [' + paths.join(',') + '], function(' + variables.join(',') + '){\n  ' + this.compile_template(it) + '\n  return ' + it.templateName + '\n})\n');

    return re;
  },
  compile_angular: function compile_angular(it) {
    var re = '';

    var dependencies = it.dependencies || [];
    var paths = [];
    var variables = [];
    for (var i = 0, len = dependencies.length; i < len; i++) {
      var item = dependencies[i];
      paths.push('\'' + item.path + '\'');
      variables.push(item.name);
    }

    re = re + ('\nangular.module(\'et.template\').factory(\'' + it.moduleId + '\', [' + paths.join(',') + ', function(' + variables.join(',') + ') {\n  ' + this.compile_template(it) + '\n  return function(option) {\n    return new ' + it.templateName + '(option)\n  }\n}]);\n');

    return re;
  },
  compile_cmd: function compile_cmd(it) {
    var re = '';

    var dependencies = it.dependencies || [];
    var requires = [];
    for (var i = 0, len = dependencies.length; i < len; i++) {
      var item = dependencies[i];
      requires.push('var ' + item.name + ' = require(\'' + item.path + '\')');
    }

    re = re + ('\n;define(function(require, exports, module){\n  ' + requires.join('\n') + '\n  ' + this.compile_template(it) + '\n  module.exports = exports[\'default\'] = ' + it.templateName + '\n})\n');

    return re;
  },
  compile_common: function compile_common(it) {
    var re = '';

    var dependencies = it.dependencies || [];
    var requires = [];
    for (var i = 0, len = dependencies.length; i < len; i++) {
      var item = dependencies[i];
      requires.push('var ' + item.name + ' = require(\'' + item.path + '\')');
    }

    re = re + ('\n\'use strict\'\n\n' + requires.join('\n') + '\n' + this.compile_template(it) + '\nmodule.exports = exports[\'default\'] = ' + it.templateName + '\n');

    return re;
  },
  compile_global: function compile_global(it) {
    var re = '';

    var dependencies = it.dependencies || [];
    var requires = [];
    for (var i = 0, len = dependencies.length; i < len; i++) {
      var item = dependencies[i];
      requires.push('var ' + item.name + ' = global[\'' + item.path + '\']');
    }

    re = re + ('\n;(function(global){\n  ' + requires.join('\n') + '\n  ' + this.compile_template(it) + '\n  global[\'' + it.moduleId + '\'] = ' + it.templateName + '\n})(window)\n');

    return re;
  },
  compile_template: function compile_template(it) {
    var re = '';

    re = re + '\n// 默认认为_dep对象已经存在了\nvar _dep_createTemplate = _dep.dep_createTemplate\n// @_tp_mark\n';

    _util2['default'].each(it.newDoms, function (dom) {
      var templateName = dom.getTemplateName();
      var createList = dom.getCreateList();
      var updateList = dom.getUpdateList();
      var args = dom.getArguments();

      re = re + ('\n  var ' + templateName + ' = _dep_createTemplate({\n    create: function () {\n      var _this = this\n      var it = _this.context\n\n      ' + createList.join('\n') + '\n    }' + (updateList.length ? ',' : '') + '\n');
      if (updateList.length) {
        re = re + ('\n      update: function (' + args.join(',') + ') {\n        var _this = this\n        var _last = _this.last\n        var it = _this.context\n\n        ' + updateList.join('\n') + '\n      }\n');
      }
      re = re + '\n  })\n';
    });

    return re;
  },
  element_create: function element_create(it) {
    var re = '';

    var nullString = 'null';
    var attributesString = nullString;
    var propertiesString = nullString;
    var parentElementId = it.parentId;
    if (it.isRoot) parentElementId = nullString;

    if (!_util2['default'].isEmpty(it.attributes)) {
      attributesString = JSON.stringify(it.attributes, null, 2);
    }
    if (!_util2['default'].isEmpty(it.properties)) {
      propertiesString = JSON.stringify(it.properties, null, 2);
    }

    if (propertiesString !== nullString) {
      re = re + ('\n  _tp_createElement(_this, ' + parentElementId + ', ' + it.id + ', \'' + _util2['default'].translateMarks(it.nodeName) + '\', ' + attributesString + ', ' + propertiesString + ')\n');
    } else if (attributesString !== nullString) {
      re = re + ('\n  _tp_createElement(_this, ' + parentElementId + ', ' + it.id + ', \'' + _util2['default'].translateMarks(it.nodeName) + '\', ' + attributesString + ')\n');
    } else {
      re = re + ('\n  _tp_createElement(_this, ' + parentElementId + ', ' + it.id + ', \'' + _util2['default'].translateMarks(it.nodeName) + '\')\n');
    }

    if (it.output) {
      re = re + ('\n  _tp_bind(_this, ' + it.id + ', \'change input\', function (e) {\n    ' + _util2['default'].translateMarks(it.output) + ' = e.target.value\n  })\n');
    }

    if (!_util2['default'].isEmpty(it.outputs)) {
      re = re + ('\n  _tp_bind(_this, ' + it.id + ', \'change input\', function (e) {\n');
      it.outputs.map(function (output, index, list) {
        var name = output.propName;
        var expression = output.expression;
        re = re + ('\n      ' + _util2['default'].translateMarks(expression) + ' = e.target.' + _util2['default'].translateMarks(name) + '\n');
      });
      re = re + '\n  })\n';
    }

    if (!_util2['default'].isEmpty(it.events)) {
      var eventsStringList = [];
      Object.keys(it.events).map(function (eventName, index, list) {
        var isLast = list.length - 1 === index;
        var event = it.events[eventName];
        var expression = event.expression;
        var args = event.args;
        var argsStrList = args.map(function (item, index) {
          return 'args[' + index + ']';
        });
        if (args.length) {
          eventsStringList.push('\'' + _util2['default'].translateMarks(eventName) + '\': function (e) {\n        var args = _tp_getEventArguments(_this, ' + it.id + ', \'' + _util2['default'].translateMarks(eventName) + '\')\n        ' + expression + '(e, ' + argsStrList.join(' ,') + ')\n      }');
        } else {
          eventsStringList.push('\'' + _util2['default'].translateMarks(eventName) + '\': function (e) {\n        ' + expression + '(e)\n      }');
        }
      });
      re = re + ('\n  _tp_bindEventsByMap(_this, ' + it.id + ', {' + eventsStringList.join(',\n') + '})\n');
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

    Object.keys(it.events).map(function (key, index, list) {
      var isLast = list.length - 1 === index;
      var event = it.events[key];
      var args = event.args;
      if (args.length) {
        re = re + ('\n    var _current = [' + args.join(', ') + ']\n    var _saved = _tp_getEventArguments(_this, ' + it.id + ', \'' + _util2['default'].translateMarks(key) + '\')\n    if (!_tp_isArrayEqual(_saved, _current)) {\n      _tp_saveEventArguments(_this, ' + it.id + ', \'' + _util2['default'].translateMarks(key) + '\', _current)\n    }\n');
      }
    });

    return re;
  },
  for_create: function for_create(it) {
    var re = '';

    var parentElementId = it.parentId;
    if (it.isRoot) parentElementId = null;
    re = re + ('\n_tp_createLine(_this, ' + parentElementId + ', ' + it.lineId + ')\n');

    return re;
  },
  for_update: function for_update(it) {
    var re = '';

    re = re + ('\nvar _lastLength = _last[' + it.valueId + '] || 0\nvar _list = ' + it.expression + ' || []\n\nvar _index = 0\nvar _len = _last[' + it.valueId + '] = _list.length\nfor (; _index < _len; _index++) {\n  var ' + it.indexName + ' = _index\n  var ' + it.itemName + ' = _list[_index]\n  var _itemId = \'' + it.id + '_\' + _index\n\n');
    if (it.context) {
      re = re + ('\n    var _template = _tp_getConditionTemplate(_this, _itemId, ' + it.templateName + ', ' + it.context + ')\n');
    } else {
      re = re + ('\n    var _template = _tp_getConditionTemplate(_this, _itemId, ' + it.templateName + ')\n');
    }
    re = re + ('\n\n  if (_index >= _lastLength) {\n    var _prevId = _index?(\'' + it.id + '_\' + (_index - 1)) : ' + it.lineId + '\n    _tp_after(_this, _prevId, _itemId)\n  }\n  _template.update(' + it.args.join(', ') + ')\n}\nfor (; _index < _lastLength; _index++) {\n  _tp_remove(_this, \'' + it.id + '_\' + _index)\n}\n');

    if (it.isRoot) {
      re = re + ('\n  _tp_setRoot(this, ' + it.id + ', _len)\n');
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
      return 'var ' + method + ' = _dep.' + method.substr(1);
    });
    re = re + ('\n' + it.header + '\n\n' + declares.join('\n') + '\n\n' + it.body + '\n');

    return re;
  },
  html_create: function html_create(it) {
    var re = '';

    if (it.isErratic) return '';
    re = re + ('\n_tp_html(_this, ' + it.parentId + ', \'' + _util2['default'].translateMarks(it.expression) + '\')\n');

    return re;
  },
  html_update: function html_update(it) {
    var re = '';

    if (!it.isErratic) return '';
    re = re + ('\nvar _tmp = ' + it.valueString + '\nif (_last[' + it.valueId + '] !== _tmp) {\n  _last[' + it.valueId + '] = _tmp\n  _tp_html(_this, ' + it.parentId + ', _tmp)\n}\n');

    return re;
  },
  if_create: function if_create(it) {
    var re = '';

    var parentElementId = it.parentId;
    if (it.isRoot) parentElementId = null;
    re = re + ('\n_tp_createLine(_this, ' + parentElementId + ', ' + it.lineId + ')\n');

    return re;
  },
  if_update: function if_update(it) {
    var re = '';

    re = re + ('\nvar _index\nvar _templateId = _last[' + it.saveId + ']\nvar _template = _tp_getTemplate(_this, _templateId)\n\n');
    _util2['default'].each(it.doms, function (dom, i) {
      var condition = '';
      if (dom.tag !== 'else') condition = '(' + dom.condition + ')';
      re = re + ('\n  ' + dom.tag + ' ' + condition + ' {\n    _index = ' + i + '\n  }\n');
    });
    re = re + ('\n\nif (_last[' + it.valueId + '] !== _index) {\n  _last[' + it.valueId + '] = _index\n\n  if (_template) {\n    _template.remove()\n');
    if (it.isRoot) {
      re = re + '\n      _tp_removeRoot(_this, _templateId)\n';
    }
    re = re + '\n  }\n\n  var _currentTemplateId\n  var _TemplateConstructor\n';
    _util2['default'].each(it.doms, function (dom, i) {
      var condition = '';
      if (dom.tag !== 'else') condition = '(' + dom.condition + ')';
      re = re + ('\n    ' + dom.tag + ' ' + condition + ' {\n      _currentTemplateId = ' + (dom.id ? dom.id : null) + '\n      _TemplateConstructor = ' + (dom.id ? dom.templateName : null) + '\n    }\n');
    });
    re = re + ('\n  if (_TemplateConstructor) {\n    _last[' + it.saveId + '] = _currentTemplateId\n    _template = _tp_getConditionTemplate(_this, _currentTemplateId, _TemplateConstructor)\n    _tp_after(_this, ' + it.lineId + ', _currentTemplateId)\n');
    if (it.isRoot) {
      re = re + '\n      _tp_setRoot(_this, _currentTemplateId)\n';
    }
    re = re + ('\n  } else {\n    _last[' + it.saveId + '] = null\n    _template = null\n  }\n}\nif (_template) _template.update(' + it.args.join(', ') + ')\n');

    return re;
  },
  import_create: function import_create(it) {
    var re = '';

    var parentElementId = it.parentId;
    if (it.isRoot) parentElementId = null;
    if (it.context) {
      re = re + ('\n  _tp_createTemplate(_this, ' + parentElementId + ', ' + it.templateName + ', ' + it.context + ')\n');
    } else {
      re = re + ('\n  _tp_createTemplate(_this, ' + parentElementId + ', ' + it.templateName + ')\n');
    }

    return re;
  },
  import_update: function import_update(it) {
    var re = '';

    re = re + ('\nvar _template = _tp_getTemlate(_this, ' + it.id + ')\n_template.update()\n');

    return re;
  },
  node_createTemplate: function node_createTemplate(it) {
    var re = '';

    re = re + ('\nvar ' + it.templateName + ' = _dep_createTemplate({\n  create: function () {\n    var _this = this\n    ' + it.createList.join('\n') + '\n  }' + (it.updateList.length ? ',' : '') + '\n');
    if (it.updateList.length) {
      re = re + ('\n    update: function (' + it.args.join(', ') + ') {\n      var _this = this\n      var _last = this.last\n\n      ' + it.updateList.join('\n') + '\n    }\n');
    }
    re = re + '\n})\n';

    return re;
  },
  text_create: function text_create(it) {
    var re = '';

    var parentElementId = it.parentId;
    if (it.isRoot) parentElementId = null;
    var text = it.isErratic ? '' : it.text;
    re = re + ('\n_tp_createText(_this, ' + parentElementId + ', ' + it.id + ', \'' + _util2['default'].translateMarks(text) + '\')\n');

    return re;
  },
  text_update: function text_update(it) {
    var re = '';

    if (!it.isErratic) return '';

    re = re + ('\nvar _tmp = ' + it.valueString + '\nif (_last[' + it.valueId + '] !== _tmp) {\n  _last[' + it.valueId + '] = _tmp\n  _tp_text(_this, ' + it.id + ', _tmp)\n}\n');

    return re;
  }

};
module.exports = exports['default'];