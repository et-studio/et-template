'use strict';

var _ = require('../util');
var Machine = require('../machine');

// @tableMark: value
var valueTableOptions = {
  states: ['string', 'start', 'expression', 'end'],
  symbols: ['{{', '}}'],
  table: [
    {
      '0': 'start',
      '1': 'string',
      '-1': 'string'
    },
    {
      '0': 'expression',
      '1': 'end',
      '-1': 'expression'
    },
    {
      '0': 'expression',
      '1': 'end',
      '-1': 'expression'
    },
    {
      '0': 'string',
      '1': 'string',
      '-1': 'string'
    }
  ]
};
// @tableEnd

var valueMachine = new Machine(valueTableOptions);

class ValueHandler {
  isErraticValue(str) {
    if (!str) {
      return false;
    }
    var start = str.indexOf('{{');
    var end = str.lastIndexOf('}}');
    return start >= 0 && end > start;
  }
  pushStr(list, str, isExpression) {
    if (str && isExpression) {
      list.push(str);
    } else if (str) {
      list.push(`'${str}'`);
    }
  }
  compileValue(str) {
    // 'xxx{{it.getSrc()}}bbb{{it.src2}}'
    // ('xxx' + it.getSrc() + 'bbb' + it.src2)
    var list = [];
    var tmp = '';

    valueMachine.each(str, (state, token) => {
      switch (state) {
        case 'string':
        case 'expression':
          tmp += token;
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
    });
    this.pushStr(list, tmp);
    return `(${list.join(' + ')})`;
  }
}

module.exports = new ValueHandler();
