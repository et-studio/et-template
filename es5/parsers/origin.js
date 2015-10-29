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
  states: ['text', 'nnStart', 'nodeName', 'hHeader', 'etHeader', 'hTail', 'etTail', '_str[', '_str{{', '_str1', '_str2', '_str3', '_comment'],
  symbols: ['<', '</', '>', '[#', '[/#', '[', ']', '<!--', '-->', '\'', '\\\'', '"', '\\"', '`', '\\`', '{{', '}}', /\s/, /\w/],
  table: [{ '0': 'nnStart', '1': 'hTail', '2': 'text', '3': 'nnStart', '4': 'etTail', '5': 'text', '6': 'text', '7': '_comment', '8': 'text', '9': 'text', '10': 'text', '11': 'text', '12': 'text', '13': 'text', '14': 'text', '15': '_str{{', '16': 'text', '17': 'text', '18': 'text', '-1': 'text' }, { '0': 'nodeName', '1': 'nodeName', '2': 'nodeName', '3': 'nodeName', '4': 'nodeName', '5': 'nodeName', '6': 'nodeName', '7': 'nodeName', '8': 'nodeName', '9': 'nodeName', '10': 'nodeName', '11': 'nodeName', '12': 'nodeName', '13': 'nodeName', '14': 'nodeName', '15': 'nodeName', '16': 'nodeName', '17': '1', '18': 'nodeName', '-1': 'nodeName' }, { '0': 'nodeName', '1': 'nodeName', '2': 'hEnd:text', '3': 'nodeName', '4': 'nodeName', '5': 'nodeName', '6': 'hEnd:text', '7': 'nodeName', '8': 'nodeName', '9': 'nodeName', '10': 'nodeName', '11': 'nodeName', '12': 'nodeName', '13': 'nodeName', '14': 'nodeName', '15': 'nodeName', '16': 'nodeName', '17': 'nnEnd', '18': 'nodeName', '-1': 'nodeName' }, { '0': 'hHeader', '1': 'hHeader', '2': 'hEnd:text', '3': 'nnStart', '4': 'hHeader', '5': 'hHeader', '6': 'hHeader', '7': 'hHeader', '8': 'hHeader', '9': '_str1', '10': 'hHeader', '11': '_str2', '12': 'hHeader', '13': '_str3', '14': 'hHeader', '15': '_str{{', '16': 'hHeader', '17': 'hHeader', '18': 'hHeader', '-1': 'hHeader' }, { '0': 'etHeader', '1': 'etHeader', '2': 'etHeader', '3': 'etHeader', '4': 'etHeader', '5': '_str[', '6': 'hEnd:text', '7': 'etHeader', '8': 'etHeader', '9': '_str1', '10': 'etHeader', '11': '_str2', '12': 'etHeader', '13': '_str3', '14': 'etHeader', '15': 'etHeader', '16': 'etHeader', '17': 'etHeader', '18': 'etHeader', '-1': 'etHeader' }, { '0': 'hTail', '1': 'hTail', '2': 'tEnd:text', '3': 'hTail', '4': 'hTail', '5': 'hTail', '6': 'hTail', '7': 'hTail', '8': 'hTail', '9': 'hTail', '10': 'hTail', '11': 'hTail', '12': 'hTail', '13': 'hTail', '14': 'hTail', '15': 'hTail', '16': 'hTail', '17': '2', '18': 'hTail', '-1': 'hTail' }, { '0': 'etTail', '1': 'etTail', '2': 'etTail', '3': 'etTail', '4': 'etTail', '5': 'etTail', '6': 'tEnd:text', '7': 'etTail', '8': 'etTail', '9': 'etTail', '10': 'etTail', '11': 'etTail', '12': 'etTail', '13': 'etTail', '14': 'etTail', '15': 'etTail', '16': 'etTail', '17': '2', '18': 'etTail', '-1': 'etTail' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '_str[', '6': '_last', '7': '', '8': '', '9': '', '10': '', '11': '', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '', '12': '', '13': '', '14': '', '15': '', '16': '_last', '17': '', '18': '', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '_last', '10': '', '11': '', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '_last', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '', '12': '', '13': '_last', '14': '', '15': '', '16': '', '17': '', '18': '', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '_last', '9': '', '10': '', '11': '', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '-1': '' }]
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
      var currentNode = root.createChild();

      var tail = '';
      originMachine.each(str, function (state, token) {
        switch (state) {
          case '_comment':
            break;
          case 'text':
          case '_str[':
          case '_str{{':
          case '_str1':
          case '_str2':
          case '_str3':
          case 'nodeName':
          case 'hHeader':
          case 'etHeader':
            currentNode.addSource(token);
            break;
          case 'nnStart':
            currentNode = currentNode.createChild();
            currentNode.startNodeName(token);
            break;
          case 'nnEnd':
            currentNode.startHeader(token);
            if (currentNode.nodeName.indexOf('#') === 0) {
              return 'etHeader';
            } else if (currentNode.nodeName) {
              return 'hHeader';
            }
            break;
          case 'hEnd':
            currentNode.closeHeader(token);
            currentNode = currentNode.createChild();
            break;
          case 'hTail':
          case 'etTail':
            tail += token;
            break;
          case 'tEnd':
            // return of closeNode method is the parent of the closed node
            currentNode = currentNode.closeNode(tail + token);
            tail = '';
            if (!currentNode.isHeaderClosed) {
              if (currentNode.nodeName.indexOf('#') === 0) {
                return 'etHeader';
              } else if (currentNode.nodeName) {
                return 'hHeader';
              }
            }
            currentNode = currentNode.createChild();
            break;
          default:
            throw new Error('The state: \'' + state + '\' is not defined.');
        }
      });
      currentNode.createChild(tail);
      root.closeAll();
      root.removeEmptyNode();
      return root;
    }
  }]);

  return OriginParser;
})();

exports['default'] = new OriginParser();
module.exports = exports['default'];