'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('./util');
var originParser = require('./parsers/origin');
var factory = require('./nodes/factory');

var Parser = (function () {
  function Parser(options) {
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
    key: 'createDom',
    value: function createDom(originNode) {
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

        var node = factory.create(source, options);
        return node;
      };
      var createChildren = function createChildren(children, parent) {
        if (children === undefined) children = [];

        var current = null;
        _.each(children, function (child) {
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