'use strict';

var _ = require('../util');
var worker = require('../worker');
var NewNode = require('./new');
var Machine = require('../machine');

// @tableStart: condition
var conditionTableOptions = {
  states: ['start', 'name', 'condition'],
  symbols: ['[', ' '],
  table: [
    {
      '0': 'start',
      '1': '',
      '-1': 'name'
    },
    {
      '0': '',
      '1': 'condition',
      '-1': 'name'
    },
    {
      '0': 'condition',
      '1': 'condition',
      '-1': 'condition'
    }
  ]
};
// @tableEnd

var conditionMachine = new Machine(conditionTableOptions);

class IfNode extends NewNode {
  parseSource(source) {
    var self = this;

    var nodeName = '';
    var condition = '';
    var lastToken = '';
    conditionMachine.each(source, (state, token) => {
      lastToken = token;
      switch (state) {
        case 'start':
          break;
        case 'name':
          nodeName += token;
          break;
        case 'condition':
          condition += token;
          break;
        default:
          self.throwError();
      }
    });
    if (lastToken !== ']') {
      self.throwError();
    }
    if (nodeName.toLowerCase() !== '#elseif') {
      self.throwError();
    }
    condition = condition.substr(0, condition.length - 1);
    condition = condition.trim();
    if (!condition) {
      self.throwError();
    }

    this.nodeName = nodeName.toLowerCase();
    this.condition = condition;
  }
  throwError(code) {
    var line = this.getLineNumber();
    throw new Error(`Unrecognized #elseif at line: ${line}.`);
  }
}
module.exports = IfNode;
