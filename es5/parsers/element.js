'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

// @tableStart: element
var elementTableOptions = {
  states: ['start', 'name', 'scan', 'key', 'valueStart', 'value', 'value\'', 'value"', '_str', 'valueStr', 'end'],
  symbols: ['<', '>', '\\"', '"', '\\\'', '\'', '=', ' ', '\r', '\n', '{{', '}}'],
  table: [{ '0': 'start', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '', '-1': 'name' }, { '0': '', '1': 'end', '2': '', '3': '', '4': '', '5': '', '6': '', '7': 'scan', '8': 'scan', '9': 'scan', '10': '', '11': '', '-1': 'name' }, { '0': '', '1': 'end', '2': '', '3': '', '4': '', '5': '', '6': 'valueStart', '7': 'scan', '8': 'scan', '9': 'scan', '10': '', '11': '', '-1': 'key' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': 'valueStart', '7': '', '8': '', '9': '', '10': '', '11': '', '-1': 'key' }, { '0': '', '1': '', '2': '', '3': 'value"', '4': '', '5': 'value\'', '6': '', '7': 'valueStart', '8': 'valueStart', '9': 'valueStart', '10': 'valueStr', '11': '', '-1': 'value' }, { '0': 'value', '1': 'end', '2': 'value', '3': 'value', '4': 'value', '5': 'value', '6': 'value', '7': 'scan', '8': 'scan', '9': 'scan', '10': '_str', '11': 'value', '-1': 'value' }, { '0': 'value\'', '1': 'value\'', '2': 'value\'', '3': 'value\'', '4': 'value\'', '5': 'scan', '6': 'value\'', '7': 'value\'', '8': 'value\'', '9': 'value\'', '10': '_str', '11': 'value\'', '-1': 'value\'' }, { '0': 'value"', '1': 'value"', '2': 'value"', '3': 'scan', '4': 'value"', '5': 'value"', '6': 'value"', '7': 'value"', '8': 'value"', '9': 'value"', '10': '_str', '11': 'value"', '-1': 'value"' }, { '0': '_str', '1': '_str', '2': '_str', '3': '_str', '4': '_str', '5': '_str', '6': '_str', '7': '_str', '8': '_str', '9': '_str', '10': '_str', '11': '_last', '-1': '_str' }, { '0': 'valueStr', '1': 'valueStr', '2': 'valueStr', '3': 'valueStr', '4': 'valueStr', '5': 'valueStr', '6': 'valueStr', '7': 'valueStr', '8': 'valueStr', '9': 'valueStr', '10': 'valueStr', '11': 'value', '-1': 'valueStr' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '', '-1': '' }]
};
// @tableEnd

var Parser = require('./parser');
var Machine = require('./machine');
var elementMachine = new Machine(elementTableOptions);

var ElementParser = (function (_Parser) {
  function ElementParser() {
    _classCallCheck(this, ElementParser);

    _get(Object.getPrototypeOf(ElementParser.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(ElementParser, _Parser);

  _createClass(ElementParser, [{
    key: 'parse',
    value: function parse(source, options) {
      var _this2 = this;

      this.set('element', source, options);

      var _this = this;
      var lastState;

      var attrs = [];
      var attrKey = '';
      var attrValue = '';
      var str = '';
      var nodeName = '';
      elementMachine.each(source, function (state, token) {
        lastState = state;
        switch (state) {
          case 'start':
          case 'end':
            break;
          case 'name':
            nodeName += token;
            break;
          case 'scan':
            if (attrKey) {
              attrs.push({
                key: attrKey
              });
              attrKey = '';
            }
            if (attrValue) {
              var attr = attrs.pop();
              if (!attr || !attr.key || attr.value) {
                _this.throwError();
              }
              attr.value = attrValue;
              attrs.push(attr);
              attrValue = '';
            }
            break;
          case 'key':
            attrKey += token;
            break;
          case 'valueStart':
            if (attrKey) {
              attrs.push({
                key: attrKey
              });
              attrKey = '';
            }
            break;
          case 'value':
            if (str) {
              attrValue += str;
              str = '';
            }
            attrValue += token;
            break;
          case 'value\'':
            if (str) {
              attrValue += str;
              str = '';
            }
            attrValue += token;
            if (attrValue.indexOf('\'') === 0) {
              attrValue = attrValue.substr(1);
            }
            break;
          case 'value"':
            if (str) {
              attrValue += str;
              str = '';
            }
            attrValue += token;
            if (attrValue.indexOf('"') === 0) {
              attrValue = attrValue.substr(1);
            }
            break;
          case 'valueStr':
          case '_str':
            str += token;
            break;
          default:
            _this.throwError(state);
        }
      });
      if (lastState !== 'end') {
        this.throwError();
      }
      if (attrKey) {
        attrs.push({
          key: attrKey
        });
        attrKey = '';
      }
      if (attrValue) {
        var attr = attrs.pop();
        if (!attr || !attr.key || attr.value) {
          this.throwError();
        }
        attr.value = attrValue;
        attrs.push(attr);
      }

      var attrMap = {};
      attrs.forEach(function (attr) {
        if (!attr.key) {
          _this2.throwError();
        }
        attrMap[attr.key] = attr.value || '';
      });

      return {
        nodeName: nodeName.toUpperCase(),
        attributes: attrMap
      };
    }
  }]);

  return ElementParser;
})(Parser);

module.exports = new ElementParser();