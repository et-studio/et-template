;(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('etRuntime', factory)
  } else {
    var require = function() {}
    var module = {}
    var exports = {}
    factory(require, exports, module)
    global.etRuntime = module.exports
  }
})(window, function(require, exports, module) {
  'use strict';

  var _get = function get(_x15, _x16, _x17) {
    var _again = true;
    _function:
    while (_again) {
      var object = _x15,
        property = _x16,
        receiver = _x17;
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
          _x15 = parent;
          _x16 = property;
          _x17 = receiver;
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

      createElement: function createElement(it) {
        var re = '';

        if (it.attributes) {
          re = re + ('\nvar _et = _util.createElement(\'' + _.translateMarks(it.nodeName.toUpperCase()) + '\', ' + JSON.stringify(it.attributes, null, '  ') + ');\n');
        } else {
          re = re + ('\nvar _et = _util.createElement(\'' + _.translateMarks(it.nodeName.toUpperCase()) + '\');\n');
        }

        re = re + ('\n_doms[' + it.id + '] = _et;\n');

        if (it.isRoot) {
          re = re + ('\n_roots[' + it.id + '] = _et;\n');
        } else {
          re = re + ('\n_util.appendChild(_doms[' + it.parentId + '], _et);\n');
        }

        return re;
      },
      createFor: function createFor(it) {
        var re = '';

        re = re + ('\nvar _et = new Template_for();\n_doms[' + it.id + '] = _et;\n');

        if (it.isRoot) {
          re = re + ('\n_roots[' + it.id + '] = _et;\n');
        }

        return re;
      },
      createHtml: function createHtml(it) {
        var re = '';
        re = re + ('\n_doms[' + it.parentId + '].innerHTML = \'' + _.translateMarks(it.expression) + '\';\n');

        return re;
      },
      createImport: function createImport(it) {
        var re = '';
        re = re + ('\nvar _ET = require(\'' + _.translateMarks(it.path) + '\');\nvar _et = new _ET();\n_doms[' + it.id + '] = _et;\n');
        if (it.isRoot) {
          re = re + ('\n_roots[' + it.id + '] = _et;\n');
        } else {
          re = re + ('\n_util.appendChild(_doms[' + it.parentId + '], _et.get());\n');
        }

        return re;
      },
      createLine: function createLine(it) {
        var re = '';

        re = re + ('\nvar _line = _util.createLine();\n_doms[' + it.lineId + '] = _line;\n');

        if (it.isRoot) {
          re = re + ('\n_roots[' + it.lineId + '] = _line;\n');
        } else {
          re = re + ('\n_util.appendChild(_doms[' + it.parentId + '], _line);\n');
        }

        return re;
      },
      createNull: function createNull(it) {
        var re = '';

        re = re + ('\n_doms[' + it.id + '] = null;\n');

        if (it.isRoot) {
          re = re + ('\n_roots[' + it.id + '] = null;\n');
        }

        return re;
      },
      createText: function createText(it) {
        var re = '';

        re = re + ('\nvar _et = _util.createTextNode(\'' + _.translateMarks(it.text) + '\');\n_doms[' + it.id + '] = _et;\n');

        if (it.isRoot) {
          re = re + ('\n_roots[' + it.id + '] = _et;\n');
        } else {
          re = re + ('\n_util.appendChild(_doms[' + it.parentId + '], _et);\n');
        }

        return re;
      },
      template: function template(it) {
        var re = '';

        re = re + '\n\'use strict\';\n\nvar _dep = require(\'etDependency\');\nvar _util = _dep._util;\nvar _prototype = _dep._prototype;\n';

        if (it.hasFor) {
          re = re + '\nfunction Template_for(options) {\nthis.init(options);\n}\n';
        }
        _.each(it.newDoms, function(dom) {
          re = re + ('\nfunction ' + dom.templateName + '(options) {\nthis.init(options);\n}\n');
        });

        if (it.hasFor) {
          re = re + '\n_util.extend(Template_for.prototype, _prototype);\n';
        }
        _.each(it.newDoms, function(dom) {
          if (!dom.createList.length && dom.updateList.length) {
            throw new Error('If dom has updateList, it must have createList.');
          }
          if (dom.createList.length || dom.updateList.length) {
            re = re + ('\n_util.extend(' + dom.templateName + '.prototype, _prototype, {\ncreate: function create() {\nvar _doms = this.doms;\nvar _roots = this.roots;\n' + dom.createList.join('\n') + '\n}' + (dom.updateList.length ? ',' : '') + '\n');

            if (dom.updateList.length) {
              re = re + ('\nupdate: function update(' + dom.args.join(',') + ') {\nvar _doms = this.doms;\nvar _roots = this.roots;\nvar _last = this.last;\n' + dom.updateList.join('\n') + '\n}\n');
            }
            re = re + '\n});\n';
          }
        });

        re = re + ('\nmodule.exports = ' + it.templateName + ';\n');

        return re;
      },
      updateAttributes: function updateAttributes(it) {
        var re = '';

        if (it.erraticAttributes.length || it.expressions.length) {
          re = re + ('\nvar _et = _doms[' + it.id + '];\n');
          _.each(it.erraticAttributes, function(attr) {
            if (attr.isErratic) {
              re = re + ('\nvar _tmp = ' + attr.valueString + ';\nif (_last[' + attr.valueId + '] !== _tmp) {\n_last[' + attr.valueId + '] = _tmp;\n_util.setAttribute(_et, \'' + attr.key + '\', _tmp);\n}\n');
            }
          });

          _.each(it.expressions, function(items) {
            _.each(items, function(item, i) {
              var condition = '';
              if (item.tag !== 'else') {
                condition = '(' + item.condition + ')';
              }
              re = re + ('\n' + item.tag + ' ' + condition + ' {\nif (_last[' + item.valueId + '] !== ' + i + ') {\n_last[' + item.valueId + '] = ' + i + ';\n');
              _.each(item.attributes, function(attr) {
                if (!attr.isErratic) {
                  re = re + ('\n_util.setAttribute(_et, \'' + _.translateMarks(attr.key) + '\', \'' + _.translateMarks(attr.value) + '\');\n');
                }
              });
              if (item.exclusions && item.exclusions.length === 1) {
                re = re + ('\n_util.removeAttribute(_et, \'' + _.translateMarks(item.exclusions[0]) + '\');\n');
              } else if (item.exclusions && item.exclusions.length > 1) {
                var exclusions = item.exclusions.map(function(item) {
                  return '\'' + _.translateMarks(item) + '\'';
                });
                re = re + ('\n_util.removeAttributes(_et, ' + exclusions.join(',') + ');\n');
              }
              re = re + '\n}\n';
              _.each(item.attributes, function(attr) {
                if (attr.isErratic) {
                  re = re + ('\nvar _tmp = ' + attr.valueString + ';\nif (_last[' + attr.valueId + '] !== _tmp) {\n_last[' + attr.valueId + '] = _tmp;\n_util.setAttribute(_et, \'' + _.translateMarks(attr.key) + '\', _tmp);\n}\n');
                }
              });
              re = re + '\n}\n';
            });
          });
        }

        return re;
      },
      updateFor: function updateFor(it) {
        var re = '';

        re = re + ('\nvar _line = _doms[' + it.lineId + '];\nvar _lastLength = _last[' + it.valueId + '] || 0;\nvar _list = ' + it.expression + ' || [];\n\nvar _i = 0;\nvar _len = _list.length;\n_last[' + it.valueId + '] = _len;\nfor (; _i < _len; _i++) {\nvar _et = _doms[\'' + it.id + '_\' + _i];\nvar _item = _list[_i];\nvar ' + it.indexName + ' = _i;\nvar ' + it.itemName + ' = _item;\n\nif (!_et) {\n_doms[\'' + it.id + '_\' + _i] = _et = new ' + it.templateName + '();\n}\nif (_i >= _lastLength) {\n_util.after(_line, _et.get());\n}\n_et.update(' + it.args.join(',') + ');\n}\nfor (; _i < _lastLength; _i++) {\nvar _et = _doms[\'' + it.id + '_\' + _i];\n_et.remove();\n}\n');

        if (it.isRoot) {
          re = re + ('\nvar _lastLength = _last[' + it.valueId + '];\nvar _et = _doms[' + it.id + '];\n_et.roots = {};\nfor (_i = 0; _i < _lastLength; _i++) {\n_et.doms[_i] = _et.roots[_i] = _doms[\'' + it.id + '_\' + _i];\n}\n');
        }

        return re;
      },
      updateHtml: function updateHtml(it) {
        var re = '';

        re = re + ('\nvar _et = _doms[' + it.parentId + '];\nvar _tmp = ' + it.valueString + ';\nif (_last[' + it.valueId + '] !== _tmp) {\n_last[' + it.valueId + '] = _tmp;\n_et.innerHTML = _tmp;\n}\n');

        return re;
      },
      updateIf: function updateIf(it) {
        var re = '';
        re = re + ('\nvar _line = _doms[' + it.lineId + '];\n');
        _.each(it.doms, function(dom, i) {
          var condition = '';
          if (dom.tag !== 'else') {
            condition = '(' + dom.condition + ')';
          }
          re = re + ('\n' + dom.tag + ' ' + condition + ' {\nif (_last[' + it.indexValueId + '] !== ' + i + ') {\n_last[' + it.indexValueId + '] = ' + i + ';\n');
          if (dom.id) {
            re = re + ('\nvar _et = _doms[' + dom.id + '];\nif (!_et) {\n_doms[' + dom.id + '] = _et = new ' + dom.templateName + '();\n}\n_util.after(_line, _et.get());\n');
            if (it.isRoot) {
              re = re + ('\n_roots[' + dom.id + '] = _et;\n');
            }
          }
          _.each(dom.siblings, function(sibling) {
            re = re + ('\nvar _et = _doms[' + sibling.id + '];\nif (_et) {\n_et.remove();\n');
            if (it.isRoot) {
              re = re + ('\n_roots[' + sibling.id + '] = null;\n');
            }
            re = re + '\n}\n';
          });
          re = re + '\n}\n';
          if (dom.id) {
            re = re + ('\n_doms[' + dom.id + '].update(' + dom.args.join(',') + ');\n');
          }
          re = re + '\n}\n';
        });

        return re;
      },
      updateImport: function updateImport(it) {
        var re = '';
        re = re + ('\nvar _et = _doms[' + it.id + '];\n_et.update(' + it.args.join(', ') + ');\n');

        return re;
      },
      updateText: function updateText(it) {
        var re = '';

        re = re + ('\nvar _et = _doms[' + it.id + '];\nvar _tmp = ' + it.valueString + ';\nif (_last[' + it.valueId + '] !== _tmp) {\n_last[' + it.valueId + '] = _tmp;\n_util.text(_et, _tmp);\n}\n');

        return re;
      }

    };
  });
  innerDefine('compiler', function(innerRequire, exports, module) {
    'use strict';

    var _ = innerRequire('./util');
    var worker = innerRequire('./worker');

    var Compiler = (function() {
      function Compiler() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Compiler);

        this.options = options;
      }

      _createClass(Compiler, [{
        key: 'pickData',
        value: function pickData(root) {
          var newDoms = root.getNewTemplateDoms();
          var re = {
            templateName: root.getTemplateName(),
            hasFor: false,
            newDoms: []
          };
          _.each(newDoms, function(dom) {
            if (dom.nodeName === '#for') {
              re.hasFor = true;
            }
            re.newDoms.push({
              templateName: dom.getTemplateName(),
              createList: dom.getCreateList(),
              updateList: dom.getUpdateList(),
              args: dom.getArguments()
            });
          });
          return re;
        }
      }, {
        key: 'compile',
        value: function compile(dom) {
          var it = this.pickData(dom);
          return worker.template(it);
        }
      }]);

      return Compiler;
    })();

    module.exports = Compiler;
  });
  innerDefine('parsers/machine', function(innerRequire, exports, module) {
    'use strict';

    var _ = innerRequire('../util');

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
        key: 'getToken',
        value: function getToken(str, index) {
          var symbols = this.symbols;
          var char = str[index];
          var token = '';
          _.each(symbols, function(symbol) {

            if (symbol && typeof symbol.test === 'function') {
              if (symbol.test(char)) {
                token = char;
                return false;
              }
            } else if (symbol && symbol.length) {
              var tmp = str.substr(index, symbol.length);
              if (tmp === symbol) {
                token = symbol;
                return false;
              }
            }
          });
          if (!token) {
            token = str[index];
          }
          return token;
        }
      }, {
        key: 'switchState',
        value: function switchState(state, symbol) {
          var stateIndex = this.states.indexOf(state);
          var symbolIndex = this.symbols.indexOf(symbol);

          var map = this.table[stateIndex];
          var re = map[symbolIndex];
          if (!re) {
            re = map['*'];
          }
          return re;
        }
      }, {
        key: 'each',
        value: function each(str, callback) {
          if (!str) return;

          var lastState = this.startState;
          var stateStack = [];
          for (var i = 0, len = str.length; i < len;) {
            var token = this.getToken(str, i);
            var state = this.switchState(lastState, token);

            if (lastState.indexOf('_') === 0 && !state) {
              state = lastState;
            } else if (state && state !== '_last' && state.indexOf('_') === 0) {
              stateStack.push(lastState);
            }

            if (state === '_last') {
              lastState = callback(lastState, token, i) || stateStack.pop();
            } else {
              lastState = callback(state, token, i) || state;
            }
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
  innerDefine('nodes/getter', function(innerRequire, exports, module) {
    'use strict';

    var config = {
      'templateFunctionPrefix': 'Template_'
    };

    var Getter = (function() {
      function Getter() {
        _classCallCheck(this, Getter);

        this.valueId = 0;
      }

      _createClass(Getter, [{
        key: 'getId',
        value: function getId() {
          if (this._index >= 0) {
            return this._index * 2;
          } else {
            return null;
          }
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
          return this.parent && this.parent.getId();
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
      }]);

      return Getter;
    })();

    module.exports = Getter;
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

    var NodeInterface = innerRequire('./getter');
    var _ = innerRequire('../util');

    var Basic = (function(_NodeInterface) {
      _inherits(Basic, _NodeInterface);

      function Basic(source) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Basic);

        _get(Object.getPrototypeOf(Basic.prototype), 'constructor', this).call(this, source, options);

        this._source = source;
        this._index = options.index;
        this.isNewTemplate = false;
        this.args = [];
        this.nodeType = 'ET';

        this.options = options;
        this.parent = options.parent;
        this.previous = options.previous;
        this.next = null;
        this.isRoot = !this.parent;

        this.children = [];
        this.parse(source);
      }

      _createClass(Basic, [{
        key: 'getNewTemplateDoms',
        value: function getNewTemplateDoms() {
          var re = [];
          this.each(function(dom) {
            if (dom.isRoot || dom.isNewTemplate) {
              re.push(dom);
            }
          });
          return re;
        }
      }, {
        key: 'getCreateList',
        value: function getCreateList() {
          var re = [];
          _.each(this.children, function(child) {
            _.concat(re, child.deliverCreate());
            if (!child.isNewTemplate) {
              _.concat(re, child.getCreateList());
            }
          });
          return _.clearArraySpace(re);
        }
      }, {
        key: 'getUpdateList',
        value: function getUpdateList() {
          var re = [];
          _.each(this.children, function(child) {
            _.concat(re, child.deliverUpdate());
            if (!child.isNewTemplate) {
              _.concat(re, child.getUpdateList());
            }
          });
          return _.clearArraySpace(re);
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
        key: 'checkRoot',
        value: function checkRoot() {
          var parent = this.parent;
          // 当不存在nodeType的时候也认为是root
          if (!parent || parent.isRoot || parent.isNewTemplate) {
            return true;
          } else {
            return false;
          }
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
        key: 'after',
        value: function after(node) {
          if (this.isRoot) {
            return;
          }

          var nodePrev = node.previous;
          var nodeNext = node.next;
          if (nodePrev) {
            nodePrev.next = nodeNext;
          }
          if (nodeNext) {
            nodeNext.previous = nodePrev;
          }

          node.parent = this.parent;
          node.previous = this;
          node.next = this.next;

          var currentNext = this.next;
          if (currentNext) {
            currentNext.previous = node;
          }
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
        key: 'appendChild',
        value: function appendChild(node) {
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
        key: 'each',
        value: function each(callback) {
          if (typeof callback === 'function') {
            callback(this);
            if (this.children.length) {
              this.children[0].each(callback);
            }
            if (this.next) {
              this.next.each(callback);
            }
          }
        }
      }, {
        key: 'initAll',
        value: function initAll() {
          this.each(function(dom) {
            dom.init();
          });
        }

      // functions could be override
      }, {
        key: 'parse',
        value: function parse(source) {
          // be called in constructor
        }
      }, {
        key: 'init',
        value: function init() {
          // should be called after the whole Tree created
        }
      }, {
        key: 'deliverCreate',
        value: function deliverCreate() {
          return [];
        }
      }, {
        key: 'deliverUpdate',
        value: function deliverUpdate() {
          return [];
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
          var _this2 = this;

          if (attrs === undefined)
            attrs = {};

          var re = {};
          var filter = this.getAttributeFilter(options);

          attrs.map(function(attr) {
            if (!attr.key) _this2.throwError();
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
      states: ['start', 'name', 'condition'],
      symbols: ['[', ' ', '\r', '\n'],
      table: [{
        '0': 'start',
        '1': '',
        '2': '',
        '3': '',
        '-1': 'name'
      }, {
        '0': '',
        '1': 'condition',
        '2': 'condition',
        '3': 'condition',
        '-1': 'name'
      }, {
        '0': 'condition',
        '1': 'condition',
        '2': 'condition',
        '3': 'condition',
        '-1': 'condition'
      }]
    };
    // @tableEnd

    var conditionMachine = new Machine(conditionTableOptions);

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

          var _this = this;
          var tag = '';
          var nodeName = '';
          var condition = '';
          var lastToken = '';
          conditionMachine.each(source, function(state, token) {
            lastToken = token;
            switch (state) {
              case 'start':
                break;
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
          if (lastToken !== ']') {
            this.throwError();
          }
          if (expectNodeName && nodeName.toLowerCase() !== expectNodeName) {
            this.throwError();
          }
          if (condition) {
            condition = condition.substr(0, condition.length - 1);
            condition = condition.trim();
          } else {
            nodeName = nodeName.substr(0, nodeName.length - 1);
          }

          if (nodeName === '#elseif') {
            tag = 'else if';
          } else {
            tag = nodeName.substr(1);
          }

          return {
            tag: tag,
            nodeName: nodeName,
            condition: condition
          };
        }
      }]);

      return ConditionParser;
    })(Parser);

    module.exports = new ConditionParser();
  });
  innerDefine('nodes/element', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');

    var _ = innerRequire('../util');
    var worker = innerRequire('../worker');
    var elementParser = innerRequire('../parsers/element');
    var valueParser = innerRequire('../parsers/value');
    var conditionParser = innerRequire('../parsers/condition');

    var Element = (function(_Basic) {
      _inherits(Element, _Basic);

      function Element(source) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Element);

        _get(Object.getPrototypeOf(Element.prototype), 'constructor', this).call(this, source, options);
        this.nodeType = 1;
        this.expressions = [];
        this.parseExpresions(options.expressions);
      }

      _createClass(Element, [{
        key: 'parse',
        value: function parse(source) {
          var tinyNode = elementParser.parse(source, this.options);
          this.attributes = tinyNode.attributes;
          this.nodeName = tinyNode.nodeName;
        }
      }, {
        key: 'parseExpresions',
        value: function parseExpresions(expressions) {
          var newExpressions = [];
          var _this = this;
          _.each(expressions, function(expression) {
            if (expression.children.length === 1) {
              var items1 = _this.parseSingleExpresion(expression);
              if (items1.length) newExpressions.push(items1);
            } else if (expression.children.length > 1) {
              var items2 = _this.parseMultipleExpresion(expression);
              if (items2.length) newExpressions.push(items2);
            }
          });
          this.expressions = newExpressions;
        }
      }, {
        key: 'parseSingleExpresion',
        value: function parseSingleExpresion(expression) {
          var items = [];
          var child = expression.children[0];
          var source = child && child.source || '';
          var tinyNode = elementParser.parse('<div ' + source + '>', this.options);
          var conditionNode = conditionParser.parse(expression.source);

          if (!_.isEmpty(tinyNode.attributes)) {
            items.push({
              tag: 'if',
              condition: conditionNode.condition,
              attributes: tinyNode.attributes
            });
            items.push({
              tag: 'else',
              exclusions: Object.keys(tinyNode.attributes)
            });
          }
          return items;
        }
      }, {
        key: 'parseMultipleExpresion',
        value: function parseMultipleExpresion(expression) {
          var items = [];
          var hasElse = false;
          var allAttributes = {};

          var source = null;
          var tinyNode = null;
          var conditionNode = conditionParser.parse(expression.source);
          _.each(expression.children, function(child, i) {
            if (i % 2) {
              conditionNode = conditionParser.parse(child.source);
            } else {
              source = child && child.source || '';
              tinyNode = elementParser.parse('<div ' + source + '>');
              _.extend(allAttributes, tinyNode.attributes);

              if (conditionNode.tag === 'else')
                hasElse = true;
              items.push({
                tag: conditionNode.tag,
                condition: conditionNode.condition,
                attributes: tinyNode.attributes
              });
            }
          });
          _.each(items, function(item) {
            item.exclusions = Object.keys(_.omit(allAttributes, item.attributes));
          });
          if (!hasElse) {
            items.push({
              tag: 'else',
              exclusions: allAttributes
            });
          }
          return items;
        }
      }, {
        key: 'deliverCreate',
        value: function deliverCreate() {
          var it = {
            id: this.getId(),
            isRoot: this.checkRoot(),
            parentId: this.getParentId(),
            nodeName: this.getNodeName(),
            attributes: this.getAttributesMap()
          };
          return [worker.createElement(it)];
        }
      }, {
        key: 'getAttributesMap',
        value: function getAttributesMap() {
          var re = {};
          var isEmpty = true;
          var attrs = this.attributes;
          for (var key in attrs) {
            var value = attrs[key];
            if (!valueParser.isErratic(value)) {
              re[key] = value;
              isEmpty = false;
            }
          }
          if (isEmpty) {
            return null;
          } else {
            return re;
          }
        }
      }, {
        key: 'deliverUpdate',
        value: function deliverUpdate() {
          var it = {
            id: this.getId(),
            erraticAttributes: this.getErraticAttributes(),
            expressions: this.translateExpressions()
          };
          return [worker.updateAttributes(it)];
        }
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
          return this.translateAttributesToExpressions(erracticMap);
        }
      }, {
        key: 'translateExpressions',
        value: function translateExpressions() {
          var re = [];
          var _this = this;
          _.each(this.expressions, function(items) {
            var newItems = [];
            var valueId = _this.getRootValueId();
            _.each(items, function(item) {
              var obj = _.pick(item, 'tag', 'exclusions', 'condition');
              obj.valueId = valueId;
              obj.attributes = _this.translateAttributesToExpressions(item.attributes);
              newItems.push(obj);
            });
            re.push(newItems);
          });
          return re;
        }
      }, {
        key: 'translateAttributesToExpressions',
        value: function translateAttributesToExpressions(attrs) {
          var re = [];
          for (var key in attrs) {
            var value = attrs[key];
            var tmp = {
              key: key,
              isErratic: valueParser.isErratic(value),
              value: value,
              valueString: valueParser.parse(value)
            };
            if (tmp.isErratic) {
              tmp.valueId = this.getRootValueId();
            }
            re.push(tmp);
          }
          return re;
        }
      }]);

      return Element;
    })(Basic);

    module.exports = Element;
  });
  innerDefine('nodes/text', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var worker = innerRequire('../worker');
    var valueParser = innerRequire('../parsers/value');

    var TextNode = (function(_Basic2) {
      _inherits(TextNode, _Basic2);

      function TextNode(source) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, TextNode);

        _get(Object.getPrototypeOf(TextNode.prototype), 'constructor', this).call(this, source, options);
        this.nodeType = 3;
      }

      _createClass(TextNode, [{
        key: 'parse',
        value: function parse(source) {
          this.textContent = source;
        }
      }, {
        key: 'deliverCreate',
        value: function deliverCreate() {
          var text = this.getTextContent();
          if (valueParser.isErratic(text)) {
            text = '';
          }
          var it = {
            id: this.getId(),
            isRoot: this.checkRoot(),
            lineId: this.getLineId(),
            parentId: this.getParentId(),
            text: text
          };
          return [worker.createText(it)];
        }
      }, {
        key: 'deliverUpdate',
        value: function deliverUpdate() {
          var text = this.getTextContent();
          if (valueParser.isErratic(text)) {
            var it = {
              id: this.getId(),
              isRoot: this.checkRoot(),
              lineId: this.getLineId(),
              parentId: this.getParentId(),
              valueId: this.getRootValueId(),
              valueString: valueParser.parse(text)
            };
            return [worker.updateText(it)];
          } else {
            return [];
          }
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
    var worker = innerRequire('../worker');
    var conditionParser = innerRequire('../parsers/condition');

    var IfNode = (function(_Basic3) {
      _inherits(IfNode, _Basic3);

      function IfNode(source, options) {
        _classCallCheck(this, IfNode);

        _get(Object.getPrototypeOf(IfNode.prototype), 'constructor', this).call(this, source, options);
        this.isNewTemplate = true;
      }

      _createClass(IfNode, [{
        key: 'parse',
        value: function parse(source) {
          var tmp = conditionParser.parse(source, {
            expectNodeName: '#if'
          });
          this.nodeName = tmp.nodeName;
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
              currentNode.appendChild(child);
            }
          });
        }
      }, {
        key: 'deliverCreate',
        value: function deliverCreate() {
          var it = {
            id: this.getId(),
            isRoot: this.checkRoot(),
            lineId: this.getLineId(),
            parentId: this.getParentId()
          };
          var re = [];
          re.push(worker.createLine(it));
          re.push(worker.createNull(it));
          return re;
        }
      }, {
        key: 'deliverUpdate',
        value: function deliverUpdate() {
          var lastRoot = this.getLastRoot();
          var it = {
            id: this.getId(),
            lineId: this.getLineId(),
            isRoot: this.checkRoot(),
            indexValueId: lastRoot.getValueId(),
            doms: this.getConditionDoms()
          };
          return [worker.updateIf(it)];
        }
      }, {
        key: 'getConditionDoms',
        value: function getConditionDoms() {
          var re = [this.translateDom(this)];

          var hasElse = false;
          var current = this.next;
          while (current) {
            if (current.nodeName === '#elseif' || current.nodeName === '#else') {
              re.push(this.translateDom(current));
            }
            if (current.nodeName === '#else') {
              hasElse = true;
            }
            if (current.nodeName !== '#elseif') {
              break;
            }
            current = current.next;
          }
          if (!hasElse) {
            var defaultElse = {
              tag: 'else',
              isDefaultElse: true
            };
            defaultElse.siblings = _.concat([], re);
            re.push(defaultElse);
          }

          var self = this;
          _.each(re, function(dom) {
            dom.siblings = self.pickSiblings(re, dom);
          });
          return re;
        }
      }, {
        key: 'translateDom',
        value: function translateDom(dom) {
          return {
            id: dom.getId(),
            isRoot: dom.checkRoot(),
            lineId: dom.getLineId(),
            parentId: dom.getParentId(),
            templateName: dom.getTemplateName(),
            args: dom.getArguments(),
            condition: dom.condition,
            tag: this.getTag(dom.nodeName)
          };
        }
      }, {
        key: 'pickSiblings',
        value: function pickSiblings(doms, current) {
          var siblings = [];
          _.each(doms, function(dom) {
            if (dom.id && dom.id !== current.id) {
              siblings.push(dom);
            }
          });
          return siblings;
        }
      }, {
        key: 'getTag',
        value: function getTag(nodeName) {
          switch (nodeName) {
            case '#if':
              return 'if';
            case '#elseif':
              return 'else if';
            default:
              return 'else';
          }
        }
      }]);

      return IfNode;
    })(Basic);

    module.exports = IfNode;
  });
  innerDefine('nodes/elseif', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var worker = innerRequire('../worker');
    var conditionParser = innerRequire('../parsers/condition');

    var ElseIfNode = (function(_Basic4) {
      _inherits(ElseIfNode, _Basic4);

      function ElseIfNode(source, options) {
        _classCallCheck(this, ElseIfNode);

        _get(Object.getPrototypeOf(ElseIfNode.prototype), 'constructor', this).call(this, source, options);
        this.isNewTemplate = true;
      }

      _createClass(ElseIfNode, [{
        key: 'parse',
        value: function parse(source) {
          var tmp = conditionParser.parse(source, {
            expectNodeName: '#elseif'
          });
          this.nodeName = tmp.nodeName;
          this.condition = tmp.condition;
        }
      }, {
        key: 'deliverCreate',
        value: function deliverCreate() {
          var it = {
            id: this.getId(),
            isRoot: this.checkRoot()
          };
          return [worker.createNull(it)];
        }
      }]);

      return ElseIfNode;
    })(Basic);

    module.exports = ElseIfNode;
  });
  innerDefine('nodes/else', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var worker = innerRequire('../worker');

    var ElseNode = (function(_Basic5) {
      _inherits(ElseNode, _Basic5);

      function ElseNode(source, options) {
        _classCallCheck(this, ElseNode);

        _get(Object.getPrototypeOf(ElseNode.prototype), 'constructor', this).call(this, source, options);
        this.isNewTemplate = true;
        this.nodeName = '#else';
      }

      _createClass(ElseNode, [{
        key: 'deliverCreate',
        value: function deliverCreate() {
          var it = {
            id: this.getId(),
            isRoot: this.checkRoot()
          };
          return [worker.createNull(it)];
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
    var worker = innerRequire('../worker');
    var forParser = innerRequire('../parsers/for');

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
        this.isNewTemplate = true;
        this.nodeName = '#for';
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
        key: 'deliverCreate',
        value: function deliverCreate() {
          var it = {
            id: this.getId(),
            isRoot: this.checkRoot(),
            lineId: this.getLineId(),
            parentId: this.getParentId()
          };
          var re = [];
          re.push(worker.createLine(it));
          re.push(worker.createFor(it));
          return re;
        }
      }, {
        key: 'deliverUpdate',
        value: function deliverUpdate() {
          var it = {
            id: this.getId(),
            parentId: this.getParentId(),
            lineId: this.getLineId(),
            isRoot: this.checkRoot(),
            valueId: this.getRootValueId(),
            args: this.getArguments(),
            expression: this.getExpression(),
            templateName: this.getTemplateName(),
            indexName: this.getIndexName(),
            itemName: this.getItemName(),
            condition: this.condition
          };
          return [worker.updateFor(it)];
        }
      }, {
        key: 'getExpression',
        value: function getExpression() {
          return this.expression || this.condition;
        }
      }, {
        key: 'getItemName',
        value: function getItemName() {
          return this.itemName || defaults.itemName;
        }
      }, {
        key: 'getLengthName',
        value: function getLengthName() {
          return this.lengthName || defaults.lengthName;
        }
      }, {
        key: 'getIndexName',
        value: function getIndexName() {
          return this.indexName || defaults.indexName;
        }
      }]);

      return ForNode;
    })(Basic);

    module.exports = ForNode;
  });
  innerDefine('nodes/html', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var worker = innerRequire('../worker');
    var conditionParser = innerRequire('../parsers/condition');
    var valueParser = innerRequire('../parsers/value');

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
            expectNodeName: '#html'
          });
          this.nodeName = tmp.nodeName;
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
        key: 'deliverCreate',
        value: function deliverCreate() {
          var re = [];
          var expression = this.expression;
          if (expression && !valueParser.isErratic(expression)) {
            re.push(worker.createHtml({
              parentId: this.parent.getId(),
              expression: this.expression
            }));
          }
          return re;
        }
      }, {
        key: 'deliverUpdate',
        value: function deliverUpdate() {
          var re = [];
          var expression = this.expression;
          if (valueParser.isErratic(expression)) {
            re.push(worker.updateHtml({
              parentId: this.getParentId(),
              valueId: this.getRootValueId(),
              valueString: valueParser.parse(expression)
            }));
          }
          return re;
        }
      }]);

      return HtmlNode;
    })(Basic);

    module.exports = HtmlNode;
  });
  innerDefine('nodes/import', function(innerRequire, exports, module) {
    'use strict';

    var Basic = innerRequire('./basic');
    var worker = innerRequire('../worker');
    var conditionParser = innerRequire('../parsers/condition');

    var ImportNode = (function(_Basic8) {
      _inherits(ImportNode, _Basic8);

      function ImportNode() {
        _classCallCheck(this, ImportNode);

        _get(Object.getPrototypeOf(ImportNode.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(ImportNode, [{
        key: 'parse',
        value: function parse(source) {
          var tmp = conditionParser.parse(source, {
            expectNodeName: '#import'
          });
          this.nodeName = tmp.nodeName;
          var list = tmp.condition.split(',');
          this.importPath = list[0] || '';
          this.importPath = this.importPath.slice(1, this.importPath.length - 1);
          this.importArgs = [];
          for (var i = 1, len = list.length; i < len; i++) {
            var str = list[i] || '';
            str = str.trim();
            if (str) {
              this.importArgs.push(str);
            }
          }
          if (!this.importArgs.length) {
            this.importArgs.push('it');
          }
        }
      }, {
        key: 'deliverCreate',
        value: function deliverCreate() {
          var re = [];
          re.push(worker.createImport({
            id: this.getId(),
            parentId: this.getParentId(),
            isRoot: this.checkRoot(),
            path: this.importPath
          }));
          return re;
        }
      }, {
        key: 'deliverUpdate',
        value: function deliverUpdate() {
          var re = [];
          re.push(worker.updateImport({
            id: this.getId(),
            args: this.importArgs
          }));
          return re;
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

        /**
        * options
        * - index
        * - parent
        * - previous
        * - expressions
        * - lineNumber
        */
        value: function create(source) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          var parent = options.parent;
          var previous = options.previous;

          var Constructor = this.findConstuctor(source);
          var node = new Constructor(source, options);

          if (parent) {
            parent.children.push(node);
          }
          if (previous) {
            previous.next = node;
          }
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
      function Parser() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
          var _this3 = this;

          var index = 0;
          var createNode = function createNode(source, parent, previous, origin) {
            var options = {
              index: index++,
              parent: parent,
              previous: previous
            };
            if (origin) {
              options.lineNumber = origin.lineNumber;
              options.expressions = origin.expressions;
            }

            var node = factory.create(source, _.extend({}, _this3.options, options));
            return node;
          };
          var createChildren = function createChildren(children, parent) {
            if (children === undefined)
              children = [];

            var current = null;
            _.each(children, function(child) {
              current = createNode(child.source, parent, current, child);
              createChildren(child.children, current);
            });
            return parent;
          };
          var root = createNode();
          createChildren(originNode.children, root);
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