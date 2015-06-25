'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// @tableStart: value
var valueTableOptions = {
  states: ['string', 'start', 'expression', 'end'],
  symbols: ['{{', '}}'],
  table: [{
    '0': 'start',
    '1': 'string',
    '-1': 'string'
  }, {
    '0': 'expression',
    '1': 'end',
    '-1': 'expression'
  }, {
    '0': 'expression',
    '1': 'end',
    '-1': 'expression'
  }, {
    '0': 'string',
    '1': 'string',
    '-1': 'string'
  }]
};
// @tableEnd

var Machine = require('./machine');
var _ = require('../util');

var valueMachine = new Machine(valueTableOptions);

var ValueParser = (function () {
  function ValueParser() {
    _classCallCheck(this, ValueParser);
  }

  _createClass(ValueParser, [{
    key: 'parse',
    value: function parse(str) {
      var _this = this;

      var list = [];
      var tmp = '';

      valueMachine.each(str, function (state, token) {
        switch (state) {
          case 'string':
          case 'expression':
            tmp += token;
            break;
          case 'start':
            _this.pushStr(list, tmp);
            tmp = '';
            break;
          case 'end':
            _this.pushStr(list, tmp, true);
            tmp = '';
            break;
        }
      });
      this.pushStr(list, tmp);
      return '(' + list.join(' + ') + ')';
    }
  }, {
    key: 'pushStr',
    value: function pushStr(list, str, isExpression) {
      if (str && isExpression) {
        list.push(str);
      } else if (str) {
        list.push('\'' + str + '\'');
      }
    }
  }]);

  return ValueParser;
})();

module.exports = new ValueParser();