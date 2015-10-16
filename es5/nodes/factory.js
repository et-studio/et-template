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

var _import = require('./import');

var _import2 = _interopRequireDefault(_import);

var nodes = {
  '_element': _element2['default'],
  '_text': _text2['default'],
  '_base': _basic2['default'],
  '#if': _if2['default'],
  '#elseif': _elseif2['default'],
  '#else': _else2['default'],
  '#for': _for2['default'],
  '#html': _html2['default'],
  '#import': _import2['default']
};

var Factory = (function () {
  function Factory() {
    _classCallCheck(this, Factory);
  }

  _createClass(Factory, [{
    key: 'create',
    value: function create(source, options, expressions) {
      var Constructor = this.findConstuctor(source);
      var node = new Constructor(source, options, expressions);
      return node;
    }
  }, {
    key: 'getNodeName',
    value: function getNodeName(source) {
      var htmlMatch = /^<(\w+)[ >]|^<(\w+)$/.exec(source);
      var etMatch = /^\[(#\w+)[ \]]|^\[(#\w+)\]$/.exec(source);
      if (!source) {
        return '';
      } else if (htmlMatch) {
        return htmlMatch[1] || htmlMatch[2];
      } else if (etMatch) {
        return etMatch[1] || etMatch[2];
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