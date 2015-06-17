'use strict';

var _ = require('./util');
var methodStates = ['header', 'body', 'methodName', 'methodEnd'];
var methodSymbols = ['function', '_util.', '('];

var machine = {
  switchMethodState(state, symbol) {
    var stateIndex = methodStates.indexOf(state);
    var symbolIndex = methodSymbols.indexOf(symbol);
    switch (stateIndex) {
      case 0:
        if (symbolIndex === 0) {
          return methodStates[1];
        } else {
          return methodStates[0];
        }
        break;
      case 1:
        if (symbolIndex === 1) {
          return methodStates[2];
        } else {
          return methodStates[1];
        }
      case 2:
        if (symbolIndex === 2) {
          return methodStates[3];
        } else {
          return methodStates[2];
        }
      case 3:
        return methodStates[1];
      default:
        throw new Error('Unexpected method state.');
    }
  }
}

class Formatter {
  format (str) {
    str = this.formatUtilMethod(str);
    return str;
  }
  getSymbol (symbols, str, index) {
    var re = '';
    _.each(symbols, (symbol) => {
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
  }
  translateUtilMethod (tmpStr) {
    var re = '';
    _.each(tmpStr, (char) => {
      if (char === '.') {
        re += '_';
      } else {
        re += char;
      }
    });
    return re.trim();
  }
  declareUtilMethod (tmpStr) {
    var methodName = this.translateUtilMethod(tmpStr);
    return `var ${methodName} = ${tmpStr};\n`;
  }
  formatUtilMethod (str) {
    var header = '';
    var methods = [];
    var body = '';

    var tmp = '';
    var state = 'header';
    for (var i = 0, len = str.length; i < len;) {
      var symbol = this.getSymbol(methodSymbols , str, i);
      state = machine.switchMethodState(state, symbol);
      switch (state) {
        case 'header':
          header += symbol;
          break;
        case 'body':
          body += symbol;
          break;
        case 'methodName':
          tmp += symbol;
          break;
        case 'methodEnd':
          methods.push(this.declareUtilMethod(tmp));
          body = body + this.translateUtilMethod(tmp) + symbol;
          tmp = '';
          break;
      }
      i += symbol.length;
    }
    methods = _.uniq(methods);
    return `${header}${methods.join('')}${body}`;
  }
}

module.exports = new Formatter();
