'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

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

var NodeInterface = require('./getter');
var _ = require('../util');

var Basic = (function (_NodeInterface) {
  function Basic(source) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Basic);

    _get(Object.getPrototypeOf(Basic.prototype), 'constructor', this).call(this, source, options);

    this._source = source;
    this._lineNumber = options.lineNumber;
    this._index = options.index;
    this.args = [];
    this.nodeType = 'ET';
    this.parent = options.parent;
    this.previous = options.previous;
    this.next = null;
    this.children = [];
    this.parseSource(source);
  }

  _inherits(Basic, _NodeInterface);

  _createClass(Basic, [{
    key: 'getNewTemplateDoms',
    value: function getNewTemplateDoms() {
      var re = [this];
      _.each(this.getPosterity(), function (dom) {
        if (dom && dom.isNewTemplate) {
          re.push(dom);
        }
      });
      return re;
    }
  }, {
    key: 'getCreateList',
    value: function getCreateList() {
      var re = [];
      _.each(this.children, function (child) {
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
      _.each(this.children, function (child) {
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
      return _.uniq(re);
    }
  }, {
    key: 'getPosterity',
    value: function getPosterity() {
      var doms = [];
      _.each(this.children, function (child) {
        if (child) {
          doms.push(child);
          _.concat(doms, child.getPosterity());
        }
      });
      return doms;
    }
  }, {
    key: 'checkRoot',
    value: function checkRoot() {
      var parent = this.parent;
      // 当不存在nodeType的时候也认为是root
      if (!parent || !parent.nodeType || parent.nodeType === 'root' || parent.isNewTemplate) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'saveArgument',
    value: function saveArgument() {
      for (var _len = arguments.length, list = Array(_len), _key = 0; _key < _len; _key++) {
        list[_key] = arguments[_key];
      }

      var args = this.args;
      _.each(list, function (str) {
        if (str) {
          args.push(str);
        }
      });
      return this;
    }
  }, {
    key: 'initAll',
    value: function initAll() {
      this.init();
      _.each(this.child, function (child) {
        child.initAll();
      });
    }
  }, {
    key: 'init',
    value: function init() {
      return this;
    }
  }, {
    key: 'parseSource',
    value: function parseSource(source) {}
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
  }, {
    key: 'isNewTemplate',

    // attributes or functions could be override
    get: function () {
      return false;
    }
  }]);

  return Basic;
})(NodeInterface);

module.exports = Basic;