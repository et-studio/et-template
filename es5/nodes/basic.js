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

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _getter = require('./getter');

var _getter2 = _interopRequireDefault(_getter);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var Basic = (function (_NodeInterface) {
  _inherits(Basic, _NodeInterface);

  function Basic(source) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Basic);

    _get(Object.getPrototypeOf(Basic.prototype), 'constructor', this).call(this, source, options);

    this._source = source;
    this._index = options.index;
    this.isVirtualNode = true;
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
      var results = [];
      var eachHandler = function eachHandler(dom) {
        if (dom.isRoot || dom.isNewTemplate) {
          results.push(dom);
        }
      };
      this.each(eachHandler);
      return results;
    }
  }, {
    key: 'getArguments',
    value: function getArguments() {
      var re = ['it'];

      var lastRoot = this.getLastRoot();
      if (lastRoot) {
        _util2['default'].concat(re, lastRoot.getArguments());
      }
      if (this.args) {
        _util2['default'].concat(re, this.args);
      }
      re = _util2['default'].uniq(re);
      return _util2['default'].clearArraySpace(re);
    }
  }, {
    key: 'saveArgument',
    value: function saveArgument() {
      for (var _len = arguments.length, list = Array(_len), _key = 0; _key < _len; _key++) {
        list[_key] = arguments[_key];
      }

      _util2['default'].concat(this.args, list);
      return this;
    }
  }, {
    key: 'checkRoot',
    value: function checkRoot() {
      var parent = this.parent;
      if (!parent || parent.isRoot || parent.isNewTemplate) return true;
      if (parent.isVirtualNode && parent.checkRoot()) return true;
      return false;
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
  }, {
    key: 'getAllRequire',
    value: function getAllRequire() {
      var re = [];
      var eachHandler = function eachHandler(dom) {
        _util2['default'].concat(re, dom.deliverRequire());
      };
      this.each(eachHandler);
      return re;
    }
  }, {
    key: 'getChildrenCreate',
    value: function getChildrenCreate() {
      var re = [];
      _util2['default'].each(this.children, function (child) {
        _util2['default'].concat(re, child.deliverCreate());
      });
      return re;
    }
  }, {
    key: 'getChildrenAppend',
    value: function getChildrenAppend() {
      var re = [];
      _util2['default'].each(this.children, function (child) {
        _util2['default'].concat(re, child.deliverAppend());
      });
      return re;
    }
  }, {
    key: 'getChildrenUpdate',
    value: function getChildrenUpdate() {
      var re = [];
      _util2['default'].each(this.children, function (child) {
        _util2['default'].concat(re, child.deliverUpdate());
      });
      return re;
    }
  }, {
    key: 'getChildrenRemove',
    value: function getChildrenRemove() {
      var re = [];
      _util2['default'].each(this.children, function (child) {
        _util2['default'].concat(re, child.deliverRemove());
      });
      return re;
    }

    // functions could be override
  }, {
    key: 'parse',
    value: function parse(source) {}
  }, {
    key: 'init',
    value: function init() {}
  }, {
    key: 'deliverRequire',
    value: function deliverRequire() {
      return [];
    }
  }, {
    key: 'deliverCreate',
    value: function deliverCreate() {
      return this.getChildrenCreate();
    }
  }, {
    key: 'deliverAppend',
    value: function deliverAppend() {
      return this.getChildrenAppend();
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      return this.getChildrenUpdate();
    }
  }, {
    key: 'deliverRemove',
    value: function deliverRemove() {
      return this.getChildrenRemove();
    }
  }]);

  return Basic;
})(_getter2['default']);

exports['default'] = Basic;
module.exports = exports['default'];