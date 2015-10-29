'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _basicMiddleware = require('./basic-middleware');

var _basicMiddleware2 = _interopRequireDefault(_basicMiddleware);

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _nodesFactory = require('../nodes/factory');

var _nodesFactory2 = _interopRequireDefault(_nodesFactory);

var MiddlewareParser = (function (_Basic) {
  _inherits(MiddlewareParser, _Basic);

  function MiddlewareParser() {
    _classCallCheck(this, MiddlewareParser);

    _get(Object.getPrototypeOf(MiddlewareParser.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MiddlewareParser, [{
    key: 'run',
    value: function run(origin, options) {
      return this.createNode(origin, options);
    }
  }, {
    key: 'createNode',
    value: function createNode(originNode, options) {
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
        return parent;
      };

      var root = createNode();
      return createChildren(root, originNode);
    }
  }]);

  return MiddlewareParser;
})(_basicMiddleware2['default']);

exports['default'] = new MiddlewareParser();
module.exports = exports['default'];