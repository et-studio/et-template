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
  function Parser() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
      var _this = this;

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

        var node = _nodesFactory2['default'].create(source, _util2['default'].extend({}, _this.options, options));
        return node;
      };
      var createChildren = function createChildren(children, parent) {
        if (children === undefined) children = [];

        var current = null;
        _util2['default'].each(children, function (child) {
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

exports['default'] = Parser;
module.exports = exports['default'];