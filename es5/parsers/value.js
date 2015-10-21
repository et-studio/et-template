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

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

// @tableStart: value
var valueTableOptions = {
  states: ['text', 'exStart', 'exBody', 'exEnd', 'ifStart', 'ifBody', 'ifEnd'],
  symbols: ['{{', '}}', '[#if ', '[/#if]'],
  table: [{ '0': 'exStart', '1': 'text', '2': 'ifStart', '3': '', '-1': 'text' }, { '0': 'exBody', '1': 'exEnd', '2': '', '3': '', '-1': 'exBody' }, { '0': 'exBody', '1': 'exEnd', '2': '', '3': '', '-1': 'exBody' }, { '0': 'text', '1': 'text', '2': 'ifStart', '3': '', '-1': 'text' }, { '0': 'ifBody', '1': 'ifBody', '2': '', '3': 'ifBody', '-1': 'ifBody' }, { '0': 'ifBody', '1': 'ifBody', '2': '', '3': 'ifEnd', '-1': 'ifBody' }, { '0': 'start', '1': 'text', '2': 'ifStart', '3': 'text', '-1': 'text' }]
};
// @tableStart: valueIf
var valueIfTableOptions = {
  states: ['start', 'ifCondition', 'endContition', 'ifContent', 'elseif', 'else', 'elseContent', '_value[', 'end'],
  symbols: ['[#if ', '[#elseif ', '[#else]', '[/#if]', ']', '['],
  table: [{ '0': 'start', '1': '', '2': '', '3': '', '4': '', '5': '', '-1': 'ifCondition' }, { '0': '', '1': '', '2': '', '3': '', '4': 'endContition', '5': '_value[', '-1': 'ifCondition' }, { '0': '', '1': 'elseif', '2': 'else', '3': 'end', '4': 'ifContent', '5': 'ifContent', '-1': 'ifContent' }, { '0': '', '1': 'elseif', '2': 'else', '3': 'end', '4': 'ifContent', '5': 'ifContent', '-1': 'ifContent' }, { '0': '', '1': '', '2': '', '3': '', '4': 'ifContent', '5': '', '-1': 'ifCondition' }, { '0': '', '1': '', '2': '', '3': 'end', '4': 'elseContent', '5': 'elseContent', '-1': 'elseContent' }, { '0': '', '1': '', '2': '', '3': 'end', '4': 'elseContent', '5': 'elseContent', '-1': 'elseContent' }, { '0': '', '1': '', '2': '', '3': '', '4': '_last', '5': '_value[', '-1': '' }, { '0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '-1': '' }]
};
// @tableEnd
var valueMachine = new _machine2['default'](valueTableOptions);
var valueIfMatchine = new _machine2['default'](valueIfTableOptions);

var ValueParser = (function (_Parser) {
  _inherits(ValueParser, _Parser);

  function ValueParser() {
    _classCallCheck(this, ValueParser);

    _get(Object.getPrototypeOf(ValueParser.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ValueParser, [{
    key: 'parse',
    value: function parse(source, options) {
      return this.parseToObject(source, options).content;
    }
  }, {
    key: 'isErratic',
    value: function isErratic(source, options) {
      return this.parseToObject(source, options).isErractic;
    }
  }, {
    key: 'parseToObject',
    value: function parseToObject(str, options) {
      this.set('value', str, options);
      var re = { list: [], isErratic: false, content: '\'\'' };

      var text = '';
      var expression = '';
      var ifCondition = '';

      var _this = this;
      var lastState = 'text';
      valueMachine.each(str, function (state, token) {
        lastState = state;
        switch (state) {
          case 'text':
            _this.pushExpression(re, expression);
            _this.pushIf(re, ifCondition);
            expression = '';
            ifCondition = '';
            break;
          case 'exStart':
          case 'ifStart':
            _this.pushText(re, text);
            _this.pushExpression(re, expression);
            _this.pushIf(re, ifCondition);
            text = '';
            expression = '';
            ifCondition = '';
        }
        switch (state) {
          case 'exEnd':
          case 'exStart':
            break;
          case 'text':
            text += token;
            break;
          case 'exBody':
            expression += token;
            break;
          case 'ifStart':
          case 'ifBody':
          case 'ifEnd':
            ifCondition += token;
            break;
          default:
            _this.throwError(state);
        }
      });
      if (['text', 'exEnd', 'ifEnd'].indexOf(lastState) < 0) {
        this.throwError();
      }
      this.pushText(re, text);
      this.pushExpression(re, expression);
      this.pushIf(re, ifCondition);

      if (re.list.length) re.content = re.list.join(' + ');
      return re;
    }
  }, {
    key: 'pushText',
    value: function pushText(obj, str) {
      if (str) {
        str = _util2['default'].translateMarks(str);
        obj.list.push('\'' + str + '\'');
      }
    }
  }, {
    key: 'pushExpression',
    value: function pushExpression(obj, str) {
      if (!str) return;

      obj.list.push('(' + str + ')');
      obj.isErractic = true;
    }
  }, {
    key: 'pushIf',
    value: function pushIf(obj, str) {
      if (!str) return false;

      var list = [];
      var current = {
        type: 'if',
        condition: '',
        content: ''
      };
      var _this = this;
      valueIfMatchine.each(str, function (state, token) {
        switch (state) {
          case 'start':
            list.push(current);
            break;
          case 'ifCondition':
          case '_value[':
            current.condition += token;
            break;
          case 'ifContent':
          case 'elseContent':
            current.content += token;
            break;
          case 'endContition':
            break;
          case 'elseif':
            current = {
              type: 'elseif',
              condition: '',
              content: ''
            };
            list.push(current);
            break;
          case 'else':
            current = {
              type: 'else',
              condition: '',
              content: ''
            };
            list.push(current);
            break;
          case 'end':
            break;
          default:
            _this.throwError(state);
        }
      });

      var parser = new ValueParser();
      var strings = list.map(function (item) {
        var content = parser.parse(item.content);
        switch (item.type) {
          case 'if':
            return 'if (' + (item.condition || '') + ') {\n            return ' + (content || '') + '\n          }';
          case 'elseif':
            return ' else if (' + (item.condition || '') + ') {\n            return ' + (content || '') + '\n          }';
          default:
            return ' else {\n            return ' + (content || '') + '\n          }';
        }
      });

      obj.list.push('(function () {\n      ' + strings.join('') + '\n      return \'\'\n    })()');
      obj.isErractic = true;
    }
  }]);

  return ValueParser;
})(_parser2['default']);

exports['default'] = new ValueParser();
module.exports = exports['default'];