'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

// @tableStart: condition
var conditionTableOptions = {
  states: ['start', 'name', 'condition'],
  symbols: ['[', ' ', '\r', '\n'],
  table: [{
    '0': 'start',
    '1': '',
    '2': '',
    '3': '',
    '-1': 'name'
  }, {
    '0': '',
    '1': 'condition',
    '2': 'condition',
    '3': 'condition',
    '-1': 'name'
  }, {
    '0': 'condition',
    '1': 'condition',
    '2': 'condition',
    '3': 'condition',
    '-1': 'condition'
  }]
};
// @tableEnd

var Parser = require('./parser');
var Machine = require('./machine');
var _ = require('../util');

var conditionMachine = new Machine(conditionTableOptions);

var ConditionParser = (function (_Parser) {
  function ConditionParser() {
    _classCallCheck(this, ConditionParser);

    if (_Parser != null) {
      _Parser.apply(this, arguments);
    }
  }

  _inherits(ConditionParser, _Parser);

  _createClass(ConditionParser, [{
    key: 'parse',
    value: function parse(source) {
      var options = arguments[1] === undefined ? {} : arguments[1];

      var expectNodeName = options.expectNodeName || '#if';
      this.set(expectNodeName, source, options);

      var _this = this;
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
      if (nodeName.toLowerCase() !== expectNodeName) {
        this.throwError();
      }
      condition = condition.substr(0, condition.length - 1);
      condition = condition.trim();
      if (!condition) {
        this.throwError();
      }

      return {
        nodeName: nodeName,
        condition: condition
      };
    }
  }]);

  return ConditionParser;
})(Parser);

module.exports = new ConditionParser();