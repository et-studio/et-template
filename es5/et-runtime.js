;(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('et-runtime', factory)
  } else {
    var require = function() {}
    var module = {}
    var exports = {}
    factory(require, exports, module)
    global['et-runtime'] = module.exports
  }
})(window, function(require, exports, module) {
  'use strict';

  var _get = function get(_x9, _x10, _x11) {
    var _again = true;
    _function:
    while (_again) {
      var object = _x9,
        property = _x10,
        receiver = _x11;
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
          _x9 = parent;
          _x10 = property;
          _x11 = receiver;
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
  innerDefine('middlewares/basic-middleware', function(innerRequire, exports, module) {
    'use strict';

    var BasicMiddleware = (function() {
      function BasicMiddleware() {
        _classCallCheck(this, BasicMiddleware);
      }

      _createClass(BasicMiddleware, [{
        key: 'run',
        value: function run(last, options) {
          return last;
        }
      }]);

      return BasicMiddleware;
    })();

    module.exports = BasicMiddleware;
  });
  innerDefine('middlewares/attributes', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic-middleware');

    var MiddlewareAttributes = (function(_Basic) {
      _inherits(MiddlewareAttributes, _Basic);

      function MiddlewareAttributes() {
        _classCallCheck(this, MiddlewareAttributes);

        _get(Object.getPrototypeOf(MiddlewareAttributes.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(MiddlewareAttributes, [{
        key: 'run',
        value: function run(last, options) {
          return last;
        }
      }]);

      return MiddlewareAttributes;
    })(Basic);

    module.exports = new MiddlewareAttributes();
  });
  innerDefine('middlewares/checker', function(innerRequire, exports, module) {
    'use strict';

    var _ = innerRequire('../util');
    var Basic = innerRequire('./basic-middleware');

    var MiddlewareChecker = (function(_Basic2) {
      _inherits(MiddlewareChecker, _Basic2);

      function MiddlewareChecker() {
        _classCallCheck(this, MiddlewareChecker);

        _get(Object.getPrototypeOf(MiddlewareChecker.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(MiddlewareChecker, [{
        key: 'run',
        value: function run(node, options) {
          node.each(this.checkHandler.bind(this));
          return node;
        }
      }, {
        key: 'checkHandler',
        value: function checkHandler(node) {
          switch (node.nodeName) {
            case '#html':
              this.checkHtml(node);
              break;
          }
        // if (node.expressions) this.checkExpressions(node, node.expressions)
        }
      }, {
        key: 'checkExpressions',
        value: function checkExpressions(node, expressions) {
          var _this2 = this;

          _.each(expressions, function(expressionNode) {
            if (expressionNode.nodeName !== '#if') {
              _this2.throwError(node, 'The attributes expression just support if, else and elseif.');
            }

            var lastTag = 'if';
            _.each(expressionNode.children, function(childNode) {
              var isET = childNode.nodeType === 'ET';
              var isElse = childNode.nodeName === '#else';
              var isElseIf = childNode.nodeName === '#elseif';

              if (isET && !isElseIf && !isElse) {
                _this2.throwError(node, 'The attributes expression just support if, else and elseif.');
              } else if (isElseIf && lastTag === 'else') {
                _this2.throwError(node, 'The elseif node shouldn\'t show after else.');
              } else if (isElseIf) {
                lastTag = 'elseif';
              } else if (isElse) {
                lastTag = 'else';
              } else {
                lastTag = '';
              }
            });
          });
        }
      }, {
        key: 'checkHtml',
        value: function checkHtml(node) {
          if (!node.parent) {
            this.throwError(node, 'html node need a parent');
          }
          if (node.parent.nodeType !== 1) {
            this.throwError(node, 'the parent of html node should be element node');
          }
          if (node.parent.children.length > 1) {
            this.throwError(node, 'html node should not has siblings');
          }
        }
      }, {
        key: 'throwError',
        value: function throwError(node, message) {
          throw new Error(message);
        }
      }]);

      return MiddlewareChecker;
    })(Basic);

    module.exports = new MiddlewareChecker();
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

        re = re + ('\nangular.module(\'et.template\').factory(\'' + it.moduleId + '\', [' + paths.join(',') + ', function(' + variables.join(',') + ') {\n' + this.compile_template(it) + '\nreturn function(option) {\nreturn new ' + it.templateName + '(option)\n}\n}]);\n');

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
          re = re + ('\n_tp_bind(_this, ' + it.id + ', \'change keyup\', function (e) {\n_tp_setContext(_this, \'' + _.translateMarks(it.modelKey) + '\', e.target.value)\n})\n');
        }

        return re;
      },
      element_update: function element_update(it) {
        var _this3 = this;

        var re = '';

        if (it.erraticAttributes.length || it.expressions.length) {
          re = re + ('\n' + this.attributes_update(it, it.erraticAttributes) + '\n');

          _.each(it.expressions, function(items) {
            _.each(items, function(item, i) {
              var condition = '';
              if (item.tag !== 'else') {
                condition = '(' + item.condition + ')';
              }
              re = re + ('\n' + item.tag + ' ' + condition + ' {\nif (_last[' + item.valueId + '] !== ' + i + ') {\n_last[' + item.valueId + '] = ' + i + '\n' + _this3.attributes_update(it, item.residentAttributes) + '\n' + _this3.attributes_remove(it, item.exclusions) + '\n}\n' + _this3.attributes_update(it, item.erraticAttributes) + '\n}\n');
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

        re = re + ('\nvar ' + it.templateName + ' = _dep_createTemplate({\ncreate: function () {\nvar _this = this\n' + it.createList.join('\n') + '\n}' + (it.updateList.length ? ',' : '') + '\n');
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
  innerDefine('middlewares/compiler', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic-middleware');
    var worker = innerRequire('../worker');

    var MiddlewareCompiler = (function(_Basic3) {
      _inherits(MiddlewareCompiler, _Basic3);

      function MiddlewareCompiler() {
        _classCallCheck(this, MiddlewareCompiler);

        _get(Object.getPrototypeOf(MiddlewareCompiler.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(MiddlewareCompiler, [{
        key: 'run',
        value: function run(node, options) {
          var it = this.pickData(node, options);
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
      }, {
        key: 'pickData',
        value: function pickData(root, options) {
          var dependencies = root.getDependencies();
          dependencies.unshift({
            name: options.dependencyName,
            path: options.dependencyPath
          });
          return {
            templateName: root.getTemplateName(),
            dependencies: dependencies,
            moduleId: options.moduleId,
            newDoms: root.getNewTemplateDoms()
          };
        }
      }]);

      return MiddlewareCompiler;
    })(Basic);

    module.exports = new MiddlewareCompiler();
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
  innerDefine('middlewares/dot', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic-middleware');
    var dotParser = innerRequire('../parsers/dot');

    var MiddlewareDot = (function(_Basic4) {
      _inherits(MiddlewareDot, _Basic4);

      function MiddlewareDot() {
        _classCallCheck(this, MiddlewareDot);

        _get(Object.getPrototypeOf(MiddlewareDot.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(MiddlewareDot, [{
        key: 'run',
        value: function run(str, options) {
          return dotParser.parse(str);
        }
      }]);

      return MiddlewareDot;
    })(Basic);

    module.exports = new MiddlewareDot();
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
        this.symbolsMap = this.mapSymbals(options.symbols || []);
        this.symbols = this.sortSymbols(options.symbols || []);
        this.states = options.states || [];
        this.table = options.table || [];
        this.startState = options.startState || this.states[0];
      }

      _createClass(Machine, [{
        key: 'mapSymbals',
        value: function mapSymbals(symbols) {
          var map = new Map();
          _.each(symbols, function(symbol, i) {
            map.set(symbol, i);
          });
          return map;
        }
      }, {
        key: 'sortSymbols',
        value: function sortSymbols(symbols) {
          return symbols.sort(function(left, right) {
            if (left.test && !right.test) return 1;else if (!left.test && right.test) return -1;else if (left.test && right.test) return 0;

            if (left.indexOf(right) === 0) return -1;else if (right.indexOf(left) === 0) return 1;else return 0;
          });
        }
      }, {
        key: 'getTokenSet',
        value: function getTokenSet(str, index) {
          var symbols = this.symbols;
          var char = str[index];
          var token = char;
          var kickSymbol = '';

          _.each(symbols, function(symbol, i) {
            if (symbol && typeof symbol.test === 'function') {
              if (symbol.test(char)) {
                token = char;
                kickSymbol = symbol;
                return false;
              }
            } else if (symbol && symbol.length) {
              var tmp = str.substr(index, symbol.length);
              if (tmp === symbol) {
                token = symbol;
                kickSymbol = symbol;
                return false;
              }
            }
          });

          var symbolIndex = this.symbolsMap.get(kickSymbol);
          if (!(symbolIndex >= 0))
            symbolIndex = -1;
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
  innerDefine('parsers/format', function(innerRequire, exports, module) {
    'use strict';

    var Parser = innerRequire('./parser');
    var Machine = innerRequire('./machine');
    var _ = innerRequire('../util');
    var worker = innerRequire('../worker');

    // @tableStart: format
    var formatTableOptions = {
      states: ['header', 'body', 'start', 'method', '_h1', '_h2', '_h3', '_str1', '_str2', '_str3'],
      symbols: [/\s/, '_tp_', '\\\'', '\\"', '\\`', '\'', '"', '`', '(', '// @_tp_mark', /\w/],
      table: [{
        '0': 'header',
        '1': 'header',
        '2': 'header',
        '3': 'header',
        '4': 'header',
        '5': '_h1',
        '6': '_h2',
        '7': '_h3',
        '8': 'header',
        '9': 'body',
        '10': 'header',
        '-1': 'header'
      }, {
        '0': 'body',
        '1': 'start',
        '2': 'body',
        '3': 'body',
        '4': 'body',
        '5': '_str1',
        '6': '_str2',
        '7': '_str3',
        '8': 'body',
        '9': 'body',
        '10': 'body',
        '-1': 'body'
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
        '9': 'method',
        '10': 'method',
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
        '8': 'end:body',
        '9': 'method',
        '10': 'method',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '_last',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '_last',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '_last',
        '8': '',
        '9': '',
        '10': '',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '_last',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '_last',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '-1': ''
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '_last',
        '8': '',
        '9': '',
        '10': '',
        '-1': ''
      }]
    };
    // @tableEnd
    var formatMachine = new Machine(formatTableOptions);

    var FormatParser = (function(_Parser) {
      _inherits(FormatParser, _Parser);

      function FormatParser() {
        _classCallCheck(this, FormatParser);

        _get(Object.getPrototypeOf(FormatParser.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(FormatParser, [{
        key: 'parse',
        value: function parse(str) {
          var it = this.parseData(str);
          return worker.format_tp(it);
        }
      }, {
        key: 'parseData',
        value: function parseData(str) {
          var header = '';
          var methods = [];
          var body = '';

          var method = '';
          var _this = this;
          formatMachine.each(str, function(state, token) {
            switch (state) {
              case 'header':
              case '_h1':
              case '_h2':
              case '_h3':
                header += token;
                break;
              case 'body':
              case '_str1':
              case '_str2':
              case '_str3':
                body += token;
                break;
              case 'start':
                method = token;
                break;
              case 'method':
                method += token;
                break;
              case 'end':
                methods.push(method);
                body = '' + body + method + token;
                break;
              default:
                console.log(state);
                _this.throwError(state);
            }
          });
          return {
            header: header,
            methods: _.uniq(methods),
            body: body
          };
        }
      }]);

      return FormatParser;
    })(Parser);

    module.exports = new FormatParser();
  });
  innerDefine('middlewares/formatter', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic-middleware');
    var formatParser = innerRequire('../parsers/format');

    var LINE_SPLIT = '\n';

    var MiddlewareFormatter = (function(_Basic5) {
      _inherits(MiddlewareFormatter, _Basic5);

      function MiddlewareFormatter() {
        _classCallCheck(this, MiddlewareFormatter);

        _get(Object.getPrototypeOf(MiddlewareFormatter.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(MiddlewareFormatter, [{
        key: 'run',
        value: function run(content, options) {
          content = formatParser.parse(content);
          content = this.removeComments(content);
          return content;
        }
      }, {
        key: 'removeComments',
        value: function removeComments(content) {
          var list = content.split(LINE_SPLIT);
          var results = [];
          for (var i = 0, len = list.length; i < len; i++) {
            var item = list[i].trim();
            if (item.indexOf('//') !== 0) results.push(item);
          }
          return results.join(LINE_SPLIT);
        }
      }]);

      return MiddlewareFormatter;
    })(Basic);

    module.exports = new MiddlewareFormatter();
  });
  innerDefine('middlewares/rebuilder', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic-middleware');
    var _ = innerRequire('../util');

    var MiddlewareRebuilder = (function(_Basic6) {
      _inherits(MiddlewareRebuilder, _Basic6);

      function MiddlewareRebuilder() {
        _classCallCheck(this, MiddlewareRebuilder);

        _get(Object.getPrototypeOf(MiddlewareRebuilder.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(MiddlewareRebuilder, [{
        key: 'run',
        value: function run(node, options) {
          while (this.rebuildAll(node)) {
          }
          return node;
        }
      }, {
        key: 'rebuildAll',
        value: function rebuildAll(node) {
          var _this4 = this;

          var isChangeConstructor = false;
          node.each(function(currentNode) {
            switch (currentNode.nodeName) {
              case '#if':
                isChangeConstructor = _this4.rebuildIfNode(currentNode);
                if (isChangeConstructor) return false; // break each loop
                break;
            }
          });
          return isChangeConstructor;
        }
      }, {
        key: 'rebuildIfNode',
        value: function rebuildIfNode(node) {
          var isChangeConstructor = false;

          var children = node.children;
          node.children = [];
          var currentNode = node;
          _.each(children, function(child) {
            if (child.nodeName === '#elseif' || child.nodeName === '#else') {
              currentNode.after(child);
              currentNode = child;
              isChangeConstructor = true;
            } else {
              currentNode.append(child);
            }
          });
          return isChangeConstructor;
        }
      }]);

      return MiddlewareRebuilder;
    })(Basic);

    module.exports = new MiddlewareRebuilder();
  });
  innerDefine('middlewares/ng-rebuilder', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic-middleware');

    var MiddlewareNgRebuilder = (function(_Basic7) {
      _inherits(MiddlewareNgRebuilder, _Basic7);

      function MiddlewareNgRebuilder() {
        _classCallCheck(this, MiddlewareNgRebuilder);

        _get(Object.getPrototypeOf(MiddlewareNgRebuilder.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(MiddlewareNgRebuilder, [{
        key: 'run',
        value: function run(last, options) {
          return last;
        }
      }]);

      return MiddlewareNgRebuilder;
    })(Basic);

    module.exports = new MiddlewareNgRebuilder();
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

      function Basic(origin, options) {
        _classCallCheck(this, Basic);

        _get(Object.getPrototypeOf(Basic.prototype), 'constructor', this).call(this, origin, options);

        this.origin = origin;
        this.options = options;
        this.nodeType = origin.nodeType || 'ET';
        this.nodeName = origin.nodeName;

        this.isNewTemplate = false;
        this.args = [];

        this.children = [];
        this.parse(origin.source);
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
          this.children.map(function(node) {
            return node.each(callback);
          });
        }

      // functions could be override
      }, {
        key: 'parse',
        value: function parse(source) {}
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

    var ElementParser = (function(_Parser2) {
      _inherits(ElementParser, _Parser2);

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
          var _this5 = this;

          if (attrs === undefined)
            attrs = {};

          var re = {};
          var filter = this.getAttributeFilter(options);

          attrs.map(function(attr) {
            if (!attr.key) _this5.throwError();
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

    var ValueParser = (function(_Parser3) {
      _inherits(ValueParser, _Parser3);

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

          obj.list.push('(' + str + ')');
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

    var ConditionParser = (function(_Parser4) {
      _inherits(ConditionParser, _Parser4);

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
        var _this6 = this;

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
              item = _this6.createItem(cNode.tag);
              hasElse = true;
            } else {
              item = _this6.createItem(cNode.tag, cNode.condition);
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

    var Element = (function(_Basic8) {
      _inherits(Element, _Basic8);

      function Element(origin, options) {
        _classCallCheck(this, Element);

        _get(Object.getPrototypeOf(Element.prototype), 'constructor', this).call(this, origin, options);

        this.namespace = NAME_SPACE;
        this.nodeType = 1;
        this.expressions = elementHandler.parse(origin.expressions);
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

    var TextNode = (function(_Basic9) {
      _inherits(TextNode, _Basic9);

      function TextNode(origin) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, TextNode);

        _get(Object.getPrototypeOf(TextNode.prototype), 'constructor', this).call(this, origin, options);

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
    var conditionParser = innerRequire('../parsers/condition');

    var NAME_SPACE = 'if';
    var NODE_NAME = '#' + NAME_SPACE;
    var TAG = NAME_SPACE;

    var IfNode = (function(_Basic10) {
      _inherits(IfNode, _Basic10);

      function IfNode(origin, options) {
        _classCallCheck(this, IfNode);

        _get(Object.getPrototypeOf(IfNode.prototype), 'constructor', this).call(this, origin, options);

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

    var ElseIfNode = (function(_Basic11) {
      _inherits(ElseIfNode, _Basic11);

      function ElseIfNode(origin, options) {
        _classCallCheck(this, ElseIfNode);

        _get(Object.getPrototypeOf(ElseIfNode.prototype), 'constructor', this).call(this, origin, options);

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

    var ElseNode = (function(_Basic12) {
      _inherits(ElseNode, _Basic12);

      function ElseNode(origin, options) {
        _classCallCheck(this, ElseNode);

        _get(Object.getPrototypeOf(ElseNode.prototype), 'constructor', this).call(this, origin, options);

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

    var ForParser = (function(_Parser5) {
      _inherits(ForParser, _Parser5);

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

    var ForNode = (function(_Basic13) {
      _inherits(ForNode, _Basic13);

      function ForNode(origin, options) {
        _classCallCheck(this, ForNode);

        _get(Object.getPrototypeOf(ForNode.prototype), 'constructor', this).call(this, origin, options);

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

    var HtmlNode = (function(_Basic14) {
      _inherits(HtmlNode, _Basic14);

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

    var ImportNode = (function(_Basic15) {
      _inherits(ImportNode, _Basic15);

      function ImportNode(origin, options) {
        _classCallCheck(this, ImportNode);

        _get(Object.getPrototypeOf(ImportNode.prototype), 'constructor', this).call(this, origin, options);

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
        value: function create(originNode, options) {
          if (originNode === undefined)
            originNode = {};

          var Constructor = this.findConstuctor(originNode.nodeType, originNode.nodeName);
          var node = new Constructor(originNode, options);
          return node;
        }
      }, {
        key: 'findConstuctor',
        value: function findConstuctor(nodeType, nodeName) {
          switch (nodeType) {
            case 1:
              return nodes._element;
            case 3:
              return nodes._text;
            default:
              return nodes[nodeName] || nodes._base;
          }
        }
      }]);

      return Factory;
    })();

    module.exports = new Factory();
  });
  innerDefine('middlewares/node-creator', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic-middleware');
    var _ = innerRequire('../util');
    var factory = innerRequire('../nodes/factory');

    var MiddlewareParser = (function(_Basic16) {
      _inherits(MiddlewareParser, _Basic16);

      function MiddlewareParser() {
        _classCallCheck(this, MiddlewareParser);

        _get(Object.getPrototypeOf(MiddlewareParser.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(MiddlewareParser, [{
        key: 'run',
        value: function run(origin, options) {
          return this.createNode(origin, options);
        }
      }, {
        key: 'createNode',
        value: function createNode(originNode, options) {
          var index = 0;
          var createNode = function createNode(originNode) {
            var node = factory.create(originNode, options);
            node.setIndex(index++);
            return node;
          };
          var createChildren = function createChildren(parent, origin) {
            var children = origin.children || [];
            _.each(children, function(originNode) {
              var node = createNode(originNode);
              createChildren(node, originNode);
              parent.append(node);
            });
            return parent;
          };

          var root = createNode();
          return createChildren(root, originNode);
        }
      }]);

      return MiddlewareParser;
    })(Basic);

    module.exports = new MiddlewareParser();
  });
  innerDefine('nodes/origin', function(innerRequire, exports, module) {
    var _ = innerRequire('../util');

    // OriginNode first parse
    // - source
    // - children
    // - expressions
    //
    // OriginNode second parse
    // - nodeName
    // - header
    // - nodeType     [1, 3, 'ET']
    //
    // OriginNode second parse
    // - attributes   {key, value}
    //

    var OriginNode = (function() {
      function OriginNode(source) {
        _classCallCheck(this, OriginNode);

        this.source = source || '';
        this.nodeName = '';
        this.header = '';

        this.children = [];
        this.expressions = [];

        this.nodeType = null;
        this.attributes = null;

        this.state = null;
        this.isHeaderClosed = false;
        this.isClosed = false;
      }

      _createClass(OriginNode, [{
        key: 'addSource',
        value: function addSource(token) {
          this.source += token;
          switch (this.state) {
            case 'nodeName':
              this.nodeName += token;
              break;
            case 'header':
              this.header += token;
              break;
          }
        }
      }, {
        key: 'setState',
        value: function setState(state) {
          this.state = state;
        }
      }, {
        key: 'startNodeName',
        value: function startNodeName(token) {
          if (token === '[#')
            this.nodeName = '#';
          this.addSource(token);
          this.setState('nodeName');
        }
      }, {
        key: 'startHeader',
        value: function startHeader(token) {
          this.setState('header');
          this.addSource(token);
        }
      }, {
        key: 'closeHeader',
        value: function closeHeader(token) {
          this.setState('headerClosed');
          this.isHeaderClosed = true;

          this.addSource(token);
          this.saveChildrenToExpressions();
        }
      }, {
        key: 'closeNode',
        value: function closeNode(tail) {
          var current = this;
          while (current.parent) {
            if (current.matchClose(tail)) {
              current.isClosed = true;
              break;
            }
            current = current.parent;
          }
          current.closeAll();
          return current.parent || current;
        }
      }, {
        key: 'createChild',
        value: function createChild(source) {
          var node = new OriginNode(source);
          this.children.push(node);
          node.parent = this;
          return node;
        }
      }, {
        key: 'closeAll',
        value: function closeAll() {
          _.each(this.children, function(child) {
            child.closeAll();
          });

          if (this.parent && !this.isClosed) {
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

          var currentNodeName = this.nodeName;
          var tailNodeName = tail.slice(1, tail.length - 1).trim();
          return '/' + currentNodeName === tailNodeName;
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
          this.children.map(function(child) {
            if (child && child.source.trim()) {
              child.removeEmptyNode();
              newChildren.push(child);
            }
          });
          this.children = newChildren;
        }
      }, {
        key: 'each',
        value: function each(callback) {
          callback(this);
          this.children.map(function(child) {
            child.each(callback);
          });
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
      states: ['text', 'nnStart', 'nodeName', 'hHeader', 'etHeader', 'hTail', 'etTail', '_str[', '_str{{', '_str1', '_str2', '_str3', '_comment'],
      symbols: ['<', '</', '>', '[#', '[/#', '[', ']', '<!--', '-->', '\'', '\\\'', '"', '\\"', '`', '\\`', '{{', '}}', /\s/, /\w/],
      table: [{
        '0': 'nnStart',
        '1': 'hTail',
        '2': 'text',
        '3': 'nnStart',
        '4': 'etTail',
        '5': 'text',
        '6': 'text',
        '7': '_comment',
        '8': 'text',
        '9': 'text',
        '10': 'text',
        '11': 'text',
        '12': 'text',
        '13': 'text',
        '14': 'text',
        '15': '_str{{',
        '16': 'text',
        '17': 'text',
        '18': 'text',
        '-1': 'text'
      }, {
        '0': 'nodeName',
        '1': 'nodeName',
        '2': 'nodeName',
        '3': 'nodeName',
        '4': 'nodeName',
        '5': 'nodeName',
        '6': 'nodeName',
        '7': 'nodeName',
        '8': 'nodeName',
        '9': 'nodeName',
        '10': 'nodeName',
        '11': 'nodeName',
        '12': 'nodeName',
        '13': 'nodeName',
        '14': 'nodeName',
        '15': 'nodeName',
        '16': 'nodeName',
        '17': '1',
        '18': 'nodeName',
        '-1': 'nodeName'
      }, {
        '0': 'nodeName',
        '1': 'nodeName',
        '2': 'hEnd:text',
        '3': 'nodeName',
        '4': 'nodeName',
        '5': 'nodeName',
        '6': 'hEnd:text',
        '7': 'nodeName',
        '8': 'nodeName',
        '9': 'nodeName',
        '10': 'nodeName',
        '11': 'nodeName',
        '12': 'nodeName',
        '13': 'nodeName',
        '14': 'nodeName',
        '15': 'nodeName',
        '16': 'nodeName',
        '17': 'nnEnd',
        '18': 'nodeName',
        '-1': 'nodeName'
      }, {
        '0': 'hHeader',
        '1': 'hHeader',
        '2': 'hEnd:text',
        '3': 'nnStart',
        '4': 'hHeader',
        '5': 'hHeader',
        '6': 'hHeader',
        '7': 'hHeader',
        '8': 'hHeader',
        '9': '_str1',
        '10': 'hHeader',
        '11': '_str2',
        '12': 'hHeader',
        '13': '_str3',
        '14': 'hHeader',
        '15': '_str{{',
        '16': 'hHeader',
        '17': 'hHeader',
        '18': 'hHeader',
        '-1': 'hHeader'
      }, {
        '0': 'etHeader',
        '1': 'etHeader',
        '2': 'etHeader',
        '3': 'etHeader',
        '4': 'etHeader',
        '5': '_str[',
        '6': 'hEnd:text',
        '7': 'etHeader',
        '8': 'etHeader',
        '9': '_str1',
        '10': 'etHeader',
        '11': '_str2',
        '12': 'etHeader',
        '13': '_str3',
        '14': 'etHeader',
        '15': 'etHeader',
        '16': 'etHeader',
        '17': 'etHeader',
        '18': 'etHeader',
        '-1': 'etHeader'
      }, {
        '0': 'hTail',
        '1': 'hTail',
        '2': 'tEnd:text',
        '3': 'hTail',
        '4': 'hTail',
        '5': 'hTail',
        '6': 'hTail',
        '7': 'hTail',
        '8': 'hTail',
        '9': 'hTail',
        '10': 'hTail',
        '11': 'hTail',
        '12': 'hTail',
        '13': 'hTail',
        '14': 'hTail',
        '15': 'hTail',
        '16': 'hTail',
        '17': '2',
        '18': 'hTail',
        '-1': 'hTail'
      }, {
        '0': 'etTail',
        '1': 'etTail',
        '2': 'etTail',
        '3': 'etTail',
        '4': 'etTail',
        '5': 'etTail',
        '6': 'tEnd:text',
        '7': 'etTail',
        '8': 'etTail',
        '9': 'etTail',
        '10': 'etTail',
        '11': 'etTail',
        '12': 'etTail',
        '13': 'etTail',
        '14': 'etTail',
        '15': 'etTail',
        '16': 'etTail',
        '17': '2',
        '18': 'etTail',
        '-1': 'etTail'
      }, {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '_str[',
        '6': '_last',
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
        '18': '',
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
        '14': '',
        '15': '',
        '16': '_last',
        '17': '',
        '18': '',
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
        '9': '_last',
        '10': '',
        '11': '',
        '12': '',
        '13': '',
        '14': '',
        '15': '',
        '16': '',
        '17': '',
        '18': '',
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
        '11': '_last',
        '12': '',
        '13': '',
        '14': '',
        '15': '',
        '16': '',
        '17': '',
        '18': '',
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
        '13': '_last',
        '14': '',
        '15': '',
        '16': '',
        '17': '',
        '18': '',
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
        '18': '',
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
            switch (state) {
              case '_comment':
                break;
              case 'text':
              case '_str[':
              case '_str{{':
              case '_str1':
              case '_str2':
              case '_str3':
              case 'nodeName':
              case 'hHeader':
              case 'etHeader':
                currentNode.addSource(token);
                break;
              case 'nnStart':
                currentNode = currentNode.createChild();
                currentNode.startNodeName(token);
                break;
              case 'nnEnd':
                currentNode.startHeader(token);
                if (currentNode.nodeName.indexOf('#') === 0) {
                  return 'etHeader';
                } else if (currentNode.nodeName) {
                  return 'hHeader';
                }
                break;
              case 'hEnd':
                currentNode.closeHeader(token);
                currentNode = currentNode.createChild();
                break;
              case 'hTail':
              case 'etTail':
                tail += token;
                break;
              case 'tEnd':
                // return of closeNode method is the parent of the closed node
                currentNode = currentNode.closeNode(tail + token);
                tail = '';
                if (!currentNode.isHeaderClosed) {
                  if (currentNode.nodeName.indexOf('#') === 0) {
                    return 'etHeader';
                  } else if (currentNode.nodeName) {
                    return 'hHeader';
                  }
                }
                currentNode = currentNode.createChild();
                break;
              default:
                throw new Error('The state: \'' + state + '\' is not defined.');
            }
          });
          currentNode.createChild(tail);
          root.closeAll();
          root.removeEmptyNode();
          return root;
        }
      }]);

      return OriginParser;
    })();

    module.exports = new OriginParser();
  });
  innerDefine('middlewares/origin-parser', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic-middleware');
    var originParser = innerRequire('../parsers/origin');

    var MiddlewareParser = (function(_Basic17) {
      _inherits(MiddlewareParser, _Basic17);

      function MiddlewareParser() {
        _classCallCheck(this, MiddlewareParser);

        _get(Object.getPrototypeOf(MiddlewareParser.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(MiddlewareParser, [{
        key: 'run',
        value: function run(str, options) {
          return originParser.parse(str);
        }
      }]);

      return MiddlewareParser;
    })(Basic);

    module.exports = new MiddlewareParser();
  });
  innerDefine('middlewares/source-translator', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic-middleware');

    var TRANSLATE_MAP = {
      '&quot;': '\\"',
      '&amp;': '\\&',
      '&lt;': '\\<',
      '&gt;': '\\>',
      '&nbsp;': ' '
    };

    var MiddlewareSourceTranslator = (function(_Basic18) {
      _inherits(MiddlewareSourceTranslator, _Basic18);

      function MiddlewareSourceTranslator() {
        _classCallCheck(this, MiddlewareSourceTranslator);

        _get(Object.getPrototypeOf(MiddlewareSourceTranslator.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(MiddlewareSourceTranslator, [{
        key: 'run',
        value: function run(origin, options) {
          var _this7 = this;

          origin.each(function(node) {
            var nodeName = node.nodeName;
            var source = node.source.trim();
            var header = node.header.trim();

            node.header = _this7.translateSource(header);
            node.source = _this7.translateSource(source);
            node.nodeType = _this7.getNodeType(nodeName, source);
          });
          return origin;
        }
      }, {
        key: 'translateSource',
        value: function translateSource(source) {
          source = source.trim().replace(/\s+/g, ' ');
          for (var key in TRANSLATE_MAP) {
            var value = TRANSLATE_MAP[key];
            source = source.replace(new RegExp(key, 'g'), value);
          }
          return source;
        }
      }, {
        key: 'getNodeType',
        value: function getNodeType(nodeName, source) {
          if (nodeName.indexOf('#') === 0 || !source) {
            return 'ET';
          } else if (nodeName) {
            return 1;
          } else {
            return 3;
          }
        }
      }]);

      return MiddlewareSourceTranslator;
    })(Basic);

    module.exports = new MiddlewareSourceTranslator();
  });
  innerDefine('middlewares/middleware-getter', function(innerRequire, exports, module) {
    'use strict';

    var attributes = innerRequire('./attributes');
    var checker = innerRequire('./checker');
    var compiler = innerRequire('./compiler');
    var dot = innerRequire('./dot');
    var formatter = innerRequire('./formatter');
    var rebuilder = innerRequire('./rebuilder');
    var ngRebuilder = innerRequire('./ng-rebuilder');
    var nodeCreator = innerRequire('./node-creator');
    var originParser = innerRequire('./origin-parser');
    var sourceTrasnlator = innerRequire('./source-translator');

    var MIDDLEWARES = {
      'attributes': attributes,
      'checker': checker,
      'compiler': compiler,
      'dot': dot,
      'formatter': formatter,
      'rebuilder': rebuilder,
      'ng-rebuilder': ngRebuilder,
      'node-creator': nodeCreator,
      'origin-parser': originParser,
      'source-translator': sourceTrasnlator
    };

    var MiddlewareGetter = (function() {
      function MiddlewareGetter() {
        _classCallCheck(this, MiddlewareGetter);
      }

      _createClass(MiddlewareGetter, [{
        key: 'get',
        value: function get(key) {
          var middleware = MIDDLEWARES[key];
          if (!middleware) {
            throw new Error('not found middleware: ' + key);
          }
          return middleware;
        }
      }, {
        key: 'getList',
        value: function getList() {
          var _this8 = this;

          var results = [];

          for (var _len5 = arguments.length, arr = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            arr[_key5] = arguments[_key5];
          }

          arr.map(function(key) {
            results.push(_this8.get(key));
          });
          return results;
        }
      }]);

      return MiddlewareGetter;
    })();

    module.exports = new MiddlewareGetter();
  });
  innerDefine('et', function(innerRequire, exports, module) {
    'use strict';

    var _ = innerRequire('./util');
    var middlewareGetter = innerRequire('./middlewares/middleware-getter');

    var DEFAULTS = {
      compiledTemplate: null, // ['dot', null]
      modules: 'common', // ['common', 'cmd', 'amd', 'global', 'angular']
      dependencyName: '_dep',
      dependencyPath: 'et-dependency'
    };

    var DEFAULT_COMPILE_OPTIONS = {
      moduleId: 'Template'
    };

    var DEFAULT_MIDDLEWARES = ['origin-parser', 'source-translator', 'node-creator', 'attributes', 'rebuilder', 'ng-rebuilder', 'checker', 'compiler', 'formatter'];

    var ET = (function() {
      function ET(options) {
        _classCallCheck(this, ET);

        this.options = _.extend({}, DEFAULTS, options);
      }

      _createClass(ET, [{
        key: 'compile',
        value: function compile(str, runtimeOptions) {
          var options = _.extend({}, DEFAULT_COMPILE_OPTIONS, runtimeOptions);
          var middlewares = [];
          switch (this.options.compiledTemplate) {
            case 'dot':
              middlewares = this.getMiddlewares(['dot']);
              break;
            default:
              middlewares = this.getMiddlewares([]);
          }
          return this.runMiddlewares(str, middlewares, options);
        }
      }, {
        key: 'runMiddlewares',
        value: function runMiddlewares(str, middlewares, runtimeOptions) {
          var options = _.extend({}, this.options, runtimeOptions);
          var result = str;
          middlewares.map(function(name) {
            var middleware = middlewareGetter.get(name);
            result = middleware.run(result, options);
          });
          return result;
        }
      }, {
        key: 'getMiddlewares',
        value: function getMiddlewares() {
          var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

          return _.concat(array, DEFAULT_MIDDLEWARES);
        }
      }]);

      return ET;
    })();

    module.exports = ET;
  });

  var RumtimeET = modules.et;
  RumtimeET.prototype.compileString = RumtimeET.prototype.compile;
  RumtimeET.prototype.compile = function(str, options) {
    var result = this.compileString(str, options);
    var fn = new Function('require', 'exports', 'module', result);
    var _module = {};
    var _exports = {};
    fn(require, _exports, _module);
    return _module.exports || _exports;
  };
  module.exports = RumtimeET;
});