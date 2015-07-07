'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _basic = require('./basic');

var _basic2 = _interopRequireDefault(_basic);

var _if = require('./if');

var _if2 = _interopRequireDefault(_if);

var _elseif = require('./elseif');

var _elseif2 = _interopRequireDefault(_elseif);

var _else = require('./else');

var _else2 = _interopRequireDefault(_else);

var _for = require('./for');

var _for2 = _interopRequireDefault(_for);

var _html = require('./html');

var _html2 = _interopRequireDefault(_html);

var nodes = {
  '_element': _element2['default'],
  '_text': _text2['default'],
  '_comment': _comment2['default'],
  '_base': _basic2['default'],
  '#if': _if2['default'],
  '#elseif': _elseif2['default'],
  '#else': _else2['default'],
  '#for': _for2['default'],
  '#html': _html2['default']
};

var Factory = (function () {
  function Factory() {
    _classCallCheck(this, Factory);
  }

  _createClass(Factory, [{
    key: 'create',

    /**
     * options
     * - index
     * - parent
     * - previous
     * - expressions
     * - lineNumber
     */
    value: function create(source) {
      var options = arguments[1] === undefined ? {} : arguments[1];

      var parent = options.parent;
      var previous = options.previous;

      var Constructor = this.findConstuctor(source);
      var node = new Constructor(source, options);

      if (parent) {
        parent.children.push(node);
      }
      if (previous) {
        previous.next = node;
      }
      return node;
    }
  }, {
    key: 'getNodeName',
    value: function getNodeName(source) {
      if (!source) {
        return '';
      } else if (source.indexOf('<!--') === 0) {
        return '!--';
      } else if (source.indexOf('<') === 0) {
        var regHtml = /^<(\S*)[ >]/;
        return regHtml.exec(source)[1] || '';
      } else if (source.indexOf('[') === 0) {
        var regET = /^\[(\S*)[ \]]/;
        return regET.exec(source)[1] || '';
      }
      return '';
    }
  }, {
    key: 'findConstuctor',
    value: function findConstuctor(source) {
      var nodeName = this.getNodeName(source).toLowerCase();
      var Constructor = null;

      if (!source) {
        Constructor = nodes._base;
      } else if (!nodeName) {
        Constructor = nodes._text;
      } else if (nodeName === '!--') {
        Constructor = nodes._comment;
      } else if (nodeName.indexOf('#') === 0) {
        Constructor = nodes[nodeName];
      } else {
        Constructor = nodes._element;
      }

      if (!Constructor) {
        Constructor = nodes._base;
      }
      return Constructor;
    }
  }]);

  return Factory;
})();

exports['default'] = new Factory();
module.exports = exports['default'];