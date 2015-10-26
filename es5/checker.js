'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var Checker = (function () {
  function Checker() {
    _classCallCheck(this, Checker);
  }

  _createClass(Checker, [{
    key: 'check',
    value: function check(node) {
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

  return Checker;
})();

exports['default'] = new Checker();
module.exports = exports['default'];