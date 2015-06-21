'use strict';

var Basic = require('./basic');
var Machine = require('../machine');
var worker = require('../worker');

// @tableStart: comment
var commentTableOptions = {
  states: ['start', 'header', 'text', 'end'],
  symbols: ['<!--', '-->'],
  table: [
    {
      '0': 'header',
      '1': '',
      '-1': ''
    },
    {
      '0': '',
      '1': '',
      '-1': 'text'
    },
    {
      '0': 'text',
      '1': 'end',
      '-1': 'text'
    },
    {
      '0': '',
      '1': '',
      '-1': ''
    }
  ]
};
// @tableEnd

var machine = new Machine(commentTableOptions);

class Comment extends Basic {
  constructor(source, options = {}) {
    super(source, options);
    this.nodeType = 8;
  }
  parseSource(source) {
    var line = this.getLineNumber();
    var text = '';
    machine.each(source, (state, token) => {
      switch (state) {
        case 'header':
        case 'end':
          break;
        case 'text':
          text += token;
          break;
        default:
          throw new Error(`Unrecognized comment format at line: ${line}.`);
      }
    });
    this.textContent = text;
  }
  deliverCreate() {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      parentId: this.getParentId(),
      text: this.getTextContent()
    }
    return [worker.createComment(it)];
  }
}

module.exports = Comment;
