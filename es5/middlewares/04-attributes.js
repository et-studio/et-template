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

var VALUE_BIND_KEY = '[(value)]';
var OUTPUT_KEY = 'et-output';
var EVENT_PREFIX = 'on-';
var EVENT_LEFT_BRACKET = '(';
var EVENT_RIGHT_BRACKET = ')';
var EVENT_SPLIT = ',';

var MiddlewareAttributes = (function (_Basic) {
  _inherits(MiddlewareAttributes, _Basic);

  function MiddlewareAttributes() {
    _classCallCheck(this, MiddlewareAttributes);

    _get(Object.getPrototypeOf(MiddlewareAttributes.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MiddlewareAttributes, [{
    key: 'run',
    value: function run(last, options) {
      last.each(this.checkNode.bind(this));
      return last;
    }
  }, {
    key: 'checkNode',
    value: function checkNode(node) {
      if (node.nodeType === 1) {
        this.translateValueBind(node);
        this.translateElementAttributes(node);
      }
    }
  }, {
    key: 'translateValueBind',
    value: function translateValueBind(element) {
      var attributes = element.attributes;
      for (var key in attributes) {
        var expression = attributes[key];
        if (this.chargeIsValueBind(key)) {
          delete attributes[key];
          attributes['value'] = '{{' + expression + '}}';
          attributes['et-output'] = expression;
        }
      }
    }
  }, {
    key: 'translateElementAttributes',
    value: function translateElementAttributes(element) {
      var attributes = element.attributes || {};
      for (var key in attributes) {
        var expression = attributes[key];
        var eventName = this.getEventFromKey(key);
        var expressions = this.parseEventExpression(expression);

        if (this.chargeIsOutput(key)) {
          delete attributes[key];
          element.setOutput(expression);
        } else if (eventName) {
          delete attributes[key];
          element.setEvent(eventName, expressions[0], expressions.slice(1));
        }
      }
    }
  }, {
    key: 'chargeIsValueBind',
    value: function chargeIsValueBind(key) {
      return key === VALUE_BIND_KEY;
    }
  }, {
    key: 'chargeIsOutput',
    value: function chargeIsOutput(key) {
      return key === OUTPUT_KEY;
    }
  }, {
    key: 'getEventFromKey',
    value: function getEventFromKey(key) {
      var isLeftMatch = key.indexOf(EVENT_LEFT_BRACKET) === 0;
      var isRightMatch = key.indexOf(EVENT_RIGHT_BRACKET) === key.length - 1;

      if (key.indexOf(EVENT_PREFIX) === 0) {
        // parse string like 'on-click'
        return key.substr(EVENT_PREFIX.length);
      } else if (isLeftMatch && isRightMatch) {
        // parse string like (click)
        return key.substr(1, key.length - 2);
      }
      return null;
    }
  }, {
    key: 'parseEventExpression',
    value: function parseEventExpression(expression) {
      var results = expression.split(EVENT_SPLIT);
      return results.map(function (item) {
        return item.trim();
      });
    }
  }]);

  return MiddlewareAttributes;
})(_basicMiddleware2['default']);

exports['default'] = new MiddlewareAttributes();
module.exports = exports['default'];