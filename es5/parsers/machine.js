'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var Machine = (function () {
  function Machine() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Machine);

    this.options = options;
    this.states = options.states || [];
    this.symbols = options.symbols || [];
    this.table = options.table || [];
    this.startState = options.startState || this.states[0];
  }

  _createClass(Machine, [{
    key: 'getToken',
    value: function getToken(str, index) {
      var symbols = this.symbols;
      var char = str[index];
      var token = '';
      _util2['default'].each(symbols, function (symbol) {

        if (symbol && typeof symbol.test === 'function') {
          if (symbol.test(char)) {
            token = char;
            return false;
          }
        } else if (symbol && symbol.length) {
          var tmp = str.substr(index, symbol.length);
          if (tmp === symbol) {
            token = symbol;
            return false;
          }
        }
      });
      if (!token) {
        token = str[index];
      }
      return token;
    }
  }, {
    key: 'switchState',
    value: function switchState(state, symbol) {
      var stateIndex = this.states.indexOf(state);
      var symbolIndex = this.symbols.indexOf(symbol);

      var map = this.table[stateIndex];
      var re = map[symbolIndex];
      if (!re) {
        re = map['*'];
      }
      return re;
    }
  }, {
    key: 'each',
    value: function each(str, callback) {
      if (!str) return;

      var lastState = this.startState;
      var stateStack = [];
      for (var i = 0, len = str.length; i < len;) {
        var token = this.getToken(str, i);
        var state = this.switchState(lastState, token);

        if (lastState.indexOf('_') === 0 && !state) {
          state = lastState;
        } else if (state && state !== '_last' && state.indexOf('_') === 0) {
          stateStack.push(lastState);
        }

        if (state === '_last') {
          lastState = callback(lastState, token, i) || stateStack.pop();
        } else {
          lastState = callback(state, token, i) || state;
        }
        i += token.length;
      }
    }
  }]);

  return Machine;
})();

exports['default'] = Machine;
module.exports = exports['default'];