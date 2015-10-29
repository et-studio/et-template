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

var TRANSLATE_MAP = {
  '&quot;': '\\"',
  '&amp;': '\\&',
  '&lt;': '\\<',
  '&gt;': '\\>',
  '&nbsp;': ' '
};

var MiddlewareSourceTranslator = (function (_Basic) {
  _inherits(MiddlewareSourceTranslator, _Basic);

  function MiddlewareSourceTranslator() {
    _classCallCheck(this, MiddlewareSourceTranslator);

    _get(Object.getPrototypeOf(MiddlewareSourceTranslator.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MiddlewareSourceTranslator, [{
    key: 'run',
    value: function run(origin, options) {
      var _this = this;

      origin.each(function (node) {
        var nodeName = node.nodeName;
        var source = node.source.trim();
        var header = node.header.trim();

        node.header = _this.translateSource(header);
        node.source = _this.translateSource(source);
        node.nodeType = _this.getNodeType(nodeName, source);
      });
      return origin;
    }
  }, {
    key: 'translateSource',
    value: function translateSource(source) {
      source = source.trim().replace(/\s+/g, ' ');
      for (var key in TRANSLATE_MAP) {
        var value = TRANSLATE_MAP[key];
        source = source.replace(new RegExp(key, 'g'), value);
      }
      return source;
    }
  }, {
    key: 'getNodeType',
    value: function getNodeType(nodeName, source) {
      if (nodeName.indexOf('#') === 0 || !source) {
        return 'ET';
      } else if (nodeName) {
        return 1;
      } else {
        return 3;
      }
    }
  }]);

  return MiddlewareSourceTranslator;
})(_basicMiddleware2['default']);

exports['default'] = new MiddlewareSourceTranslator();
module.exports = exports['default'];