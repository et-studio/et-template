'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('../util');

var OriginNode = (function () {
  function OriginNode(parent) {
    var source = arguments[1] === undefined ? '' : arguments[1];
    var options = arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, OriginNode);

    this.lineNumber = options.lineNumber;
    this.isClosed = false;
    this.source = source.trim();
    this.parent = parent;
    this.children = [];
    this.expressions = [];
  }

  _createClass(OriginNode, [{
    key: 'addSource',
    value: function addSource(str) {
      this.source += str;
    }
  }, {
    key: 'createChild',
    value: function createChild(source, options) {
      var node = new OriginNode(this, source, options);
      this.children.push(node);
      return node;
    }
  }, {
    key: 'saveSource',
    value: function saveSource(source, options) {
      if (source === undefined) source = '';

      source = source.trim();
      if (source) {
        this.createChild(source, options);
      }
    }
  }, {
    key: 'closeNode',
    value: function closeNode(closeName) {
      var current = this;
      while (current.parent) {
        if (current.matchClose(closeName)) {
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
      _.each(this.children, function (child) {
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
    value: function matchClose(closeName) {
      var start = '';
      var source = '';
      if (this.source.indexOf('<') === 0) {
        start = '<' + closeName + ' ';
        source = '<' + closeName + '>';
      } else if (this.source.indexOf('[#') === 0) {
        start = '[#' + closeName + ' ';
        source = '[#' + closeName + ']';
      } else {
        return false;
      }
      var currentSource = this.source.trim();
      var isMatch = currentSource === source || currentSource.indexOf(start) === 0;
      return isMatch;
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
      this.children.forEach(function (child) {
        if (child && child.source) {
          child.removeEmptyNode();
          newChildren.push(child);
        }
      });
      this.children = newChildren;
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

module.exports = OriginNode;