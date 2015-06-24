'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('../util');

var Machine = (function () {
  function Machine() {
    var options = arguments[0] === undefined ? {} : arguments[0];

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
      var token = '';
      _.each(symbols, function (symbol) {
        var tmp = str.substr(index, symbol.length);
        if (tmp === symbol) {
          token = symbol;
          return false;
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
      var states = this.states;
      var symbols = this.symbols;

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
      if (!str) {
        str = '';
      }
      var lastState = this.startState;
      var stateStack = [];
      for (var i = 0, len = str.length; i < len;) {
        var token = this.getToken(str, i);
        var state = this.switchState(lastState, token);
        if (state === '_last') {
          state = stateStack.pop();
        } else if (state && state !== lastState && state.indexOf('_') === 0) {
          stateStack.push(lastState);
        }
        callback(state, token, i);

        lastState = state;
        i += token.length;
      }
    }
  }]);

  return Machine;
})();

module.exports = Machine;