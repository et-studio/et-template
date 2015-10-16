'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _parsersOrigin = require('./parsers/origin');

var _parsersOrigin2 = _interopRequireDefault(_parsersOrigin);

var _parsersDot = require('./parsers/dot');

var _parsersDot2 = _interopRequireDefault(_parsersDot);

var _nodesFactory = require('./nodes/factory');

var _nodesFactory2 = _interopRequireDefault(_nodesFactory);

var Parser = (function () {
  function Parser(options) {
    _classCallCheck(this, Parser);

    this.options = options;
  }

  _createClass(Parser, [{
    key: 'parse',
    value: function parse(str) {
      var originNode = _parsersOrigin2['default'].parse(str);
      return this.createDom(originNode);
    }
  }, {
    key: 'parseDot',
    value: function parseDot(str) {
      str = _parsersDot2['default'].parse(str);
      return this.parse(str);
    }
  }, {
    key: 'createDom',
    value: function createDom(originNode) {
      var options = this.options;
      var index = 0;
      var createNode = function createNode(source, expressions) {
        var node = _nodesFactory2['default'].create(source, options, expressions);
        node.setIndex(index++);
        return node;
      };
      var createChildren = function createChildren(parent, origin) {
        var children = origin.children || [];
        _util2['default'].each(children, function (child) {
          var node = createNode(child.source, child.expressions);
          createChildren(node, child);
          parent.append(node);
        });
      };

      var root = createNode();
      createChildren(root, originNode);
      root.initAll();
      return root;
    }
  }]);

  return Parser;
})();

exports['default'] = Parser;
module.exports = exports['default'];