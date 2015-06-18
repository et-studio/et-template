'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('../util');

var nodes = {};
nodes._element = require('./element');
nodes._text = require('./text');
nodes._comment = require('./comment');
nodes._base = require('./basic');
nodes['#if'] = require('./if');
nodes['#elseif'] = require('./new');
nodes['#else'] = require('./new');
nodes['#for'] = require('./for');

var Factory = (function () {
  function Factory() {
    _classCallCheck(this, Factory);

    this.index = 0;
  }

  _createClass(Factory, [{
    key: 'getIndex',
    value: function getIndex() {
      return this.index++;
    }
  }, {
    key: 'findNode',
    value: function findNode(nodeType, nodeName) {
      var re;

      if (nodeName) {
        nodeName = nodeName.toLowerCase();
      }

      if (nodeType === 1) {
        re = nodes._element;
      } else if (nodeType === 3) {
        re = nodes._text;
      } else if (nodeType === 8) {
        re = nodes._comment;
      } else {
        re = nodes[nodeName];
      }

      if (!re) {
        re = nodes._base;
      }

      return re;
    }
  }, {
    key: 'create',
    value: function create(dom) {
      var options = arguments[1] === undefined ? {} : arguments[1];

      var parent = options.parent;
      var previous = options.previous;
      var next = options.next;

      var Constructor = this.findNode(dom.nodeType, dom.nodeName);
      var re = new Constructor(dom, _.extend({}, options, { index: this.getIndex() }));

      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(re);
      }
      if (previous) {
        previous.next = re;
      }
      if (next) {
        next.previous = re;
      }
      this.createChildren(re, dom.children);
      return re;
    }
  }, {
    key: 'createChildren',
    value: function createChildren(parent, children) {
      var current, previous;
      var self = this;
      _.each(children, function (child) {
        current = self.create(child, {
          parent: parent,
          previous: previous
        });
        previous = current;
      });
    }
  }]);

  return Factory;
})();

module.exports = Factory;