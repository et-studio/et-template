'use strict';

// @tableStart: value
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

var Machine = require('./machine');
var _ = require('../util');

var valueMachine = new Machine(valueTableOptions);

class ValueParser {
  parse(str) {
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
  pushStr(list, str, isExpression) {
    if (str && isExpression) {
      list.push(str);
    } else if (str) {
      list.push(`'${str}'`);
    }
  }
}

module.exports = new ValueParser();
