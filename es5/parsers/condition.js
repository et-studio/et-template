'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _machine = require('./machine');

var _machine2 = _interopRequireDefault(_machine);

// @tableStart: condition
var conditionTableOptions = {
  states: ['start', 'name', 'condition'],
  symbols: ['[', ' ', '\r', '\n'],
  table: [{ '0': 'start', '1': '', '2': '', '3': '', '-1': 'name' }, { '0': '', '1': 'condition', '2': 'condition', '3': 'condition', '-1': 'name' }, { '0': 'condition', '1': 'condition', '2': 'condition', '3': 'condition', '-1': 'condition' }]
};
// @tableEnd

var conditionMachine = new _machine2['default'](conditionTableOptions);

var ConditionParser = (function (_Parser) {
  function ConditionParser() {
    _classCallCheck(this, ConditionParser);

    _get(Object.getPrototypeOf(ConditionParser.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(ConditionParser, _Parser);

  _createClass(ConditionParser, [{
    key: 'parse',
    value: function parse(source) {
      var options = arguments[1] === undefined ? {} : arguments[1];

      var expectNodeName = options.expectNodeName;
      this.set(expectNodeName, source, options);

      var _this = this;
      var tag = '';
      var nodeName = '';
      var condition = '';
      var lastToken = '';
      conditionMachine.each(source, function (state, token) {
        lastToken = token;
        switch (state) {
          case 'start':
            break;
          case 'name':
            nodeName += token;
            break;
          case 'condition':
            condition += token;
            break;
          default:
            _this.throwError(state);
        }
      });
      if (lastToken !== ']') {
        this.throwError();
      }
      if (expectNodeName && nodeName.toLowerCase() !== expectNodeName) {
        this.throwError();
      }
      if (condition) {
        condition = condition.substr(0, condition.length - 1);
        condition = condition.trim();
      } else {
        nodeName = nodeName.substr(0, nodeName.length - 1);
      }

      if (nodeName === '#elseif') {
        tag = 'else if';
      } else {
        tag = nodeName.substr(1);
      }

      return {
        tag: tag,
        nodeName: nodeName,
        condition: condition
      };
    }
  }]);

  return ConditionParser;
})(_parser2['default']);

exports['default'] = new ConditionParser();
module.exports = exports['default'];