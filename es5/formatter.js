'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('./util');
var methodStates = ['header', 'body', 'methodName', 'methodEnd'];
var methodSymbols = ['function', '_util.', '('];

var machine = {
  switchMethodState: function switchMethodState(state, symbol) {
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
};

var Formatter = (function () {
  function Formatter() {
    _classCallCheck(this, Formatter);
  }

  _createClass(Formatter, [{
    key: 'format',
    value: function format(str) {
      str = this.formatUtilMethod(str);
      return str;
    }
  }, {
    key: 'getSymbol',
    value: function getSymbol(symbols, str, index) {
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
    }
  }, {
    key: 'translateUtilMethod',
    value: function translateUtilMethod(tmpStr) {
      var re = '';
      _.each(tmpStr, function (char) {
        if (char === '.') {
          re += '_';
        } else {
          re += char;
        }
      });
      return re.trim();
    }
  }, {
    key: 'declareUtilMethod',
    value: function declareUtilMethod(tmpStr) {
      var methodName = this.translateUtilMethod(tmpStr);
      return 'var ' + methodName + ' = ' + tmpStr + ';\n';
    }
  }, {
    key: 'formatUtilMethod',
    value: function formatUtilMethod(str) {
      var header = '';
      var methods = [];
      var body = '';

      var tmp = '';
      var state = 'header';
      for (var i = 0, len = str.length; i < len;) {
        var symbol = this.getSymbol(methodSymbols, str, i);
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
      return '' + header + '' + methods.join('') + '' + body;
    }
  }]);

  return Formatter;
})();

module.exports = new Formatter();