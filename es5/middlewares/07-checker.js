'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var _basicMiddleware = require('./basic-middleware');

var _basicMiddleware2 = _interopRequireDefault(_basicMiddleware);

var MiddlewareChecker = (function (_Basic) {
  _inherits(MiddlewareChecker, _Basic);

  function MiddlewareChecker() {
    _classCallCheck(this, MiddlewareChecker);

    _get(Object.getPrototypeOf(MiddlewareChecker.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MiddlewareChecker, [{
    key: 'run',
    value: function run(node, options) {
      node.each(this.checkHandler.bind(this));
      return node;
    }
  }, {
    key: 'checkHandler',
    value: function checkHandler(node) {
      switch (node.nodeName) {
        case '#html':
          this.checkHtml(node);
          break;
      }
      // if (node.expressions) this.checkExpressions(node, node.expressions)
    }
  }, {
    key: 'checkExpressions',
    value: function checkExpressions(node, expressions) {
      var _this = this;

      _util2['default'].each(expressions, function (expressionNode) {
        if (expressionNode.nodeName !== '#if') {
          _this.throwError(node, 'The attributes expression just support if, else and elseif.');
        }

        var lastTag = 'if';
        _util2['default'].each(expressionNode.children, function (childNode) {
          var isET = childNode.nodeType === 'ET';
          var isElse = childNode.nodeName === '#else';
          var isElseIf = childNode.nodeName === '#elseif';

          if (isET && !isElseIf && !isElse) {
            _this.throwError(node, 'The attributes expression just support if, else and elseif.');
          } else if (isElseIf && lastTag === 'else') {
            _this.throwError(node, 'The elseif node shouldn\'t show after else.');
          } else if (isElseIf) {
            lastTag = 'elseif';
          } else if (isElse) {
            lastTag = 'else';
          } else {
            lastTag = '';
          }
        });
      });
    }
  }, {
    key: 'checkHtml',
    value: function checkHtml(node) {
      if (!node.parent) {
        this.throwError(node, 'html node need a parent');
      }
      if (node.parent.nodeType !== 1) {
        this.throwError(node, 'the parent of html node should be element node');
      }
      if (node.parent.children.length > 1) {
        this.throwError(node, 'html node should not has siblings');
      }
    }
  }, {
    key: 'throwError',
    value: function throwError(node, message) {
      throw new Error(message);
    }
  }]);

  return MiddlewareChecker;
})(_basicMiddleware2['default']);

exports['default'] = new MiddlewareChecker();
module.exports = exports['default'];