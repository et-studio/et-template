'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _machine = require('./machine');

var _machine2 = _interopRequireDefault(_machine);

// @tableStart: for
var forTableOptions = {
  states: ['start', 'header', 'headerEnd', 'itemName', 'itemEnd', 'indexName', 'indexEnd', 'exStart', 'expression'],
  symbols: ['[', ' in ', ' ', '\r', '\n', ',', ';'],
  table: [{ '0': 'start', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '-1': 'header' }, { '0': '', '1': '', '2': 'headerEnd', '3': 'headerEnd', '4': 'headerEnd', '5': '', '6': '', '-1': 'header' }, { '0': '', '1': '', '2': 'headerEnd', '3': 'headerEnd', '4': 'headerEnd', '5': '', '6': '', '-1': 'itemName' }, { '0': 'text', '1': 'exStart', '2': 'itemEnd', '3': 'itemEnd', '4': 'itemEnd', '5': 'itemEnd', '6': 'itemEnd', '-1': 'itemName' }, { '0': '', '1': 'exStart', '2': 'itemEnd', '3': 'itemEnd', '4': 'itemEnd', '5': '', '6': '', '-1': 'indexName' }, { '0': '', '1': 'exStart', '2': 'indexEnd', '3': 'indexEnd', '4': 'indexEnd', '5': 'indexEnd', '6': 'indexEnd', '-1': 'indexName' }, { '0': '', '1': 'exStart', '2': 'indexEnd', '3': 'indexEnd', '4': 'indexEnd', '5': '', '6': '', '-1': '' }, { '0': '', '1': '', '2': 'exStart', '3': 'exStart', '4': 'exStart', '5': '', '6': '', '-1': 'expression' }, { '0': 'expression', '1': 'expression', '2': 'expression', '3': 'expression', '4': 'expression', '5': 'expression', '6': 'expression', '-1': 'expression' }]
};
// @tableEnd
var forMachine = new _machine2['default'](forTableOptions);

var ForParser = (function (_Parser) {
  _inherits(ForParser, _Parser);

  function ForParser() {
    _classCallCheck(this, ForParser);

    _get(Object.getPrototypeOf(ForParser.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ForParser, [{
    key: 'parse',
    value: function parse(source, options) {
      this.set('#for', source, options);

      var _this = this;
      var nodeName = '';
      var itemName = '';
      var indexName = '';
      var expression = '';
      var lastToken = '';
      forMachine.each(source, function (state, token) {
        lastToken = token;
        switch (state) {
          case 'start':
          case 'headerEnd':
          case 'itemEnd':
          case 'indexEnd':
          case 'exStart':
            break;
          case 'header':
            nodeName += token;
            break;
          case 'itemName':
            itemName += token;
            break;
          case 'indexName':
            indexName += token;
            break;
          case 'expression':
            expression += token;
            break;
          default:
            _this.throwError(state);
        }
      });
      if (lastToken !== ']') {
        this.throwError();
      }
      nodeName = nodeName.trim().toLowerCase();
      itemName = itemName.trim();
      indexName = indexName.trim();
      expression = expression.substr(0, expression.length - 1).trim();

      if (nodeName !== '#for') {
        this.throwError();
      }
      if (!itemName) {
        this.throwError();
      }
      if (!expression) {
        this.throwError();
      }

      return {
        nodeName: nodeName,
        itemName: itemName,
        indexName: indexName,
        expression: expression
      };
    }
  }]);

  return ForParser;
})(_parser2['default']);

exports['default'] = new ForParser();
module.exports = exports['default'];