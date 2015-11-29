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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _interface = require('./interface');

var _interface2 = _interopRequireDefault(_interface);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _worker = require('../worker');

var _worker2 = _interopRequireDefault(_worker);

var Basic = (function (_NodeInterface) {
  _inherits(Basic, _NodeInterface);

  function Basic(origin, options) {
    _classCallCheck(this, Basic);

    _get(Object.getPrototypeOf(Basic.prototype), 'constructor', this).call(this, origin, options);

    this.origin = origin;
    this.options = options;
    this.nodeType = origin.nodeType || 'ET';
    this.nodeName = origin.nodeName;
    this.source = origin.source;
    this.tail = origin.tail;

    this.isNewTemplate = false;
    this.args = [];

    this.children = [];
    this.parse(origin.source);
  }

  _createClass(Basic, [{
    key: 'getNewTemplateDoms',
    value: function getNewTemplateDoms() {
      var results = [];
      this.each(function (dom) {
        if (!dom.parent || dom.isNewTemplate) {
          if (dom.nodeName === '#for' && dom.checkIsImportTemplate()) {
            // HACK for ForNode
            return;
          }
          results.push(dom);
        }
      });
      return results;
    }
  }, {
    key: 'getCreateList',
    value: function getCreateList() {
      var results = [];
      _util2['default'].each(this.children, function (child) {
        var tmp = child.deliverCreate();
        if (tmp) results.push(tmp);

        if (!child.isNewTemplate) {
          _util2['default'].concat(results, child.getCreateList());
        }
      });
      return results;
    }
  }, {
    key: 'getUpdateList',
    value: function getUpdateList() {
      var results = [];
      _util2['default'].each(this.children, function (child) {
        var tmp = child.deliverUpdate();
        if (tmp) results.push(tmp);

        if (!child.isNewTemplate) {
          _util2['default'].concat(results, child.getUpdateList());
        }
      });
      return results;
    }
  }, {
    key: 'getDependencies',
    value: function getDependencies() {
      var re = [];
      this.each(function (dom) {
        _util2['default'].concat(re, dom.deliverDependencies());
      });
      return re;
    }
  }, {
    key: 'getArguments',
    value: function getArguments() {
      var re = [];

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
    key: 'each',
    value: function each(callback) {
      if (typeof callback !== 'function') return;
      if (callback(this) === false) return;
      this.children.map(function (node) {
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
      if (typeof _worker2['default'][method] === 'function') {
        return _worker2['default'][method](it);
      }
    }
  }, {
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var method = this.namespace + '_update';
      var it = this.assembleWorkerData();
      if (typeof _worker2['default'][method] === 'function') {
        return _worker2['default'][method](it);
      }
    }
  }]);

  return Basic;
})(_interface2['default']);

exports['default'] = Basic;
module.exports = exports['default'];