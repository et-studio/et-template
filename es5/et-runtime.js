;(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('etRuntime', factory)
  } else {
    var require = function() {}
    var module = {}
    var exports = {}
    factory(require, exports, module)
    global['etRuntime'] = module.exports
  }
})(window, function(require, exports, module) {
  'use strict';

  var _get = function get(_x10, _x11, _x12) {
    var _again = true;
    _function:
    while (_again) {
      var object = _x10,
        property = _x11,
        receiver = _x12;
      desc = parent = getter = undefined;
      _again = false;
      if (object === null)
        object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x10 = parent;
          _x11 = property;
          _x12 = receiver;
          _again = true; continue _function;
        }
      } else if ('value' in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };

  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  var modules = {};
  function resolve(path, patch) {
    if (!patch) return path;
    var pathList = path.split('/');
    var patchList = patch.split('/');
    pathList.pop();
    for (var i = 0; i < patchList.length; i++) {
      var item = patchList[i];
      if (item === '..') {
        pathList.pop();
      } else if (item === '.') {
      } else {
        pathList.push(item);
      }
    }
    return pathList.join('/');
  }
  function innerDefine(key, factory) {
    function innerRequire(patch) {
      var path = resolve(key, patch);
      return modules[path];
    }
    var module = {};
    var exports = {};
    factory(innerRequire, exports, module);
    modules[key] = module.exports || exports;
  }

  innerDefine('util', function(innerRequire, exports, module) {
    'use strict';

    var privateUtil = {
      extendAB: function extendAB(A, B) {
        if (A) {
          for (var key in B) {
            A[key] = B[key];
          }
        }
        return A;
      },
      concatAB: function concatAB(arrayA, arrayB) {
        if (arrayA === undefined)
          arrayA = [];

        if (arrayB && typeof arrayB.forEach === 'function') {
          arrayB.forEach(function(item) {
            arrayA.push(item);
          });
        }
        return arrayA;
      }
    };

    var Util = (function() {
      function Util() {
        _classCallCheck(this, Util);
      }

      _createClass(Util, [{
        key: 'each',
        value: function each(array, callback) {
          if (!array) {
            return;
          }
          for (var i = 0, len = array.length; i < len; i++) {
            if (callback(array[i], i, array) === false) {
              break;
            }
          }
        }
      }, {
        key: 'extend',
        value: function extend() {
          var arg1 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

          for (var _len = arguments.length, list = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            list[_key - 1] = arguments[_key];
          }

          this.each(list, function(item) {
            privateUtil.extendAB(arg1, item);
          });
          return arg1;
        }
      }, {
        key: 'concat',
        value: function concat(array) {
          for (var _len2 = arguments.length, list = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            list[_key2 - 1] = arguments[_key2];
          }

          this.each(list, function(item) {
            privateUtil.concatAB(array, item);
          });
          return array;
        }
      }, {
        key: 'isEmpty',
        value: function isEmpty(obj) {
          if (!obj) {
            return true;
          }
          var keys = Object.keys(obj);
          return keys.length === 0;
        }
      }, {
        key: 'contains',
        value: function contains(array, value) {
          var re = false;
          this.each(array, function(item) {
            if (item === value) {
              re = true;
              return false;
            }
          });
          return re;
        }
      }, {
        key: 'clearArraySpace',
        value: function clearArraySpace(array) {
          var re = [];
          this.each(array, function(item) {
            if (item && typeof item.trim === 'function') {
              item = item.trim();
            }
            if (item) {
              re.push(item);
            }
          });
          return re;
        }
      }, {
        key: 'uniq',
        value: function uniq(array) {
          var re = [];
          var self = this;
          this.each(array, function(item) {
            if (!self.contains(re, item)) {
              re.push(item);
            }
          });
          return re;
        }
      }, {
        key: 'omit',
        value: function omit(objectA, objectB) {
          var re = {};
          for (var key in objectA) {
            if (!(key in objectB)) {
              re[key] = objectA[key];
            }
          }
          return re;
        }
      }, {
        key: 'pick',
        value: function pick(obj) {
          var re = {};

          for (var _len3 = arguments.length, list = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            list[_key3 - 1] = arguments[_key3];
          }

          this.each(list, function(key) {
            re[key] = obj[key];
          });
          return re;
        }
      }, {
        key: 'translateMarks',
        value: function translateMarks(str) {
          var isEscape = false;
          var re = '';
          this.each(str, function(token) {
            if (isEscape) {
              isEscape = false;
              re += token;
            } else if (token === '\\') {
              isEscape = true;
              re += token;
            } else if (token === '\'') {
              re += '\\\'';
            } else {
              re += token;
            }
          });
          return re;
        }
      }]);

      return Util;
    })();

    module.exports = new Util();
  });
  innerDefine('worker', function(innerRequire, exports, module) {

    'use strict';
    var _ = innerRequire('./util');

    module.exports = {

      attributes_remove: function attributes_remove(it) {
        var re = '';

        var attrs = arguments[1] || [];
        if (attrs.length === 1) {
          re = re + ('\n_tp_removeAttribute(_this, ' + it.id + ', \'' + _.translateMarks(attrs[0]) + '\')\n');
        } else if (attrs.length > 1) {
          var exclusions = attrs.map(function(item) {
            return '\'' + _.translateMarks(item) + '\'';
          });
          re = re + ('\n_tp_removeAttributes(_this, ' + it.id + ', ' + exclusions.join(',') + ')\n');
        }

        return re;
      },
      attributes_update: function attributes_update(it) {
        var re = '';

        var attrs = arguments[1] || [];
        _.each(attrs, function(attr) {
          if (attr.isErratic) {
            if (attr.isProperty) {
              re = re + ('\nvar _tmp = ' + attr.valueString + '\nif (_tp_getProperty(_this, ' + it.id + ', \'' + _.translateMarks(attr.key) + '\') !== _tmp) {\n_tp_setProperty(_this, ' + it.id + ', \'' + _.translateMarks(attr.key) + '\', _tmp)\n}\n');
            } else {
              re = re + ('\nvar _tmp = ' + attr.valueString + '\nif (_last[' + attr.valueId + '] !== _tmp) {\n_last[' + attr.valueId + '] = _tmp\n_tp_setAttribute(_this, ' + it.id + ', \'' + _.translateMarks(attr.key) + '\', _tmp)\n}\n');
            }
          } else {
            if (attr.isProperty) {
              re = re + ('\n_tp_setProperty(_this, ' + it.id + ', \'' + _.translateMarks(attr.key) + '\', \'' + _.translateMarks(attr.value) + '\')\n');
            } else {
              re = re + ('\n_tp_setAttribute(_this, ' + it.id + ', \'' + _.translateMarks(attr.key) + '\', \'' + _.translateMarks(attr.value) + '\')\n');
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

        re = re + ('\n;define(\'' + it.moduleId + '\', [' + paths.join(',') + '], function(' + variables.join(',') + '){\n' + this.compile_template(it) + '\nreturn ' + it.templateName + '\n})\n');

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

        re = re + ('\n;define(function(require, exports, module){\n' + requires.join('\n') + '\n' + this.compile_template(it) + '\nmodule.exports = exports[\'default\'] = ' + it.templateName + '\n})\n');

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

        re = re + ('\n;(function(global){\n' + requires.join('\n') + '\n' + this.compile_template(it) + '\nglobal[\'' + it.moduleId + '\'] = ' + it.templateName + '\n})(window)\n');

        return re;
      },
      compile_template: function compile_template(it) {
        var re = '';

        re = re + '\n// 默认认为_dep对象已经存在了\nvar _dep_createTemplate = _dep.dep_createTemplate\n// @_tp_mark\n';

        _.each(it.newDoms, function(dom) {
          var templateName = dom.getTemplateName();
          var createList = dom.getCreateList();
          var updateList = dom.getUpdateList();
          var args = dom.getArguments();

          re = re + ('\nvar ' + templateName + ' = _dep_createTemplate({\ncreate: function () {\nvar _this = this\n' + createList.join('\n') + '\n}' + (updateList.length ? ',' : '') + '\n');
          if (updateList.length) {
            re = re + ('\nupdate: function (' + args.join(',') + ') {\nvar _this = this\nvar _last = this.last\n' + updateList.join('\n') + '\n}\n');
          }
          re = re + '\n})\n';
        });

        return re;
      },
      element_create: function element_create(it) {
        var re = '';

        var nullString = 'null';
        var attributesString = nullString;
        var propertiesString = nullString;
        var parentElementId = it.parentId;
        if (it.isRoot)
          parentElementId = nullString;

        if (!_.isEmpty(it.attributes)) {
          attributesString = JSON.stringify(it.attributes, null, 2);
        }
        if (!_.isEmpty(it.properties)) {
          propertiesString = JSON.stringify(it.properties, null, 2);
        }

        if (propertiesString !== nullString) {
          re = re + ('\n_tp_createElement(_this, ' + parentElementId + ', ' + it.id + ', \'' + _.translateMarks(it.nodeName) + '\', ' + attributesString + ', ' + propertiesString + ')\n');
        } else if (attributesString !== nullString) {
          re = re + ('\n_tp_createElement(_this, ' + parentElementId + ', ' + it.id + ', \'' + _.translateMarks(it.nodeName) + '\', ' + attributesString + ')\n');
        } else {
          re = re + ('\n_tp_createElement(_this, ' + parentElementId + ', ' + it.id + ', \'' + _.translateMarks(it.nodeName) + '\')\n');
        }

        if (it.modelKey) {
          re = re + ('\n_tp_bind(_this, ' + it.id + ', \'change keyup\', function (e) {\n_tp_setModel(_this, \'' + it.modelType + '\', \'' + _.translateMarks(it.modelKey) + '\', e.target.value)\n})\n');
        }

        return re;
      },
      element_update: function element_update(it) {
        var _this2 = this;

        var re = '';

        if (it.erraticAttributes.length || it.expressions.length) {
          re = re + ('\n' + this.attributes_update(it, it.erraticAttributes) + '\n');

          _.each(it.expressions, function(items) {
            _.each(items, function(item, i) {
              var condition = '';
              if (item.tag !== 'else') {
                condition = '(' + item.condition + ')';
              }
              re = re + ('\n' + item.tag + ' ' + condition + ' {\nif (_last[' + item.valueId + '] !== ' + i + ') {\n_last[' + item.valueId + '] = ' + i + '\n' + _this2.attributes_update(it, item.residentAttributes) + '\n' + _this2.attributes_remove(it, item.exclusions) + '\n}\n' + _this2.attributes_update(it, item.erraticAttributes) + '\n}\n');
            });
          });
        }

        return re;
      },
      for_create: function for_create(it) {
        var re = '';

        var parentElementId = it.parentId;
        if (it.isRoot)
          parentElementId = null;
        re = re + ('\n_tp_createLine(_this, ' + parentElementId + ', ' + it.lineId + ')\n');

        return re;
      },
      for_update: function for_update(it) {
        var re = '';

        re = re + ('\nvar _lastLength = _last[' + it.valueId + '] || 0\nvar _list = ' + it.expression + ' || []\n\nvar _index = 0\nvar _len = _last[' + it.valueId + '] = _list.length\nfor (; _index < _len; _index++) {\nvar ' + it.indexName + ' = _index\nvar ' + it.itemName + ' = _list[_index]\nvar _itemId = \'' + it.id + '_\' + _index\nvar _template = _tp_getConditionTemplate(_this, _itemId, ' + it.templateName + ', this.options)\n\nif (_index >= _lastLength) {\nvar _prevId = _index?(\'' + it.id + '_\' + (_index - 1)) : ' + it.lineId + '\n_tp_after(_this, _prevId, _itemId)\n}\n_template.update(' + it.args.join(', ') + ')\n}\nfor (; _index < _lastLength; _index++) {\n_tp_remove(_this, \'' + it.id + '_\' + _index)\n}\n');

        if (it.isRoot) {
          re = re + ('\n_tp_setRoot(this, ' + it.id + ', _len)\n');
        }

        return re;
      },
      format_amd: function format_amd(it) {
        var re = '';

        var ids = it.moduleIds.map(function(item) {
          return '\'' + item + '\'';
        });
        re = re + ('\n;define(\'' + it.moduleId + '\', [' + ids.join(',') + '], function([' + it.moduleIds.join(',') + ']){\nvar module = {}\n' + it.content + '\nreturn module.exports\n})\n');

        return re;
      },
      format_cmd: function format_cmd(it) {
        var re = '';

        re = re + ('\n;define(function(require, exports, module){\n' + it.content + '\n})\n');

        return re;
      },
      format_global: function format_global(it) {
        var re = '';

        re = re + ('\n;(function(global){\nvar module = {}\nvar exports = {}\nfunction require (key) {\nreturn global[key]\n}\n\n' + it.content + '\nglobal.' + it.moduleId + ' = module.exports\n})(window)\n');

        return re;
      },
      format_tp: function format_tp(it) {
        var re = '';

        var declares = it.methods.map(function(method) {
          return 'var ' + method + ' = _dep.' + method.substr(1);
        });
        re = re + ('\n' + it.header + '\n\n' + declares.join('\n') + '\n\n' + it.body + '\n');

        return re;
      },
      html_create: function html_create(it) {
        var re = '';

        if (it.isErratic) return '';
        re = re + ('\n_tp_html(_this, ' + it.parentId + ', \'' + _.translateMarks(it.expression) + '\')\n');

        return re;
      },
      html_update: function html_update(it) {
        var re = '';

        if (!it.isErratic) return '';
        re = re + ('\nvar _tmp = ' + it.valueString + '\nif (_last[' + it.valueId + '] !== _tmp) {\n_last[' + it.valueId + '] = _tmp\n_tp_html(_this, ' + it.parentId + ', _tmp)\n}\n');

        return re;
      },
      if_create: function if_create(it) {
        var re = '';

        var parentElementId = it.parentId;
        if (it.isRoot)
          parentElementId = null;
        re = re + ('\n_tp_createLine(_this, ' + parentElementId + ', ' + it.lineId + ')\n');

        return re;
      },
      if_update: function if_update(it) {
        var re = '';

        re = re + ('\nvar _index\nvar _templateId = _last[' + it.saveId + ']\nvar _template = _tp_getTemplate(_this, _templateId)\n\n');
        _.each(it.doms, function(dom, i) {
          var condition = '';
          if (dom.tag !== 'else')
            condition = '(' + dom.condition + ')';
          re = re + ('\n' + dom.tag + ' ' + condition + ' {\n_index = ' + i + '\n}\n');
        });
        re = re + ('\n\nif (_last[' + it.valueId + '] !== _index) {\n_last[' + it.valueId + '] = _index\n\nif (_template) {\n_template.remove()\n');
        if (it.isRoot) {
          re = re + '\n_tp_removeRoot(_this, _templateId)\n';
        }
        re = re + '\n}\n\nvar _currentTemplateId\nvar _TemplateConstructor\n';
        _.each(it.doms, function(dom, i) {
          var condition = '';
          if (dom.tag !== 'else')
            condition = '(' + dom.condition + ')';
          re = re + ('\n' + dom.tag + ' ' + condition + ' {\n_currentTemplateId = ' + (dom.id ? dom.id : null) + '\n_TemplateConstructor = ' + (dom.id ? dom.templateName : null) + '\n}\n');
        });
        re = re + ('\nif (_TemplateConstructor) {\n_last[' + it.saveId + '] = _currentTemplateId\n_template = _tp_getConditionTemplate(_this, _currentTemplateId, _TemplateConstructor, this.options)\n_tp_after(_this, ' + it.lineId + ', _currentTemplateId)\n');
        if (it.isRoot) {
          re = re + '\n_tp_setRoot(_this, _currentTemplateId)\n';
        }
        re = re + ('\n} else {\n_last[' + it.saveId + '] = null\n_template = null\n}\n}\nif (_template) _template.update(it)\n');

        return re;
      },
      import_create: function import_create(it) {
        var re = '';

        var parentElementId = it.parentId;
        if (it.isRoot)
          parentElementId = null;
        re = re + ('\n_tp_createTemplate(_this, ' + parentElementId + ', ' + it.templateName + ', this.options)\n');

        return re;
      },
      import_update: function import_update(it) {
        var re = '';

        re = re + ('\nvar _template = _tp_getTemlate(_this, ' + it.id + ')\n_template.update(' + it.args.join(', ') + ')\n');

        return re;
      },
      node_createTemplate: function node_createTemplate(it) {
        var re = '';

        re = re + ('\nvar ' + it.templateName + ' = _dep_createTemplate({\ncreate: function () {\nvar _this = this\n');
        if (it.modelType === 'model' || it.modelType === 'object') {
          re = re + '\nvar _scope = this.options.scope\n';
        } else {
          re = re + '\nvar _scope = this\n';
        }
        re = re + ('\n' + it.createList.join('\n') + '\n}' + (it.updateList.length ? ',' : '') + '\n');
        if (it.updateList.length) {
          re = re + ('\nupdate: function (' + it.args.join(', ') + ') {\nvar _this = this\nvar _last = this.last\n\n' + it.updateList.join('\n') + '\n}\n');
        }
        re = re + '\n})\n';

        return re;
      },
      text_create: function text_create(it) {
        var re = '';

        var parentElementId = it.parentId;
        if (it.isRoot)
          parentElementId = null;
        var text = it.isErratic ? '' : it.text;
        re = re + ('\n_tp_createText(_this, ' + parentElementId + ', ' + it.id + ', \'' + _.translateMarks(text) + '\')\n');

        return re;
      },
      text_update: function text_update(it) {
        var re = '';

        if (!it.isErratic) return '';

        re = re + ('\nvar _tmp = ' + it.valueString + '\nif (_last[' + it.valueId + '] !== _tmp) {\n_last[' + it.valueId + '] = _tmp\n_tp_text(_this, ' + it.id + ', _tmp)\n}\n');

        return re;
      }

    };
  });
  innerDefine('compiler', function(innerRequire, exports, module) {
    'use strict';

    var worker = innerRequire('./worker');

    var Compiler = (function() {
      function Compiler(options) {
        _classCallCheck(this, Compiler);

        this.options = options;
      }

      _createClass(Compiler, [{
        key: 'pickData',
        value: function pickData(root, compileOptions) {
          var options = this.options;
          var dependencies = root.getDependencies();
          dependencies.unshift({
            name: options.dependencyName,
            path: options.dependencyPath
          });
          return {
            templateName: root.getTemplateName(),
            dependencies: dependencies,
            moduleId: compileOptions.moduleId,
            angularModuleName: compileOptions.angularModuleName,
            modelType: options.modelType,
            newDoms: root.getNewTemplateDoms()
          };
        }
      }, {
        key: 'compile',
        value: function compile(dom, compileOptions) {
          var options = this.options;
          var it = this.pickData(dom, compileOptions);
          switch (options.modules) {
            case 'angular':
              return worker.compile_angular(it);
            case 'cmd':
              return worker.compile_cmd(it);
            case 'amd':
              return worker.compile_amd(it);
            case 'global':
              return worker.compile_global(it);
            default:
              return worker.compile_common(it);
          }
        }
      }]);

      return Compiler;
    })();

    module.exports = Compiler;
  });
  innerDefine('parsers/machine', function(innerRequire, exports, module) {
    'use strict';

    var _ = innerRequire('../util');

    var STATE_BACK_MARK = '_last';
    var STATE_ALL_MATCH = '*';
    var STATE_SPLIT = ':';
    var STATE_CHILD_REG = /^_/;

    var Machine = (function() {
      function Machine() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Machine);

        this.options = options;
        this.states = options.states || [];
        this.symbols = options.symbols || [];
        this.table = options.table || [];
        this.startState = options.startState || this.states[0];
      }

      _createClass(Machine, [{
        key: 'getTokenSet',
        value: function getTokenSet(str, index) {
          var symbols = this.symbols;
          var char = str[index];
          var token = char;
          var symbolIndex = -1;

          _.each(symbols, function(symbol, i) {
            if (symbol && typeof symbol.test === 'function') {
              if (symbol.test(char)) {
                token = char;
                symbolIndex = i;
                return false;
              }
            } else if (symbol && symbol.length) {
              var tmp = str.substr(index, symbol.length);
              if (tmp === symbol) {
                token = symbol;
                symbolIndex = i;
                return false;
              }
            }
          });

          return {
            token: token,
            index: symbolIndex
          };
        }
      }, {
        key: 'switchState',
        value: function switchState(currentState, symbolIndex, stateStack) {
          var stateIndex = this.states.indexOf(currentState);
          var map = this.table[stateIndex];

          var state = map[symbolIndex];
          if (!state)
            state = map[STATE_ALL_MATCH] || '';

          var index = state.indexOf(STATE_SPLIT);
          if (index < 0)
            index = state.length;

          var prevState = state.substring(0, index);
          var nextState = state.substring(index + 1) || prevState;
          var isCurrentAtLoop = STATE_CHILD_REG.test(currentState);

          if (STATE_CHILD_REG.test(nextState) && nextState !== STATE_BACK_MARK) {
            stateStack.push(currentState);
          }

          if (isCurrentAtLoop && !prevState || prevState === STATE_BACK_MARK) {
            prevState = currentState;
          }

          if (isCurrentAtLoop && !nextState) {
            nextState = currentState;
          } else if (nextState === STATE_BACK_MARK) {
            nextState = stateStack.pop() || '';
          }

          return {
            prevState: prevState,
            nextState: nextState
          };
        }
      }, {
        key: 'each',
        value: function each(str, callback) {
          if (!str) return;

          var currentState = this.startState;
          var stateStack = [];
          for (var i = 0, len = str.length; i < len;) {
            var tokenSet = this.getTokenSet(str, i);
            var stateSet = this.switchState(currentState, tokenSet.index, stateStack);
            var token = tokenSet.token;

            var prevState = stateSet.prevState;
            var nextState = stateSet.nextState;
            currentState = callback(prevState, token, i) || nextState;
            i += token.length;
          }
        }
      }]);

      return Machine;
    })();

    module.exports = Machine;
  });
  innerDefine('nodes/origin', function(innerRequire, exports, module) {
    var _ = innerRequire('../util');

    var transMap = {
      '&quot;': '\\"',
      '&amp;': '\\&',
      '&lt;': '\\<',
      '&gt;': '\\>',
      '&nbsp;': ' '
    };

    var OriginNode = (function() {
      function OriginNode(parent) {
        var source = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, OriginNode);

        this.rowNumber = options.rowNumber;
        this.colNumber = options.colNumber;

        this.nodeType = options.nodeType;
        this.source = source;
        this.parent = parent;
        this.children = [];
        this.expressions = [];

        this.isHeaderClosed = false;
        this.isClosed = false;
      }

      _createClass(OriginNode, [{
        key: 'addSource',
        value: function addSource(str) {
          this.source += str;
        }
      }, {
        key: 'createChild',
        value: function createChild(source, options) {
          var parent = this.parent || this;
          if (this.nodeType === 'HTML' || this.nodeType === 'ET') {
            parent = this;
          }
          var node = new OriginNode(parent, source, options);
          parent.children.push(node);
          return node;
        }
      }, {
        key: 'saveText',
        value: function saveText(text, options) {
          if (text === undefined)
            text = '';

          if (text) {
            this.createChild(text, options);
          }
          return this;
        }
      }, {
        key: 'closeHeader',
        value: function closeHeader(token) {
          this.addSource(token);
          this.saveChildrenToExpressions();
          this.isHeaderClosed = true;
        }
      }, {
        key: 'closeNode',
        value: function closeNode(tail) {
          var current = this;
          while (current.parent) {
            if (current.matchClose(tail)) {
              current.transSource();
              current.isClosed = true;
              break;
            }
            current = current.parent;
          }
          current.closeAll();
          if (current.parent) {
            return current.parent;
          } else {
            return current;
          }
        }
      }, {
        key: 'closeAll',
        value: function closeAll() {
          _.each(this.children, function(child) {
            child.closeAll();
          });

          if (this.parent && !this.isClosed) {
            this.transSource();
            _.concat(this.parent.children, this.children);
            this.isClosed = true;
            this.children = [];
          }
          return this;
        }
      }, {
        key: 'matchClose',
        value: function matchClose() {
          var tail = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

          var start = (tail.slice(0, 1) + tail.slice(2, tail.length - 1)).trim();
          var source = this.source.trim();
          return source.indexOf(start) === 0;
        }
      }, {
        key: 'saveChildrenToExpressions',
        value: function saveChildrenToExpressions() {
          this.expressions = this.children;
          this.children = [];
        }
      }, {
        key: 'levelChildren',
        value: function levelChildren() {
          var root = this;
          var children = [];
          while (root.parent) {
            _.concat(children, root.children);
            root.children = [];
            root = root.parent;
          }
          _.concat(root.children, children);
          return this;
        }
      }, {
        key: 'removeEmptyNode',
        value: function removeEmptyNode() {
          var newChildren = [];
          this.children.forEach(function(child) {
            if (child && child.source) {
              child.removeEmptyNode();
              newChildren.push(child);
            }
          });
          this.children = newChildren;
        }
      }, {
        key: 'transSource',
        value: function transSource() {
          var source = this.source || '';
          source = source.trim().replace(/\s+/g, ' ');
          for (var key in transMap) {
            source = source.replace(new RegExp(key, 'g'), transMap[key]);
          }
          this.source = source;
        }
      }, {
        key: 'each',
        value: function each(callback) {
          if (typeof callback === 'function') {
            callback(this);
            this.children.forEach(function(child) {
              child.each(callback);
            });
          }
        }
      }]);

      return OriginNode;
    })();

    module.exports = OriginNode;
  });
  innerDefine('parsers/origin', function(innerRequire, exports, module) {
    'use strict';

    var Machine = innerRequire('./machine');
    var OriginNode = innerRequire('../nodes/origin');

    // @tableStart: origin
    var originTableOptions = {
      states: ['text', 'headerEnd', 'tailEnd', 'htmlStart', 'htmlHeader', 'htmlTail', 'etStart', 'etHeader', 'etTail', '_str[', '_str{{', '_str\'', '_str\"', '_comment'],
      symbols: ['</', '<!--', '-->', '<', '>', '[/#', '[#', '[', ']', '{{', '}}', '\\\'', '\'', '\\"', '"', ' ', '\r', '\n'],
      table: [{
        '0': 'htmlTail',
        '1': '_comment',
        '2': 'text',
        '3': 'htmlStart',
        '4': 'headerEnd',
        '5': 'etTail',
        '6': 'etStart',
        '7': 'text',
        '8': 'text',
        '9': '_str{{',
        '10': 'text',
        '11': 'text',
        '12': 'text',
        '13': 'text',
        '14': 'text',
        '15': 'text',
        '16': 'text',
        '17': 'text',
        '-1': 'text'
      }, {
        '0': 'htmlTail',
        '1': '_comment',
        '2': 'text',
        '3': 'htmlStart',
        '4': 'headerEnd',
        '5': 'etTail',
        '6': 'etStart',
        '7': 'text',
        '8': 'text',
        '9': '_str{{',
        '10': 'text',
        '11': 'text',
        '12': 'text',
        '13': 'text',
        '14': 'text',
        '15': 'text',
        '16': 'text',
        '17': 'text',
        '-1': 'text'
      }, {
        '0': 'htmlTail',
        '1': '_comment',
        '2': 'text',
        '3': 'htmlStart',
        '4': 'headerEnd',
        '5': 'etTail',
        '6': 'etStart',
        '7': 'text',
        '8': 'text',
        '9': '_str{{',
        '10': 'text',
        '11': 'text',
        '12': 'text',
        '13': 'text',
        '14': 'text',
        '15': 'text',
        '16': 'text',
        '17': 'text',
        '-1': 'text'
      }, {
        '0': 'htmlHeader',
        '1': 'htmlHeader',
        '2': 'htmlHeader',
        '3': 'htmlHeader',
        '4': 'htmlHeader',
        '5': 'htmlHeader',
        '6': 'htmlHeader',
        '7': 'htmlHeader',
        '8': 'htmlHeader',
        '9': 'htmlHeader',
        '10': 'htmlHeader',
        '11': 'htmlHeader',
        '12': 'htmlHeader',
        '13': 'htmlHeader',
        '14': 'htmlHeader',
        '15': 'htmlHeader',
        '16': 'htmlHeader',
        '17': 'htmlHeader',
        '-1': 'htmlHeader'
      }, {
        '0': 'htmlHeader',
        '1': 'htmlHeader',
        '2': 'htmlHeader',
        '3': 'htmlHeader',
        '4': 'headerEnd',
        '5': 'htmlHeader',
        '6': 'etStart',
        '7': 'htmlHeader',
        '8': 'htmlHeader',
        '9': '_str{{',
        '10': 'htmlHeader',
        '11': 'htmlHeader',
        '12': '_str\'',
        '13': 'htmlHeader',
        '14': '_str\"',
        '15': 'htmlHeader',
        '16': 'htmlHeader',
        '17': 'htmlHeader',
        '-1': 'htmlHeader'
      }, {
        '0': 'htmlTail',
        '1': 'htmlTail',
        '2': 'htmlTail',
        '3': 'htmlTail',
        '4': 'tailEnd',
        '5': 'htmlTail',
        '6': 'htmlTail',
        '7': 'htmlTail',
        '8': 'htmlTail',
        '9': 'htmlTail',
        '10': 'htmlTail',
        '11': 'htmlTail',
        '12': 'htmlTail',
        '13': 'htmlTail',
        '14': 'htmlTail',
        '15': 'htmlTail',
        '16': 'htmlTail',
        '17': 'htmlTail',
        '-1': 'htmlTail'
      }, {
        '0': 'etHeader',
        '1': 'etHeader',
        '2': 'etHeader',
        '3': 'etHeader',
        '4': 'etHeader',
        '5': 'etHeader',
        '6': 'etHeader',
        '7': 'etHeader',
        '8': 'etHeader',
        '9': 'etHeader',
        '10': 'etHeader',
        '11': 'etHeader',
        '12': 'etHeader',
        '13': 'etHeader',
        '14': 'etHeader',
        '15': 'etHeader',
        '16': 'etHeader',
        '17': 'etHeader',
        '-1': 'etHeader'
      }, {
        '0': 'etHeader',
        '1': 'etHeader',
        '2': 'etHeader',
        '3': 'etHeader',
        '4': 'etHeader',
        '5': 'etHeader',
        '6': 'etHeader',
        '7': '_str[',
        '8': 'headerEnd',
        '9': '_str{{',
        '10': 'etHeader',
        '11': 'etHeader',
        '12': '_str\'',
        '13': 'etHeader',
        '14': '_str\"',
        '15': 'etHeader',
        '16': 'etHeader',
        '17': 'etHeader',
        '-1': 'etHeader'
      }, {
        '0': 'etTail',
        '1': 'etTail',
        '2': 'etTail',
        '3': 'etTail',
        '4': 'etTail',
        '5': 'etTail',
        '6': 'etTail',
        '7': 'etTail',
        '8': 'tailEnd',
        '9': 'etTail',
        '10': 'etTail',
        '11': 'etTail',
        '12': 'etTail',
        '13': 'etTail',
        '14': 'etTail',
        '15': 'etTail',
        '16': 'etTail',
        '17': 'etTail',
        '-1': 'etTail'
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '_str[',
        '8': '_last',
        '9': '',
        '10': '',
        '11': '',
        '12': '',
        '13': '',
        '14': '',
        '15': '',
        '16': '',
        '17': '',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '_last',
        '11': '',
        '12': '',
        '13': '',
        '14': '',
        '15': '',
        '16': '',
        '17': '',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '11': '',
        '12': '_last',
        '13': '',
        '14': '',
        '15': '',
        '16': '',
        '17': '',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '11': '',
        '12': '',
        '13': '',
        '14': '_last',
        '15': '',
        '16': '',
        '17': '',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '_last',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '11': '',
        '12': '',
        '13': '',
        '14': '',
        '15': '',
        '16': '',
        '17': '',
        '-1': ''
      }]
    };
    // @tableEnd
    var originMachine = new Machine(originTableOptions);

    var OriginParser = (function() {
      function OriginParser() {
        _classCallCheck(this, OriginParser);
      }

      _createClass(OriginParser, [{
        key: 'parse',
        value: function parse(str) {
          var root = new OriginNode();
          var currentNode = root.createChild();

          var tail = '';
          originMachine.each(str, function(state, token) {
            var backState = null;
            switch (state) {
              case '_comment':
                break;
              case 'text':
              case '_str\'':
              case '_str"':
              case '_str{{':
              case '_str[':
              case 'htmlHeader':
              case 'etHeader':
                currentNode.addSource(token);
                break;
              case 'htmlStart':
                currentNode = currentNode.createChild(token, {
                  nodeType: 'HTML'
                });
                break;
              case 'etStart':
                currentNode = currentNode.createChild(token, {
                  nodeType: 'ET'
                });
                break;
              case 'headerEnd':
                currentNode.closeHeader(token);
                currentNode = currentNode.createChild();
                break;
              case 'htmlTail':
              case 'etTail':
                tail += token;
                break;
              case 'tailEnd':
                currentNode = currentNode.closeNode(tail + token);
                tail = '';
                backState = null;
                if (!currentNode.isHeaderClosed) {
                  switch (currentNode.nodeType) {
                    case 'HTML':
                      backState = 'htmlHeader';
                      break;
                    case 'ET':
                      backState = 'etHeader';
                      break;
                  }
                }
                if (!backState)
                  currentNode = currentNode.createChild();
                break;
              default:
                throw new Error('The state: \'' + state + '\' is not defined.');
            }
            return backState;
          });
          currentNode.saveText(tail);
          root.closeAll();
          root.removeEmptyNode();
          return root;
        }
      }]);

      return OriginParser;
    })();

    module.exports = new OriginParser();
  });
  innerDefine('parsers/dot', function(innerRequire, exports, module) {
    'use strict';

    var settings = {
      interpolate: /\{\{=([\s\S]+?)\}\}/g,
      encode: /\{\{!([\s\S]+?)\}\}/g,
      conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
      iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
      evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
      use: /\{\{#([\s\S]+?)\}\}/g,
      useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
      define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
      defineParams: /^\s*([\w$]+):([\s\S]+)/
    };

    var DotParser = (function() {
      function DotParser() {
        _classCallCheck(this, DotParser);
      }

      _createClass(DotParser, [{
        key: 'parse',
        value: function parse(str) {
          var c = settings;
          return str.replace(c.interpolate, function(m, code) {
            return '{{' + code + '}}';
          }).replace(c.encode, function(m, code) {
            return '{{' + code + '}}';
          }).replace(c.conditional, function(m, elsecase, code) {
            if (elsecase) {
              return code ? '[#elseif ' + code + ']' : '[#else]';
            } else {
              return code ? '[#if ' + code + ']' : '[/#if]';
            }
          }).replace(c.iterate, function(m, iterate, vname, iname) {
            if (iterate) {
              return iname ? '[#for ' + vname + ', ' + iname + ' in ' + iterate + ']' : '[#for ' + vname + ' in ' + iterate + ']';
            } else {
              return '[/#for]';
            }
          });
        }
      }]);

      return DotParser;
    })();

    module.exports = new DotParser();
  });
  innerDefine('nodes/interface', function(innerRequire, exports, module) {
    'use strict';

    var _ = innerRequire('../util');

    var config = {
      'templateFunctionPrefix': 'Template_'
    };

    var Interface = (function() {
      function Interface() {
        _classCallCheck(this, Interface);

        this._index = 0;
        this._lineNumber = null;
        this.valueId = 0;
        this.children = [];

        this.parent = null;
        this.previous = null;
        this.next = null;
      }

      _createClass(Interface, [{
        key: 'setIndex',
        value: function setIndex(index) {
          this._index = index;
        }
      }, {
        key: 'getId',
        value: function getId() {
          return this._index * 2;
        }
      }, {
        key: 'getLineNumber',
        value: function getLineNumber() {
          return this._lineNumber;
        }
      }, {
        key: 'getTemplateName',
        value: function getTemplateName() {
          var id = this.getId();
          return config.templateFunctionPrefix + id;
        }
      }, {
        key: 'getLineId',
        value: function getLineId() {
          var id = this.getId();
          return id - 1;
        }
      }, {
        key: 'getValueId',
        value: function getValueId() {
          return this.valueId++;
        }
      }, {
        key: 'getParentId',
        value: function getParentId() {
          var parent = this.parent;
          if (parent && !parent.isRoot && !parent.isNewTemplate) {
            return parent.getId();
          } else {
            return null;
          }
        }
      }, {
        key: 'getNodeName',
        value: function getNodeName() {
          return this.nodeName && this.nodeName.toUpperCase();
        }
      }, {
        key: 'getTextContent',
        value: function getTextContent() {
          return this.textContent || this.content || '';
        }
      }, {
        key: 'getRootValueId',
        value: function getRootValueId() {
          var lastRoot = this.getLastRoot();
          if (lastRoot) {
            return lastRoot.getValueId();
          } else {
            return null;
          }
        }
      }, {
        key: 'getLastRoot',
        value: function getLastRoot() {
          var parent = this.parent;
          while (parent) {
            if (parent.isNewTemplate || !parent.parent) {
              return parent;
            }
            parent = parent.parent;
          }
          return null;
        }
      }, {
        key: 'remove',
        value: function remove() {
          if (!this.parent) return;

          var nodePrev = this.previous;
          var nodeNext = this.next;
          if (nodePrev)
            nodePrev.next = nodeNext;
          if (nodeNext)
            nodeNext.previous = nodePrev;
          this.previous = null;
          this.next = null;

          var newChidren = [];
          var _this = this;
          _.each(this.parent.children, function(child) {
            if (child.getId() !== _this.getId()) {
              newChidren.push(child);
            }
          });
          this.parent.children = newChidren;
        }
      }, {
        key: 'prepend',
        value: function prepend(node) {
          var children = this.children;

          if (children.length > 0) {
            var first = children[0];
            first.previous = node;
            node.next = first;
          }

          children.unshift(node);
          node.previous = null;
          node.parent = this;
        }
      }, {
        key: 'append',
        value: function append(node) {
          var children = this.children;

          if (children.length > 0) {
            var last = children[children.length - 1];
            last.next = node;
            node.previous = last;
          }

          children.push(node);
          node.next = null;
          node.parent = this;
        }
      }, {
        key: 'after',
        value: function after(node) {
          if (!this.parent) return;

          node.remove();
          node.parent = this.parent;
          node.previous = this;
          node.next = this.next;

          var currentNext = this.next;
          if (currentNext)
            currentNext.previous = node;
          this.next = node;

          var newChidren = [];
          var _this = this;
          _.each(this.parent.children, function(child) {
            newChidren.push(child);
            if (child.getId() === _this.getId()) {
              newChidren.push(node);
            }
          });
          this.parent.children = newChidren;
        }
      }, {
        key: 'checkRoot',
        value: function checkRoot() {
          var parent = this.parent;
          if (!parent) return true;
          if (parent.getId() === 0) return true;
          if (parent.isNewTemplate) return true;
          return false;
        }
      }]);

      return Interface;
    })();

    module.exports = Interface;
  });
  innerDefine('nodes/basic', function(innerRequire, exports, module) {
    'use strict';

    /**
    * Dom 的结构
    *  - nodeName        {String}
    *  - children        {Array[Dom]}
    *  - expressions     {Array[Expression]} 在属性上面的表达式数组
    *  - parent          {Dom}
    *  - previous        {Dom}
    *  - next            {Dom}
    *  - attributes      {Map<String, String>}
    *  - textContent     {String}
    *  - nodeType        {number} root: root dom, 1: element, 3:textNode, 8:commentNode
    *
    * Expression
    *  - condition       {String} 属性显示条件
    *  - attributes      {Map<String, String>}
    *
    * #if 节点
    *  - condition       {String} 判断条件
    *
    * #elseif
    *  - condition
    *
    * #for 节点
    *  - expression
    *  - itemName
    *  - indexName
    */

    var NodeInterface = innerRequire('./interface');
    var _ = innerRequire('../util');
    var worker = innerRequire('../worker');

    var Basic = (function(_NodeInterface) {
      _inherits(Basic, _NodeInterface);

      function Basic(source, options) {
        _classCallCheck(this, Basic);

        _get(Object.getPrototypeOf(Basic.prototype), 'constructor', this).call(this, source, options);

        this._source = source;
        this.options = options;

        this.isNewTemplate = false;
        this.args = [];
        this.nodeType = 'ET';

        this.children = [];
        this.parse(source);
      }

      _createClass(Basic, [{
        key: 'getNewTemplateDoms',
        value: function getNewTemplateDoms() {
          var results = [];
          this.each(function(dom) {
            if (!dom.parent || dom.isNewTemplate) {
              results.push(dom);
            }
          });
          return results;
        }
      }, {
        key: 'getCreateList',
        value: function getCreateList() {
          var results = [];
          _.each(this.children, function(child) {
            var tmp = child.deliverCreate();
            if (tmp) results.push(tmp);

            if (!child.isNewTemplate) {
              _.concat(results, child.getCreateList());
            }
          });
          return results;
        }
      }, {
        key: 'getUpdateList',
        value: function getUpdateList() {
          var results = [];
          _.each(this.children, function(child) {
            var tmp = child.deliverUpdate();
            if (tmp) results.push(tmp);

            if (!child.isNewTemplate) {
              _.concat(results, child.getUpdateList());
            }
          });
          return results;
        }
      }, {
        key: 'getDependencies',
        value: function getDependencies() {
          var re = [];
          this.each(function(dom) {
            _.concat(re, dom.deliverDependencies());
          });
          return re;
        }
      }, {
        key: 'getArguments',
        value: function getArguments() {
          var re = ['it'];

          var lastRoot = this.getLastRoot();
          if (lastRoot) {
            _.concat(re, lastRoot.getArguments());
          }
          if (this.args) {
            _.concat(re, this.args);
          }
          re = _.uniq(re);
          return _.clearArraySpace(re);
        }
      }, {
        key: 'saveArgument',
        value: function saveArgument() {
          for (var _len4 = arguments.length, list = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            list[_key4] = arguments[_key4];
          }

          _.concat(this.args, list);
          return this;
        }
      }, {
        key: 'each',
        value: function each(callback) {
          if (typeof callback !== 'function') return;

          if (callback(this) === false) return;
          if (this.children.length) {
            this.children[0].each(callback);
          }
          if (this.next) {
            this.next.each(callback);
          }
        }
      }, {
        key: 'initAll',
        value: function initAll() {
          var eachHandler = function eachHandler(dom) {
            dom.init();
          };
          this.each(eachHandler);
        }

      // functions could be override
      }, {
        key: 'parse',
        value: function parse(source) {}
      }, {
        key: 'init',
        value: function init() {}
      }, {
        key: 'assembleWorkerData',
        value: function assembleWorkerData() {
          return {};
        }
      }, {
        key: 'deliverDependencies',
        value: function deliverDependencies() {
          return [];
        }
      }, {
        key: 'deliverCreate',
        value: function deliverCreate() {
          var method = this.namespace + '_create';
          var it = this.assembleWorkerData();
          if (typeof worker[method] === 'function') {
            return worker[method](it);
          }
        }
      }, {
        key: 'deliverUpdate',
        value: function deliverUpdate() {
          var method = this.namespace + '_update';
          var it = this.assembleWorkerData();
          if (typeof worker[method] === 'function') {
            return worker[method](it);
          }
        }
      }]);

      return Basic;
    })(NodeInterface);

    module.exports = Basic;
  });
  innerDefine('parsers/parser', function(innerRequire, exports, module) {
    'use strict';

    var BasicParser = (function() {
      function BasicParser(source, options) {
        _classCallCheck(this, BasicParser);

        this.name = 'basic';
        this.source = source;
        this.rowNumber = 0;
        this.colNumber = 0;
      }

      _createClass(BasicParser, [{
        key: 'set',
        value: function set(name, source) {
          var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

          this.name = name;
          this.source = source;
          this.rowNumber = options.rowNumber || 0;
          this.colNumber = options.colNumber || 0;
        }
      }, {
        key: 'getErrorMessage',
        value: function getErrorMessage(code) {
          return '';
        }
      }, {
        key: 'throwError',
        value: function throwError(code) {
          var source = this.source;
          var message = this.getErrorMessage(code);
          throw new Error(message + ' ===> ' + source);
        }
      }]);

      return BasicParser;
    })();

    module.exports = BasicParser;
  });
  innerDefine('parsers/element', function(innerRequire, exports, module) {
    'use strict';

    var _ = innerRequire('../util');
    var Parser = innerRequire('./parser');
    var Machine = innerRequire('./machine');

    // @tableStart: element
    var elementTableOptions = {
      states: ['start', 'name', 'scan', 'key', 'valueStart', 'value', 'value\'', 'value\"', '_str', 'valueStr', 'end'],
      symbols: ['<', '>', '\\\"', '\"', '\\\'', '\'', '=', ' ', '\r', '\n', '{{', '}}'],
      table: [{
        '0': 'start',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '11': '',
        '-1': 'name'
      }, {
        '0': '',
        '1': 'end',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': 'scan',
        '8': 'scan',
        '9': 'scan',
        '10': '',
        '11': '',
        '-1': 'name'
      }, {
        '0': '',
        '1': 'end',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': 'valueStart',
        '7': 'scan',
        '8': 'scan',
        '9': 'scan',
        '10': '',
        '11': '',
        '-1': 'key'
      }, {
        '0': '',
        '1': 'end',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': 'valueStart',
        '7': 'scan',
        '8': 'scan',
        '9': 'scan',
        '10': '',
        '11': '',
        '-1': 'key'
      }, {
        '0': '',
        '1': 'end',
        '2': '',
        '3': 'value\"',
        '4': '',
        '5': 'value\'',
        '6': '',
        '7': 'valueStart',
        '8': 'valueStart',
        '9': 'valueStart',
        '10': 'valueStr',
        '11': '',
        '-1': 'value'
      }, {
        '0': 'value',
        '1': 'end',
        '2': 'value',
        '3': 'value',
        '4': 'value',
        '5': 'value',
        '6': 'value',
        '7': 'scan',
        '8': 'scan',
        '9': 'scan',
        '10': '_str',
        '11': 'value',
        '-1': 'value'
      }, {
        '0': 'value\'',
        '1': 'value\'',
        '2': 'value\'',
        '3': 'value\'',
        '4': 'value\'',
        '5': 'scan',
        '6': 'value\'',
        '7': 'value\'',
        '8': 'value\'',
        '9': 'value\'',
        '10': '_str',
        '11': 'value\'',
        '-1': 'value\''
      }, {
        '0': 'value\"',
        '1': 'value\"',
        '2': 'value\"',
        '3': 'scan',
        '4': 'value\"',
        '5': 'value\"',
        '6': 'value\"',
        '7': 'value\"',
        '8': 'value\"',
        '9': 'value\"',
        '10': '_str',
        '11': 'value\"',
        '-1': 'value\"'
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '11': '_last',
        '-1': ''
      }, {
        '0': 'valueStr',
        '1': 'valueStr',
        '2': 'valueStr',
        '3': 'valueStr',
        '4': 'valueStr',
        '5': 'valueStr',
        '6': 'valueStr',
        '7': 'valueStr',
        '8': 'valueStr',
        '9': 'valueStr',
        '10': 'valueStr',
        '11': 'value',
        '-1': 'valueStr'
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '11': '',
        '-1': ''
      }]
    };
    // @tableEnd
    var elementMachine = new Machine(elementTableOptions);

    var BLACK_LIST = ['/'];
    var WHITE_LIST = [];

    var ElementParser = (function(_Parser) {
      _inherits(ElementParser, _Parser);

      function ElementParser() {
        _classCallCheck(this, ElementParser);

        _get(Object.getPrototypeOf(ElementParser.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(ElementParser, [{
        key: 'parse',
        value: function parse(source, options) {
          this.set('element', source, options);

          var _this = this;
          var lastState;

          var attrs = [];
          var attrKey = '';
          var attrValue = '';
          var str = '';
          var nodeName = '';
          elementMachine.each(source, function(state, token) {
            lastState = state;
            switch (state) {
              case 'start':
              case 'end':
                break;
              case 'name':
                nodeName += token;
                break;
              case 'scan':
                if (attrKey) {
                  attrs.push({
                    key: attrKey
                  });
                  attrKey = '';
                }
                if (str || attrValue) {
                  var attr = attrs.pop();
                  if (!attr || !attr.key || attr.value) {
                    _this.throwError();
                  }
                  attr.value = attrValue + str;
                  attrs.push(attr);
                  str = '';
                  attrValue = '';
                }
                break;
              case 'key':
                attrKey += token;
                break;
              case 'valueStart':
                if (attrKey) {
                  attrs.push({
                    key: attrKey
                  });
                  attrKey = '';
                }
                break;
              case 'value':
                if (str) {
                  attrValue += str;
                  str = '';
                }
                attrValue += token;
                break;
              case "value'":
                if (str) {
                  attrValue += str;
                  str = '';
                }
                attrValue += token;
                if (attrValue.indexOf("'") === 0) {
                  attrValue = attrValue.substr(1);
                }
                break;
              case 'value"':
                if (str) {
                  attrValue += str;
                  str = '';
                }
                attrValue += token;
                if (attrValue.indexOf('"') === 0) {
                  attrValue = attrValue.substr(1);
                }
                break;
              case 'valueStr':
              case '_str':
                str += token;
                break;
              default:
                _this.throwError(state);
            }
          });
          if (lastState !== 'end') {
            this.throwError();
          }
          if (attrKey) {
            attrs.push({
              key: attrKey
            });
            attrKey = '';
          }
          if (attrValue) {
            var attr = attrs.pop();
            if (!attr || !attr.key || attr.value) {
              this.throwError();
            }
            attr.value = attrValue;
            attrs.push(attr);
          }

          return {
            nodeName: nodeName.toUpperCase(),
            attributes: this.translateAttributes(attrs, options)
          };
        }
      }, {
        key: 'translateAttributes',
        value: function translateAttributes(attrs, options) {
          var _this3 = this;

          if (attrs === undefined)
            attrs = {};

          var re = {};
          var filter = this.getAttributeFilter(options);

          attrs.map(function(attr) {
            if (!attr.key) _this3.throwError();
            if (filter(attr.key))
              re[attr.key] = attr.value || '';
          });

          return re;
        }
      }, {
        key: 'getAttributeFilter',
        value: function getAttributeFilter() {
          var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

          var blackList = options.blackList || BLACK_LIST;
          var whiteList = options.whiteList || WHITE_LIST;

          if (whiteList && whiteList.length) {
            return function(key) {
              return _.contains(whiteList, key);
            };
          } else {
            return function(key) {
              return !_.contains(blackList, key);
            };
          }
        }
      }]);

      return ElementParser;
    })(Parser);

    module.exports = new ElementParser();
  });
  innerDefine('parsers/value', function(innerRequire, exports, module) {
    'use strict';

    var Parser = innerRequire('./parser');
    var Machine = innerRequire('./machine');
    var _ = innerRequire('../util');

    // @tableStart: value
    var valueTableOptions = {
      states: ['text', 'exStart', 'exBody', 'exEnd', 'ifStart', 'ifBody', 'ifEnd'],
      symbols: ['{{', '}}', '[#if ', '[/#if]'],
      table: [{
        '0': 'exStart',
        '1': 'text',
        '2': 'ifStart',
        '3': '',
        '-1': 'text'
      }, {
        '0': 'exBody',
        '1': 'exEnd',
        '2': '',
        '3': '',
        '-1': 'exBody'
      }, {
        '0': 'exBody',
        '1': 'exEnd',
        '2': '',
        '3': '',
        '-1': 'exBody'
      }, {
        '0': 'text',
        '1': 'text',
        '2': 'ifStart',
        '3': '',
        '-1': 'text'
      }, {
        '0': 'ifBody',
        '1': 'ifBody',
        '2': '',
        '3': 'ifBody',
        '-1': 'ifBody'
      }, {
        '0': 'ifBody',
        '1': 'ifBody',
        '2': '',
        '3': 'ifEnd',
        '-1': 'ifBody'
      }, {
        '0': 'start',
        '1': 'text',
        '2': 'ifStart',
        '3': 'text',
        '-1': 'text'
      }]
    };
    // @tableStart: valueIf
    var valueIfTableOptions = {
      states: ['start', 'ifCondition', 'endContition', 'ifContent', 'elseif', 'else', 'elseContent', '_value[', 'end'],
      symbols: ['[#if ', '[#elseif ', '[#else]', '[/#if]', ']', '['],
      table: [{
        '0': 'start',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '-1': 'ifCondition'
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': 'endContition',
        '5': '_value[',
        '-1': 'ifCondition'
      }, {
        '0': '',
        '1': 'elseif',
        '2': 'else',
        '3': 'end',
        '4': 'ifContent',
        '5': 'ifContent',
        '-1': 'ifContent'
      }, {
        '0': '',
        '1': 'elseif',
        '2': 'else',
        '3': 'end',
        '4': 'ifContent',
        '5': 'ifContent',
        '-1': 'ifContent'
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': 'ifContent',
        '5': '',
        '-1': 'ifCondition'
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': 'end',
        '4': 'elseContent',
        '5': 'elseContent',
        '-1': 'elseContent'
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': 'end',
        '4': 'elseContent',
        '5': 'elseContent',
        '-1': 'elseContent'
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '_last',
        '5': '_value[',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '-1': ''
      }]
    };
    // @tableEnd
    var valueMachine = new Machine(valueTableOptions);
    var valueIfMatchine = new Machine(valueIfTableOptions);

    var ValueParser = (function(_Parser2) {
      _inherits(ValueParser, _Parser2);

      function ValueParser() {
        _classCallCheck(this, ValueParser);

        _get(Object.getPrototypeOf(ValueParser.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(ValueParser, [{
        key: 'parse',
        value: function parse(source, options) {
          return this.parseToObject(source, options).content;
        }
      }, {
        key: 'isErratic',
        value: function isErratic(source, options) {
          return this.parseToObject(source, options).isErractic;
        }
      }, {
        key: 'parseToObject',
        value: function parseToObject(str, options) {
          this.set('value', str, options);
          var re = {
            list: [],
            isErratic: false,
            content: '\'\''
          };

          var text = '';
          var expression = '';
          var ifCondition = '';

          var _this = this;
          var lastState = 'text';
          valueMachine.each(str, function(state, token) {
            lastState = state;
            switch (state) {
              case 'text':
                _this.pushExpression(re, expression);
                _this.pushIf(re, ifCondition);
                expression = '';
                ifCondition = '';
                break;
              case 'exStart':
              case 'ifStart':
                _this.pushText(re, text);
                _this.pushExpression(re, expression);
                _this.pushIf(re, ifCondition);
                text = '';
                expression = '';
                ifCondition = '';
            }
            switch (state) {
              case 'exEnd':
              case 'exStart':
                break;
              case 'text':
                text += token;
                break;
              case 'exBody':
                expression += token;
                break;
              case 'ifStart':
              case 'ifBody':
              case 'ifEnd':
                ifCondition += token;
                break;
              default:
                _this.throwError(state);
            }
          });
          if (['text', 'exEnd', 'ifEnd'].indexOf(lastState) < 0) {
            this.throwError();
          }
          this.pushText(re, text);
          this.pushExpression(re, expression);
          this.pushIf(re, ifCondition);

          if (re.list.length)
            re.content = re.list.join(' + ');
          return re;
        }
      }, {
        key: 'pushText',
        value: function pushText(obj, str) {
          if (str) {
            str = _.translateMarks(str);
            obj.list.push('\'' + str + '\'');
          }
        }
      }, {
        key: 'pushExpression',
        value: function pushExpression(obj, str) {
          if (!str) return;

          obj.list.push(str);
          obj.isErractic = true;
        }
      }, {
        key: 'pushIf',
        value: function pushIf(obj, str) {
          if (!str) return false;

          var list = [];
          var current = {
            type: 'if',
            condition: '',
            content: ''
          };
          var _this = this;
          valueIfMatchine.each(str, function(state, token) {
            switch (state) {
              case 'start':
                list.push(current);
                break;
              case 'ifCondition':
              case '_value[':
                current.condition += token;
                break;
              case 'ifContent':
              case 'elseContent':
                current.content += token;
                break;
              case 'endContition':
                break;
              case 'elseif':
                current = {
                  type: 'elseif',
                  condition: '',
                  content: ''
                };
                list.push(current);
                break;
              case 'else':
                current = {
                  type: 'else',
                  condition: '',
                  content: ''
                };
                list.push(current);
                break;
              case 'end':
                break;
              default:
                _this.throwError(state);
            }
          });

          var parser = new ValueParser();
          var strings = list.map(function(item) {
            var content = parser.parse(item.content);
            switch (item.type) {
              case 'if':
                return 'if (' + (item.condition || '') + ') {\nreturn ' + (content || '') + '\n}';
              case 'elseif':
                return ' else if (' + (item.condition || '') + ') {\nreturn ' + (content || '') + '\n}';
              default:
                return ' else {\nreturn ' + (content || '') + '\n}';
            }
          });

          obj.list.push('(function () {\n' + strings.join('') + '\nreturn \'\'\n})()');
          obj.isErractic = true;
        }
      }]);

      return ValueParser;
    })(Parser);

    module.exports = new ValueParser();
  });
  innerDefine('parsers/condition', function(innerRequire, exports, module) {
    'use strict';

    var Parser = innerRequire('./parser');
    var Machine = innerRequire('./machine');

    // @tableStart: condition
    var conditionTableOptions = {
      states: ['name', 'condition'],
      symbols: [/\s/],
      table: [{
        '0': 'condition',
        '-1': 'name'
      }, {
        '0': 'condition',
        '-1': 'condition'
      }]
    };
    // @tableEnd

    var conditionMachine = new Machine(conditionTableOptions);
    var CONDITION_REG = /^\[[\s\S]*\]$/;

    var ConditionParser = (function(_Parser3) {
      _inherits(ConditionParser, _Parser3);

      function ConditionParser() {
        _classCallCheck(this, ConditionParser);

        _get(Object.getPrototypeOf(ConditionParser.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(ConditionParser, [{
        key: 'parse',
        value: function parse(source) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          var expectNodeName = options.expectNodeName;
          this.set(expectNodeName, source, options);

          if (!CONDITION_REG.test(source)) {
            this.throwError('Wrong condition source specification.');
          }

          var _this = this;
          var tag = '';
          var nodeName = '';
          var condition = '';
          conditionMachine.each(source.substr(1, source.length - 2), function(state, token) {
            switch (state) {
              case 'name':
                nodeName += token;
                break;
              case 'condition':
                condition += token;
                break;
              default:
                _this.throwError(state);
            }
          });
          if (expectNodeName && nodeName.toLowerCase() !== expectNodeName) {
            this.throwError();
          }

          if (nodeName === '#elseif') {
            tag = 'else if';
          } else {
            tag = nodeName.substr(1);
          }

          return {
            tag: tag,
            nodeName: nodeName,
            condition: condition.trim()
          };
        }
      }]);

      return ConditionParser;
    })(Parser);

    module.exports = new ConditionParser();
  });
  innerDefine('nodes/element-handler', function(innerRequire, exports, module) {
    'use strict';

    var _ = innerRequire('../util');
    var conditionParser = innerRequire('../parsers/condition');
    var elementParser = innerRequire('../parsers/element');

    // It is just support the if expression.
    var handler = {
      parse: function parse(expressions) {
        var results = [];
        var _this = this;
        _.each(expressions, function(expression) {
          var cNode = conditionParser.parse(expression.source);

          if (expression.children.length === 1) {
            var items1 = _this.parseSingle(cNode.condition, expression.children[0]);
            if (items1.length) results.push(items1);
          } else if (expression.children.length > 1) {
            var items2 = _this.parseMultiple(cNode.condition, expression.children);
            if (items2.length) results.push(items2);
          }
        });
        return results;
      },
      createItem: function createItem(tag, condition, attributes, exclusions) {
        return {
          tag: tag,
          condition: condition || '',
          attributes: attributes || {},
          exclusions: exclusions || []
        };
      },
      parseSingle: function parseSingle(condition, node) {
        var items = [];
        var source = node.source || '';
        var tNode = elementParser.parse('<div ' + source + '>', this.options);

        var attrs = tNode.attributes;
        var attrKeys = Object.keys(attrs);
        if (attrKeys.length) {
          items.push(this.createItem('if', condition, attrs));
          items.push(this.createItem('else', null, null, attrKeys));
        }
        return items;
      },
      parseMultiple: function parseMultiple(condition, nodes) {
        var _this4 = this;

        this.checkFormat(nodes);

        var results = [];
        var hasElse = false;
        var allAttributes = {};

        // parse all attributes
        var item = this.createItem('if', condition);
        results.push(item);
        var parseHandler = function parseHandler(node) {
          if (node.source.indexOf('[#') === 0) {
            var cNode = conditionParser.parse(node.source);
            if (cNode.tag === 'else') {
              item = _this4.createItem(cNode.tag);
              hasElse = true;
            } else {
              item = _this4.createItem(cNode.tag, cNode.condition);
            }
            results.push(item);
          } else {
            var tNode = elementParser.parse('<div ' + node.source + '>');
            _.extend(allAttributes, tNode.attributes);
            _.extend(item.attributes, tNode.attributes);
          }
        };
        _.each(nodes, parseHandler);
        if (!hasElse) item.push(this.createItem('else'));

        // calculete exclusions
        var exclusionHandler = function exclusionHandler(item) {
          item.exclusions = Object.keys(_.omit(allAttributes, item.attributes));
        };
        _.each(results, exclusionHandler);
        return results;
      },
      checkFormat: function checkFormat(nodes) {
        var _this5 = this;

        var lastTag = 'if';
        var checkHandler = function checkHandler(node) {
          var source = node.source || '';
          var isET = source.indexOf('[#') === 0;
          var isElse = source.indexOf('[#else') === 0;
          var isElseIf = source.indexOf('[#elseif') === 0;

          if (isET && !isElseIf && !isElse) {
            _this5.throwError('The attributes expression just support if, else and elseif.');
          } else if (node.source.indexOf('[#elseif') === 0 && lastTag === 'else') {
            _this5.throwError('The elseif node shouldn\'t show after else.');
          } else if (isElseIf) {
            lastTag = 'elseif';
          } else if (isElse) {
            lastTag = 'else';
          } else {
            lastTag = '';
          }
        };
        _.each(nodes, checkHandler);
      }
    };

    module.exports = handler;
  });
  innerDefine('nodes/element', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');

    var _ = innerRequire('../util');
    var elementParser = innerRequire('../parsers/element');
    var valueParser = innerRequire('../parsers/value');
    var elementHandler = innerRequire('./element-handler');

    var NAME_SPACE = 'element';
    var ET_MODEL = 'et-model';
    var PROPERTIY_SET = {
      'INPUT': ['value', 'checked'],
      'TEXTAREA': ['value']
    };

    var Element = (function(_Basic) {
      _inherits(Element, _Basic);

      function Element(source, options, expressions) {
        _classCallCheck(this, Element);

        _get(Object.getPrototypeOf(Element.prototype), 'constructor', this).call(this, source, options);

        this.namespace = NAME_SPACE;
        this.nodeType = 1;
        this.expressions = elementHandler.parse(expressions);
      }

      // 这部分方法和代码是为初始化的时候写的

      _createClass(Element, [{
        key: 'parse',
        value: function parse(source) {
          var tinyNode = elementParser.parse(source, this.options);
          this.modelKey = tinyNode.attributes[ET_MODEL];
          if (this.modelKey)
            delete tinyNode.attributes[ET_MODEL];
          this.attributes = tinyNode.attributes;
          this.nodeName = tinyNode.nodeName.toUpperCase();
        }

      // 接下来的方法都是一些外部或者内部使用的辅助方法
      // 获取那些固定的 不是动态的属性
      }, {
        key: 'getResidentAttributes',
        value: function getResidentAttributes() {
          var attributes = {};
          var properties = {};
          var propertiesList = PROPERTIY_SET[this.nodeName] || [];

          var attrs = this.attributes;
          for (var key in attrs) {
            var value = attrs[key];
            var isProperty = propertiesList.indexOf(key) >= 0;
            if (!valueParser.isErratic(value)) {
              if (isProperty) {
                properties[key] = value;
              } else {
                attributes[key] = value;
              }
            }
          }

          return {
            attributes: attributes,
            properties: properties
          };
        }

      // 获取那些动态的属性
      }, {
        key: 'getErraticAttributes',
        value: function getErraticAttributes() {
          var attrs = this.attributes;
          var erracticMap = {};
          for (var key in attrs) {
            var value = attrs[key];
            if (valueParser.isErratic(value)) {
              erracticMap[key] = value;
            }
          }
          return this.translateAttributesToCode(erracticMap);
        }

      // 将条件表达式转换成为work对象使用的数据
      }, {
        key: 'translateExpressions',
        value: function translateExpressions() {
          var results = [];
          var _this = this;
          _.each(this.expressions, function(items) {
            var newItems = [];
            var valueId = _this.getRootValueId();
            _.each(items, function(item) {
              var obj = _.pick(item, 'tag', 'exclusions', 'condition');
              var attrs = _this.translateAttributesToCode(item.attributes);

              obj.valueId = valueId;
              obj.residentAttributes = attrs.filter(function(attr) {
                return !attr.isErratic;
              });
              obj.erraticAttributes = attrs.filter(function(attr) {
                return attr.isErratic;
              });
              newItems.push(obj);
            });
            results.push(newItems);
          });
          return results;
        }

      // 判断动态属性 并且添加函数判断和设置
      }, {
        key: 'translateAttributesToCode',
        value: function translateAttributesToCode(attrs) {
          var results = [];
          var propertis = PROPERTIY_SET[this.nodeName] || [];

          for (var key in attrs) {
            var value = attrs[key];
            var tmp = {
              key: key,
              isErratic: valueParser.isErratic(value),
              isProperty: propertis.indexOf(key) >= 0,
              value: value,
              valueString: valueParser.parse(value)
            };
            if (tmp.isErratic && !tmp.isProperty) {
              tmp.valueId = this.getRootValueId();
            }
            results.push(tmp);
          }
          return results;
        }
      }, {
        key: 'assembleWorkerData',
        value: function assembleWorkerData() {
          var it = this._workerData;
          if (it) return it;

          var set = this.getResidentAttributes();
          this._workerData = it = {
            id: this.getId(),
            isRoot: this.checkRoot(),
            parentId: this.getParentId(),
            nodeName: this.getNodeName(),
            modelKey: this.modelKey,
            modelType: this.options.modelType,

            attributes: set.attributes,
            properties: set.properties,
            erraticAttributes: this.getErraticAttributes(),
            expressions: this.translateExpressions()
          };
          return it;
        }
      }]);

      return Element;
    })(Basic);

    module.exports = Element;
  });
  innerDefine('nodes/text', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var valueParser = innerRequire('../parsers/value');

    var NAME_SPACE = 'text';

    var TextNode = (function(_Basic2) {
      _inherits(TextNode, _Basic2);

      function TextNode(source) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, TextNode);

        _get(Object.getPrototypeOf(TextNode.prototype), 'constructor', this).call(this, source, options);

        this.namespace = NAME_SPACE;
        this.nodeType = 3;
      }

      _createClass(TextNode, [{
        key: 'parse',
        value: function parse(source) {
          this.textContent = source;
        }
      }, {
        key: 'assembleWorkerData',
        value: function assembleWorkerData() {
          var it = this._workerData;
          if (it) return it;

          var text = this.getTextContent();
          it = {
            id: this.getId(),
            isRoot: this.checkRoot(),
            parentId: this.getParentId(),
            isErratic: valueParser.isErratic(text),
            text: text
          };
          if (it.isErratic) {
            it.valueId = this.getRootValueId();
            it.valueString = valueParser.parse(text);
          }

          this._workerData = it;
          return it;
        }
      }]);

      return TextNode;
    })(Basic);

    module.exports = TextNode;
  });
  innerDefine('nodes/if', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var _ = innerRequire('../util');
    var conditionParser = innerRequire('../parsers/condition');

    var NAME_SPACE = 'if';
    var NODE_NAME = '#' + NAME_SPACE;
    var TAG = NAME_SPACE;

    var IfNode = (function(_Basic3) {
      _inherits(IfNode, _Basic3);

      function IfNode(source, options) {
        _classCallCheck(this, IfNode);

        _get(Object.getPrototypeOf(IfNode.prototype), 'constructor', this).call(this, source, options);

        this.namespace = NAME_SPACE;
        this.isNewTemplate = true;
        this.nodeName = NODE_NAME;
      }

      _createClass(IfNode, [{
        key: 'parse',
        value: function parse(source) {
          var tmp = conditionParser.parse(source, {
            expectNodeName: NODE_NAME
          });
          this.condition = tmp.condition;
        }
      }, {
        key: 'init',
        value: function init() {
          // 调整elseif 和 else的树形关系
          var children = this.children;
          this.children = [];

          var currentNode = this;
          _.each(children, function(child) {
            if (child.nodeName === '#elseif' || child.nodeName === '#else') {
              currentNode.after(child);
              currentNode = child;
            } else {
              currentNode.append(child);
            }
          });
        }
      }, {
        key: 'getTag',
        value: function getTag() {
          return TAG;
        }
      }, {
        key: 'getConditionDoms',
        value: function getConditionDoms() {
          var results = [this.translateDom(this)];

          var hasElse = false;
          var current = this.next;
          while (current) {
            var currentTag = current.getTag();
            if (currentTag === 'else if' || currentTag === 'else') {
              results.push(this.translateDom(current));
            }
            if (currentTag === 'else') {
              hasElse = true;
            }
            if (currentTag !== 'else if') {
              break;
            }
            current = current.next;
          }
          if (!hasElse) results.push(this.translateDom(null));
          return results;
        }
      }, {
        key: 'translateDom',
        value: function translateDom(dom) {
          if (dom) {
            return {
              id: dom.getId(),
              templateName: dom.getTemplateName(),
              args: dom.getArguments(),
              tag: dom.getTag(),
              condition: dom.condition
            };
          } else {
            return {
              tag: 'else',
              condition: '',
              isDefaultElse: true
            };
          }
        }
      }, {
        key: 'assembleWorkerData',
        value: function assembleWorkerData() {
          var it = this._workerData;
          if (it) return it;

          this._workerData = it = {
            id: this.getId(),
            lineId: this.getLineId(),
            parentId: this.getParentId(),
            valueId: this.getRootValueId(),
            saveId: this.getRootValueId(),
            isRoot: this.checkRoot(),
            doms: this.getConditionDoms()
          };
          return it;
        }
      }]);

      return IfNode;
    })(Basic);

    module.exports = IfNode;
  });
  innerDefine('nodes/elseif', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var conditionParser = innerRequire('../parsers/condition');

    var NAME_SPACE = 'elseif';
    var NODE_NAME = '#' + NAME_SPACE;
    var TAG = 'else if';

    var ElseIfNode = (function(_Basic4) {
      _inherits(ElseIfNode, _Basic4);

      function ElseIfNode(source, options) {
        _classCallCheck(this, ElseIfNode);

        _get(Object.getPrototypeOf(ElseIfNode.prototype), 'constructor', this).call(this, source, options);

        this.namespace = NAME_SPACE;
        this.isNewTemplate = true;
        this.nodeName = NODE_NAME;
      }

      _createClass(ElseIfNode, [{
        key: 'parse',
        value: function parse(source) {
          var tmp = conditionParser.parse(source, {
            expectNodeName: NODE_NAME
          });
          this.condition = tmp.condition;
        }
      }, {
        key: 'getCondition',
        value: function getCondition() {
          return this.condition;
        }
      }, {
        key: 'getTag',
        value: function getTag() {
          return TAG;
        }
      }]);

      return ElseIfNode;
    })(Basic);

    module.exports = ElseIfNode;
  });
  innerDefine('nodes/else', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var conditionParser = innerRequire('../parsers/condition');

    var NAME_SPACE = 'else';
    var NODE_NAME = '#' + NAME_SPACE;
    var TAG = NAME_SPACE;

    var ElseNode = (function(_Basic5) {
      _inherits(ElseNode, _Basic5);

      function ElseNode(source, options) {
        _classCallCheck(this, ElseNode);

        _get(Object.getPrototypeOf(ElseNode.prototype), 'constructor', this).call(this, source, options);

        this.namespace = 'else';
        this.isNewTemplate = true;
        this.nodeName = NODE_NAME;
      }

      _createClass(ElseNode, [{
        key: 'parse',
        value: function parse(source) {
          conditionParser.parse(source, {
            expectNodeName: NODE_NAME
          });
        }
      }, {
        key: 'getTag',
        value: function getTag() {
          return TAG;
        }
      }]);

      return ElseNode;
    })(Basic);

    module.exports = ElseNode;
  });
  innerDefine('parsers/for', function(innerRequire, exports, module) {
    'use strict';

    var Parser = innerRequire('./parser');
    var Machine = innerRequire('./machine');

    // @tableStart: for
    var forTableOptions = {
      states: ['start', 'header', 'headerEnd', 'itemName', 'itemEnd', 'indexName', 'indexEnd', 'exStart', 'expression'],
      symbols: ['[', ' in ', ' ', '\r', '\n', ',', ';'],
      table: [{
        '0': 'start',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '-1': 'header'
      }, {
        '0': '',
        '1': '',
        '2': 'headerEnd',
        '3': 'headerEnd',
        '4': 'headerEnd',
        '5': '',
        '6': '',
        '-1': 'header'
      }, {
        '0': '',
        '1': '',
        '2': 'headerEnd',
        '3': 'headerEnd',
        '4': 'headerEnd',
        '5': '',
        '6': '',
        '-1': 'itemName'
      }, {
        '0': 'text',
        '1': 'exStart',
        '2': 'itemEnd',
        '3': 'itemEnd',
        '4': 'itemEnd',
        '5': 'itemEnd',
        '6': 'itemEnd',
        '-1': 'itemName'
      }, {
        '0': '',
        '1': 'exStart',
        '2': 'itemEnd',
        '3': 'itemEnd',
        '4': 'itemEnd',
        '5': '',
        '6': '',
        '-1': 'indexName'
      }, {
        '0': '',
        '1': 'exStart',
        '2': 'indexEnd',
        '3': 'indexEnd',
        '4': 'indexEnd',
        '5': 'indexEnd',
        '6': 'indexEnd',
        '-1': 'indexName'
      }, {
        '0': '',
        '1': 'exStart',
        '2': 'indexEnd',
        '3': 'indexEnd',
        '4': 'indexEnd',
        '5': '',
        '6': '',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': 'exStart',
        '3': 'exStart',
        '4': 'exStart',
        '5': '',
        '6': '',
        '-1': 'expression'
      }, {
        '0': 'expression',
        '1': 'expression',
        '2': 'expression',
        '3': 'expression',
        '4': 'expression',
        '5': 'expression',
        '6': 'expression',
        '-1': 'expression'
      }]
    };
    // @tableEnd
    var forMachine = new Machine(forTableOptions);

    var ForParser = (function(_Parser4) {
      _inherits(ForParser, _Parser4);

      function ForParser() {
        _classCallCheck(this, ForParser);

        _get(Object.getPrototypeOf(ForParser.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(ForParser, [{
        key: 'parse',
        value: function parse(source, options) {
          this.set('#for', source, options);

          var _this = this;
          var nodeName = '';
          var itemName = '';
          var indexName = '';
          var expression = '';
          var lastToken = '';
          forMachine.each(source, function(state, token) {
            lastToken = token;
            switch (state) {
              case 'start':
              case 'headerEnd':
              case 'itemEnd':
              case 'indexEnd':
              case 'exStart':
                break;
              case 'header':
                nodeName += token;
                break;
              case 'itemName':
                itemName += token;
                break;
              case 'indexName':
                indexName += token;
                break;
              case 'expression':
                expression += token;
                break;
              default:
                _this.throwError(state);
            }
          });
          if (lastToken !== ']') {
            this.throwError();
          }
          nodeName = nodeName.trim().toLowerCase();
          itemName = itemName.trim();
          indexName = indexName.trim();
          expression = expression.substr(0, expression.length - 1).trim();

          if (nodeName !== '#for') {
            this.throwError();
          }
          if (!itemName) {
            this.throwError();
          }
          if (!expression) {
            this.throwError();
          }

          return {
            nodeName: nodeName,
            itemName: itemName,
            indexName: indexName,
            expression: expression
          };
        }
      }]);

      return ForParser;
    })(Parser);

    module.exports = new ForParser();
  });
  innerDefine('nodes/for', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var forParser = innerRequire('../parsers/for');

    var NAME_SPACE = 'for';
    var NODE_NAME = '#' + NAME_SPACE;
    var defaults = {
      itemName: 'item',
      indexName: 'i',
      lengthName: 'len'
    };

    var ForNode = (function(_Basic6) {
      _inherits(ForNode, _Basic6);

      function ForNode(source, options) {
        _classCallCheck(this, ForNode);

        _get(Object.getPrototypeOf(ForNode.prototype), 'constructor', this).call(this, source, options);

        this.namespace = NAME_SPACE;
        this.isNewTemplate = true;
        this.nodeName = NODE_NAME;
      }

      _createClass(ForNode, [{
        key: 'parse',
        value: function parse(source) {
          var tmp = forParser.parse(source);

          this.itemName = tmp.itemName;
          this.indexName = tmp.indexName;
          this.expression = tmp.expression;
          if (tmp.indexName) {
            this.saveArgument(tmp.itemName, tmp.indexName);
          } else {
            this.saveArgument(tmp.itemName);
          }
        }
      }, {
        key: 'checkIsImportTemplate',
        value: function checkIsImportTemplate() {
          return this.children.length === 1 && this.children[0].nodeName === '#import';
        }
      }, {
        key: 'assembleWorkerData',
        value: function assembleWorkerData() {
          var it = this._workerData;
          if (it) return it;

          it = {
            id: this.getId(),
            lineId: this.getLineId(),
            parentId: this.getParentId(),
            valueId: this.getRootValueId(),
            isRoot: this.checkRoot(),
            expression: this.expression || this.condition,
            indexName: this.indexName || defaults.indexName,
            itemName: this.itemName || defaults.itemName,
            templateName: this.getTemplateName(),
            args: this.getArguments()
          };

          if (this.checkIsImportTemplate()) {
            var child = this.children[0];
            it.templateName = child.getTemplateName();
            it.args = child.getArguments();
          }

          this._workerData = it;
          return it;
        }
      }]);

      return ForNode;
    })(Basic);

    module.exports = ForNode;
  });
  innerDefine('nodes/html', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var conditionParser = innerRequire('../parsers/condition');
    var valueParser = innerRequire('../parsers/value');

    var NAME_SPACE = 'html';
    var NODE_NAME = '#' + NAME_SPACE;

    var HtmlNode = (function(_Basic7) {
      _inherits(HtmlNode, _Basic7);

      function HtmlNode() {
        _classCallCheck(this, HtmlNode);

        _get(Object.getPrototypeOf(HtmlNode.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(HtmlNode, [{
        key: 'parse',
        value: function parse(source) {
          var tmp = conditionParser.parse(source, {
            expectNodeName: NODE_NAME
          });

          this.namespace = NAME_SPACE;
          this.nodeName = NODE_NAME;
          var expression = tmp.condition;
          this.expression = expression.slice(1, expression.length - 1);
        }
      }, {
        key: 'init',
        value: function init() {
          if (!this.parent) {
            this.throwError('html node need a parent');
          }
          if (this.parent.nodeType !== 1) {
            this.throwError('the parent of html node should be element node');
          }
          if (this.parent.children.length > 1) {
            this.throwError('html node should not has siblings');
          }
        }
      }, {
        key: 'assembleWorkerData',
        value: function assembleWorkerData() {
          var it = this._workerData;
          if (it) return it;

          var expression = this.expression;
          it = {
            parentId: this.getParentId(),
            isErratic: valueParser.isErratic(expression),
            expression: this.expression
          };

          if (it.isErratic) {
            it.valueId = this.getRootValueId();
            it.valueString = valueParser.parse(expression);
          }

          this._workerData = it;
          return it;
        }
      }]);

      return HtmlNode;
    })(Basic);

    module.exports = HtmlNode;
  });
  innerDefine('nodes/import', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var conditionParser = innerRequire('../parsers/condition');

    var NAME_SPACE = 'import';
    var NODE_NAME = '#' + NAME_SPACE;
    var PARAMETER_SPLIT = ',';

    var ImportNode = (function(_Basic8) {
      _inherits(ImportNode, _Basic8);

      function ImportNode(source, options) {
        _classCallCheck(this, ImportNode);

        _get(Object.getPrototypeOf(ImportNode.prototype), 'constructor', this).call(this, source, options);

        this.namespace = NAME_SPACE;
        this.nodeName = NODE_NAME;
      }

      _createClass(ImportNode, [{
        key: 'parse',
        value: function parse(source) {
          var tmp = conditionParser.parse(source, {
            expectNodeName: NODE_NAME
          });
          var list = tmp.condition.split(PARAMETER_SPLIT);

          var path = list[0] || '';
          var isSingleQuotation = path[0] === '\'' && path[path.length - 1] === '\'';
          var isDoubleQuotation = path[0] === '"' && path[path.length - 1] === '"';
          if (isSingleQuotation || isDoubleQuotation) {
            path = path.slice(1, path.length - 1);
          }
          this.importPath = path;

          var args = [];
          for (var i = 1, len = list.length; i < len; i++) {
            var str = list[i] || '';
            str = str.trim();
            if (str) args.push(str);
          }
          if (!args.length) args.push('it');
          this.importArgs = args;
        }
      }, {
        key: 'getPath',
        value: function getPath() {
          return this.importPath;
        }
      }, {
        key: 'getArguments',
        value: function getArguments() {
          return this.importArgs;
        }
      }, {
        key: 'assembleWorkerData',
        value: function assembleWorkerData() {
          var it = this._workerData;
          if (it) return it;

          this._workerData = it = {
            id: this.getId(),
            lineId: this.getLineId(),
            parentId: this.getParentId(),
            args: this.getArguments(),
            path: this.getPath(),
            templateName: this.getTemplateName()
          };

          return it;
        }
      }, {
        key: 'deliverDependencies',
        value: function deliverDependencies() {
          return [{
            name: this.getTemplateName(),
            path: this.getPath()
          }];
        }
      }]);

      return ImportNode;
    })(Basic);

    module.exports = ImportNode;
  });
  innerDefine('nodes/factory', function(innerRequire, exports, module) {
    'use strict';

    var NodeElement = innerRequire('./element');
    var NodeText = innerRequire('./text');
    var NodeBasic = innerRequire('./basic');
    var NodeIf = innerRequire('./if');
    var NodeElseif = innerRequire('./elseif');
    var NodeElse = innerRequire('./else');
    var NodeFor = innerRequire('./for');
    var NodeHtml = innerRequire('./html');
    var NodeImport = innerRequire('./import');

    var nodes = {
      '_element': NodeElement,
      '_text': NodeText,
      '_base': NodeBasic,
      '#if': NodeIf,
      '#elseif': NodeElseif,
      '#else': NodeElse,
      '#for': NodeFor,
      '#html': NodeHtml,
      '#import': NodeImport
    };

    var Factory = (function() {
      function Factory() {
        _classCallCheck(this, Factory);
      }

      _createClass(Factory, [{
        key: 'create',
        value: function create(source, options, expressions) {
          var Constructor = this.findConstuctor(source);
          var node = new Constructor(source, options, expressions);
          return node;
        }
      }, {
        key: 'getNodeName',
        value: function getNodeName(source) {
          var htmlMatch = /^<(\w+)[ >]|^<(\w+)$/.exec(source);
          var etMatch = /^\[(#\w+)[ \]]|^\[(#\w+)\]$/.exec(source);
          if (!source) {
            return '';
          } else if (htmlMatch) {
            return htmlMatch[1] || htmlMatch[2];
          } else if (etMatch) {
            return etMatch[1] || etMatch[2];
          }
          return '';
        }
      }, {
        key: 'findConstuctor',
        value: function findConstuctor(source) {
          var nodeName = this.getNodeName(source).toLowerCase();
          var Constructor = null;

          if (!source) {
            Constructor = nodes._base;
          } else if (!nodeName) {
            Constructor = nodes._text;
          } else if (nodeName.indexOf('#') === 0) {
            Constructor = nodes[nodeName];
          } else {
            Constructor = nodes._element;
          }

          if (!Constructor) {
            Constructor = nodes._base;
          }
          return Constructor;
        }
      }]);

      return Factory;
    })();

    module.exports = new Factory();
  });
  innerDefine('parser', function(innerRequire, exports, module) {
    'use strict';

    var _ = innerRequire('./util');
    var originParser = innerRequire('./parsers/origin');
    var dotParser = innerRequire('./parsers/dot');
    var factory = innerRequire('./nodes/factory');

    var Parser = (function() {
      function Parser(options) {
        _classCallCheck(this, Parser);

        this.options = options;
      }

      _createClass(Parser, [{
        key: 'parse',
        value: function parse(str) {
          var originNode = originParser.parse(str);
          return this.createDom(originNode);
        }
      }, {
        key: 'parseDot',
        value: function parseDot(str) {
          str = dotParser.parse(str);
          return this.parse(str);
        }
      }, {
        key: 'createDom',
        value: function createDom(originNode) {
          var options = this.options;
          var index = 0;
          var createNode = function createNode(source, expressions) {
            var node = factory.create(source, options, expressions);
            node.setIndex(index++);
            return node;
          };
          var createChildren = function createChildren(parent, origin) {
            var children = origin.children || [];
            _.each(children, function(child) {
              var node = createNode(child.source, child.expressions);
              createChildren(node, child);
              parent.append(node);
            });
          };

          var root = createNode();
          createChildren(root, originNode);
          root.initAll();
          return root;
        }
      }]);

      return Parser;
    })();

    module.exports = Parser;
  });

  innerDefine('et', function(innerRequire, exports, module) {
    var Compiler = innerRequire('./compiler');
    var Parser = innerRequire('./parser');
    var ET = function ET(options) {
      if (!options)
        options = {};
      this.options = options;
      this.parser = new Parser(options.parser);
      this.compiler = new Compiler(options.compiler);
    };
    ET.prototype.compile = function(str, options) {
      var dom = this.parser.parse(str);
      var result = this.compiler.compile(dom);
      var fn = new Function('require', 'exports', 'module', result);
      var _module = {};
      var _exports = {};
      fn(require, _exports, _module);
      return _module.exports || _exports;
    };
    module.exports = ET;
  });
  module.exports = modules.et;
});