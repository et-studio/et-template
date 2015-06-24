'use strict';

var _ = require('../util');

class Machine {
  constructor(options = {}) {
    this.options = options;
    this.states = options.states || [];
    this.symbols = options.symbols || [];
    this.table = options.table || [];
    this.startState = options.startState || this.states[0];
  }
  getToken(str, index) {
    var symbols = this.symbols;
    var token = '';
    _.each(symbols, (symbol) => {
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
  switchState(state, symbol) {
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
  each(str, callback) {
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
}

module.exports = Machine;
