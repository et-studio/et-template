'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

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

var OriginNode = (function () {
  function OriginNode(source) {
    _classCallCheck(this, OriginNode);

    this.source = source || '';
    this.children = [];
    this.expressions = [];

    this.nodeName = null;
    this.header = null;
    this.nodeType = null;
    this.attributes = null;

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
    value: function createChild(source) {
      var node = new OriginNode(source);
      this.children.push(node);
      node.parent = this;
      return node;
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
          current.isClosed = true;
          break;
        }
        current = current.parent;
      }
      current.closeAll();
      return current.parent || current;
    }
  }, {
    key: 'closeAll',
    value: function closeAll() {
      _util2['default'].each(this.children, function (child) {
        child.closeAll();
      });

      if (this.parent && !this.isClosed) {
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
      this.children.map(function (child) {
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
      this.children.map(function (child) {
        child.each(callback);
      });
    }
  }]);

  return OriginNode;
})();

exports['default'] = OriginNode;
module.exports = exports['default'];