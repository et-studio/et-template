'use strict';

// @tableStart: for
var forTableOptions = {
  states: ['start', 'header', 'headerEnd', 'itemName', 'itemEnd', 'indexName', 'indexEnd', 'exStart', 'expression'],
  symbols: ['[', ' in ', ' ', ',', ';'],
  table: [
    {
      '0': 'start',
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      '-1': 'header'
    },
    {
      '0': '',
      '1': '',
      '2': 'headerEnd',
      '3': '',
      '4': '',
      '-1': 'header'
    },
    {
      '0': '',
      '1': '',
      '2': 'headerEnd',
      '3': '',
      '4': '',
      '-1': 'itemName'
    },
    {
      '0': 'text',
      '1': 'exStart',
      '2': 'itemEnd',
      '3': 'itemEnd',
      '4': 'itemEnd',
      '-1': 'itemName'
    },
    {
      '0': '',
      '1': 'exStart',
      '2': 'itemEnd',
      '3': '',
      '4': '',
      '-1': 'indexName'
    },
    {
      '0': '',
      '1': 'exStart',
      '2': 'indexEnd',
      '3': 'indexEnd',
      '4': 'indexEnd',
      '-1': 'indexName'
    },
    {
      '0': '',
      '1': 'exStart',
      '2': 'indexEnd',
      '3': '',
      '4': '',
      '-1': ''
    },
    {
      '0': '',
      '1': '',
      '2': 'exStart',
      '3': '',
      '4': '',
      '-1': 'expression'
    },
    {
      '0': 'expression',
      '1': 'expression',
      '2': 'expression',
      '3': 'expression',
      '4': 'expression',
      '-1': 'expression'
    }
  ]
};
// @tableEnd

var worker = require('../worker');
var Basic = require('./basic');
var Machine = require('../machine');
var forMachine = new Machine(forTableOptions);

var defaults = {
  itemName: 'item',
  indexName: 'i',
  lengthName: 'len'
}

class ForNode extends Basic {
  parseSource(source) {
    var _this = this;
    var nodeName = '';
    var itemName = '';
    var indexName = '';
    var expression = '';
    var lastToken = '';
    forMachine.each(source, (state, token) => {
      lastToken = token;
      switch (state) {
        case 'start':
        case 'headerEnd':
        case 'itemEnd':
        case 'indexEnd':
        case 'exStart':
          break;
        case 'header':
          nodeName += token;
          break;
        case 'itemName':
          itemName += token;
          break;
        case 'indexName':
          indexName += token;
          break;
        case 'expression':
          expression += token;
          break;
        default:
          _this.throwError(state);
      }
    });
    if (lastToken !== ']') {
      this.throwError();
    }
    nodeName = nodeName.trim().toLowerCase();
    itemName = itemName.trim();
    indexName = indexName.trim();
    expression = expression.substr(0, expression.length - 1).trim();

    if (nodeName !== '#for') {
      this.throwError();
    }
    if (!itemName) {
      this.throwError();
    }
    if (!expression) {
      this.throwError();
    }
    this.nodeName = nodeName;
    this.itemName = itemName;
    this.indexName = indexName;
    this.expression = expression;

    this.saveArgument(itemName, indexName);
  }
  throwError(code) {
    var line = this.getLineNumber();
    throw new Error(`Unrecognized #for at line: ${line}.`);
  }
  get isNewTemplate() {
    return true;
  }
  deliverCreate() {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      lineId: this.getLineId(),
      parentId: this.getParentId()
    }
    var re = [];
    re.push(worker.createFor(it));
    re.push(worker.createLine(it));
    return re;
  }
  deliverUpdate() {
    var it = {
      id: this.getId(),
      parentId: this.getParentId(),
      lineId: this.getLineId(),
      isRoot: this.checkRoot(),
      valueId: this.getRootValueId(),
      args: this.getArguments(),
      expression: this.getExpression(),
      templateName: this.getTemplateName(),
      indexName: this.getIndexName(),
      itemName: this.getItemName(),
      condition: this.condition
    }
    return [worker.updateFor(it)];
  }
  getExpression() {
    return this.expression || this.condition;
  }
  getItemName() {
    return this.itemName || defaults.itemName;
  }
  getLengthName() {
    return this.lengthName || defaults.lengthName;
  }
  getIndexName() {
    return this.indexName || defaults.indexName;
  }
}

module.exports = ForNode;
