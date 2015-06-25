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
    this.isNewTemplate = false;
    this.args = [];
    this.nodeType = 'ET';
    this.parent = options.parent;
    this.previous = options.previous;
    this.next = null;
    this.isRoot = !this.parent;
    this.children = [];
    this.parse(source);
  }

  _inherits(Basic, _NodeInterface);

  _createClass(Basic, [{
    key: 'getNewTemplateDoms',
    value: function getNewTemplateDoms() {
      var re = [];
      this.each(function (dom) {
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
    key: 'isErraticValue',
    value: function isErraticValue(str) {
      if (!str) {
        return false;
      }
      var start = str.indexOf('{{');
      var end = str.lastIndexOf('}}');
      return 0 <= start && start < end;
    }
  }, {
    key: 'saveArgument',
    value: function saveArgument() {
      for (var _len = arguments.length, list = Array(_len), _key = 0; _key < _len; _key++) {
        list[_key] = arguments[_key];
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
      _.each(this.parent.children, function (child) {
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
      this.each(function (dom) {
        dom.init();
      });
    }
  }, {
    key: 'parse',

    // attributes or functions could be override
    value: function parse(source) {}
  }, {
    key: 'init',
    value: function init() {}
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

// be called in constructor

// should be called after the whole Tree is created