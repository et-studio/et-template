'use strict';

var _ = require('../util');

var states = ['string', 'start', 'expression', 'end'];
var symbols = ['{{', '}}'];

var machine = {
  switchState: function switchState(state, symbol) {
    var stateIndex = states.indexOf(state);
    var symbolIndex = symbols.indexOf(symbol);
    switch (stateIndex) {
      case 0:
        if (symbolIndex === 0) {
          return states[1];
        } else {
          return states[0];
        }
      case 1:
      case 2:
        if (symbolIndex === 1) {
          return states[3];
        } else {
          return states[2];
        }
      case 3:
        return states[0];
      default:
        throw new Error('Unexpected state.');
    }
  }
};

module.exports = {
  isErraticValue: function isErraticValue(str) {
    if (!str) {
      return false;
    }
    var start = str.indexOf('{{');
    var end = str.lastIndexOf('}}');
    return start >= 0 && end > start;
  },
  getSymbol: function getSymbol(str, index) {
    var re = '';
    _.each(symbols, function (symbol) {
      var tmp = str.substr(index, symbol.length);
      if (tmp === symbol) {
        re = symbol;
        return false;
      }
    });
    if (!re) {
      re = str[index];
    }
    return re;
  },
  pushStr: function pushStr(list, str, isExpression) {
    if (str && isExpression) {
      list.push(str);
    } else if (str) {
      list.push('\'' + str + '\'');
    }
  },
  compileValue: function compileValue(str) {
    // 'xxx{{it.getSrc()}}bbb{{it.src2}}'
    // ('xxx' + it.getSrc() + 'bbb' + it.src2)
    var list = [];
    var tmp = '';
    var state = 'string';
    for (var i = 0, len = str.length; i < len;) {
      var symbol = this.getSymbol(str, i);
      state = machine.switchState(state, symbol);
      switch (state) {
        case 'string':
        case 'expression':
          tmp += symbol;
          break;
        case 'start':
          this.pushStr(list, tmp);
          tmp = '';
          break;
        case 'end':
          this.pushStr(list, tmp, true);
          tmp = '';
          break;
      }
      i += symbol.length;
    }
    this.pushStr(list, tmp);
    return '(' + list.join(' + ') + ')';
  }
};