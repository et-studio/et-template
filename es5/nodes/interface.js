'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var config = {
  'templateFunctionPrefix': 'Template_'
};

var Interface = (function () {
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
      if (nodePrev) nodePrev.next = nodeNext;
      if (nodeNext) nodeNext.previous = nodePrev;
      this.previous = null;
      this.next = null;

      var newChidren = [];
      var _this = this;
      _util2['default'].each(this.parent.children, function (child) {
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
      if (currentNext) currentNext.previous = node;
      this.next = node;

      var newChidren = [];
      var _this = this;
      _util2['default'].each(this.parent.children, function (child) {
        newChidren.push(child);
        if (child.getId() === _this.getId()) {
          newChidren.push(node);
        }
      });
      this.parent.children = newChidren;
    }
  }, {
    key: 'getOuterHTML',
    value: function getOuterHTML() {
      var header = this.source;
      var tail = this.tail;

      var body = '';
      this.children.map(function (node) {
        return body += node.getOuterHTML();
      });
      return '' + header + body + tail;
    }
  }, {
    key: 'getInnerHTML',
    value: function getInnerHTML() {
      var html = '';
      this.children.map(function (node) {
        return html += node.getOuterHTML();
      });
      return html;
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

exports['default'] = Interface;
module.exports = exports['default'];