'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var transMap = {
  '&quot;': '\\"',
  '&amp;': '\\&',
  '&lt;': '\\<',
  '&gt;': '\\>',
  '&nbsp;': ' '
};

// OriginNode
// - nodeName     节点名称
// - nodeType     节点类型 [1, 3, 8, 'ET']
// - attributes   {key, value}
// - header       除了节点名称的部分
// - expressions  属性表达式
// - children     后代节点

var OriginNode = (function () {
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
      if (text === undefined) text = '';

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
      _util2['default'].each(this.children, function (child) {
        child.closeAll();
      });

      if (this.parent && !this.isClosed) {
        this.transSource();
        _util2['default'].concat(this.parent.children, this.children);
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
        _util2['default'].concat(children, root.children);
        root.children = [];
        root = root.parent;
      }
      _util2['default'].concat(root.children, children);
      return this;
    }
  }, {
    key: 'removeEmptyNode',
    value: function removeEmptyNode() {
      var newChildren = [];
      this.children.forEach(function (child) {
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
        this.children.forEach(function (child) {
          child.each(callback);
        });
      }
    }
  }]);

  return OriginNode;
})();

exports['default'] = OriginNode;
module.exports = exports['default'];