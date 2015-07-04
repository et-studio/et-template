'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _machine = require('./machine');

var _machine2 = _interopRequireDefault(_machine);

var _nodesOrigin = require('../nodes/origin');

var _nodesOrigin2 = _interopRequireDefault(_nodesOrigin);

// @tableStart: origin
var originTableOptions = {
  states: ['text', 'tagEnd', 'closeEnd', 'tagStart', 'tag', 'strEnd', 'str{{', 'str\'', 'str"', 'closeStart', 'close'],
  symbols: ['</', '<', '>', '[/#', '[#', ']', '{{', '}}', '\\\'', '\'', '\\"', '"', ' ', '\r', '\n'],
  table: [{ '0': 'closeStart', '1': 'tagStart', '2': 'tagEnd', '3': 'closeStart', '4': 'tagStart', '5': 'text', '6': 'text', '7': 'text', '8': 'text', '9': 'text', '10': 'text', '11': 'text', '12': 'text', '13': 'text', '14': 'text', '-1': 'text' }, { '0': 'closeStart', '1': 'tagStart', '2': 'tagEnd', '3': 'closeStart', '4': 'tagStart', '5': 'text', '6': 'text', '7': 'text', '8': 'text', '9': 'text', '10': 'text', '11': 'text', '12': 'text', '13': 'text', '14': 'text', '-1': 'text' }, { '0': 'closeStart', '1': 'tagStart', '2': 'tagEnd', '3': 'closeStart', '4': 'tagStart', '5': 'text', '6': 'text', '7': 'text', '8': 'text', '9': 'text', '10': 'text', '11': 'text', '12': 'text', '13': 'text', '14': 'text', '-1': 'text' }, { '0': 'tag', '1': 'tag', '2': 'tag', '3': 'tag', '4': 'tag', '5': 'tag', '6': 'tag', '7': 'tag', '8': 'tag', '9': 'tag', '10': 'tag', '11': 'tag', '12': 'tag', '13': 'tag', '14': 'tag', '-1': 'tag' }, { '0': 'tag', '1': 'tag', '2': 'tagEnd', '3': 'closeStart', '4': 'tagStart', '5': 'tagEnd', '6': 'str{{', '7': 'tag', '8': 'tag', '9': 'str\'', '10': 'tag', '11': 'str"', '12': 'tag', '13': 'tag', '14': 'tag', '-1': 'tag' }, { '0': 'tag', '1': 'tag', '2': 'tagEnd', '3': 'closeStart', '4': 'tagStart', '5': 'tagEnd', '6': 'str{{', '7': 'tag', '8': 'tag', '9': 'str\'', '10': 'tag', '11': 'str"', '12': 'tag', '13': 'tag', '14': 'tag', '-1': 'tag' }, { '0': 'str{{', '1': 'str{{', '2': 'str{{', '3': 'str{{', '4': 'str{{', '5': 'str{{', '6': 'str{{', '7': 'strEnd', '8': 'str{{', '9': 'str{{', '10': 'str{{', '11': 'str{{', '12': 'str{{', '13': 'str{{', '14': 'str{{', '-1': 'str{{' }, { '0': 'str\'', '1': 'str\'', '2': 'str\'', '3': 'str\'', '4': 'str\'', '5': 'str\'', '6': 'str\'', '7': 'str\'', '8': 'str\'', '9': 'strEnd', '10': 'str\'', '11': 'str\'', '12': 'str\'', '13': 'str\'', '14': 'str\'', '-1': 'str\'' }, { '0': 'str"', '1': 'str"', '2': 'str"', '3': 'str"', '4': 'str"', '5': 'str"', '6': 'str"', '7': 'str"', '8': 'str"', '9': 'str"', '10': 'str"', '11': 'strEnd', '12': 'str"', '13': 'str"', '14': 'str"', '-1': 'str"' }, { '0': 'close', '1': 'close', '2': 'close', '3': 'close', '4': 'close', '5': 'close', '6': 'close', '7': 'close', '8': 'close', '9': 'close', '10': 'close', '11': 'close', '12': 'close', '13': 'close', '14': 'close', '-1': 'close' }, { '0': 'close', '1': 'close', '2': 'closeEnd', '3': 'close', '4': 'close', '5': 'closeEnd', '6': 'close', '7': 'close', '8': 'close', '9': 'close', '10': 'close', '11': 'close', '12': 'close', '13': 'close', '14': 'close', '-1': 'close' }]
};
// @tableEnd
var originMachine = new _machine2['default'](originTableOptions);

var OriginParser = (function () {
  function OriginParser() {
    _classCallCheck(this, OriginParser);
  }

  _createClass(OriginParser, [{
    key: 'parse',
    value: function parse(str) {
      var root = new _nodesOrigin2['default']();
      var currentNode = root;
      var text = '';
      var closeName = '';
      originMachine.each(str, function (state, token) {
        switch (state) {
          case 'tagStart':
          case 'tagEnd':
          case 'closeStart':
            currentNode.saveSource(text);
            text = '';
        }
        switch (state) {
          case 'text':
            text += token;
            break;
          case 'tag':
          case 'str{{':
          case 'str\'':
          case 'str"':
          case 'strEnd':
            currentNode.addSource(token);
            break;
          case 'tagStart':
            currentNode = currentNode.createChild(token);
            break;
          case 'tagEnd':
            currentNode.saveChildrenToExpressions();
            currentNode.addSource(token);
            break;
          case 'closeStart':
            closeName = '';
            break;
          case 'close':
            closeName += token;
            break;
          case 'closeEnd':
            currentNode = currentNode.closeNode(closeName);
            break;
          default:
            throw new Error('The state: \'' + state + '\' is not defined.');
        }
      });

      currentNode.saveSource(text);
      root.closeAll();
      root.removeEmptyNode();
      return root;
    }
  }]);

  return OriginParser;
})();

exports['default'] = new OriginParser();
module.exports = exports['default'];