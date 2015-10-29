'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _util = require('../util');

var _util2 = _interopRequireDefault(_util);

var STATE_BACK_MARK = '_last';
var STATE_ALL_MATCH = '*';
var STATE_SPLIT = ':';
var STATE_CHILD_REG = /^_/;

var Machine = (function () {
  function Machine() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Machine);

    this.options = options;
    this.symbolsMap = this.mapSymbals(options.symbols || []);
    this.symbols = this.sortSymbols(options.symbols || []);
    this.states = options.states || [];
    this.table = options.table || [];
    this.startState = options.startState || this.states[0];
  }

  _createClass(Machine, [{
    key: 'mapSymbals',
    value: function mapSymbals(symbols) {
      var map = new Map();
      _util2['default'].each(symbols, function (symbol, i) {
        map.set(symbol, i);
      });
      return map;
    }
  }, {
    key: 'sortSymbols',
    value: function sortSymbols(symbols) {
      return symbols.sort(function (left, right) {
        if (left.test && !right.test) return 1;else if (!left.test && right.test) return -1;else if (left.test && right.test) return 0;

        if (left.indexOf(right) === 0) return -1;else if (right.indexOf(left) === 0) return 1;else return 0;
      });
    }
  }, {
    key: 'getTokenSet',
    value: function getTokenSet(str, index) {
      var symbols = this.symbols;
      var char = str[index];
      var token = char;
      var kickSymbol = '';

      _util2['default'].each(symbols, function (symbol, i) {
        if (symbol && typeof symbol.test === 'function') {
          if (symbol.test(char)) {
            token = char;
            kickSymbol = symbol;
            return false;
          }
        } else if (symbol && symbol.length) {
          var tmp = str.substr(index, symbol.length);
          if (tmp === symbol) {
            token = symbol;
            kickSymbol = symbol;
            return false;
          }
        }
      });

      var symbolIndex = this.symbolsMap.get(kickSymbol);
      if (!(symbolIndex >= 0)) symbolIndex = -1;
      return { token: token, index: symbolIndex };
    }
  }, {
    key: 'switchState',
    value: function switchState(currentState, symbolIndex, stateStack) {
      var stateIndex = this.states.indexOf(currentState);
      var map = this.table[stateIndex];

      var state = map[symbolIndex];
      if (!state) state = map[STATE_ALL_MATCH] || '';

      var index = state.indexOf(STATE_SPLIT);
      if (index < 0) index = state.length;

      var prevState = state.substring(0, index);
      var nextState = state.substring(index + 1) || prevState;
      var isCurrentAtLoop = STATE_CHILD_REG.test(currentState);

      if (STATE_CHILD_REG.test(nextState) && nextState !== STATE_BACK_MARK) {
        stateStack.push(currentState);
      }

      if (isCurrentAtLoop && !prevState || prevState === STATE_BACK_MARK) {
        prevState = currentState;
      }

      if (isCurrentAtLoop && !nextState) {
        nextState = currentState;
      } else if (nextState === STATE_BACK_MARK) {
        nextState = stateStack.pop() || '';
      }

      return {
        prevState: prevState,
        nextState: nextState
      };
    }
  }, {
    key: 'each',
    value: function each(str, callback) {
      if (!str) return;

      var currentState = this.startState;
      var stateStack = [];
      for (var i = 0, len = str.length; i < len;) {
        var tokenSet = this.getTokenSet(str, i);
        var stateSet = this.switchState(currentState, tokenSet.index, stateStack);
        var token = tokenSet.token;

        var prevState = stateSet.prevState;
        var nextState = stateSet.nextState;
        currentState = callback(prevState, token, i) || nextState;
        i += token.length;
      }
    }
  }]);

  return Machine;
})();

exports['default'] = Machine;
module.exports = exports['default'];