'use strict';

var Basic = require('./basic');
var worker = require('../worker');

var defaults = {
  itemName: 'item',
  indexName: 'i',
  lengthName: 'len'
}

class ForNode extends Basic {
  constructor(dom, options) {
    super(dom, options);

    if (!this.expression && !this.condition) {
      throw new Error('there must have list expression in #for.');
    }

    for (var key in defaults) {
      if (dom[key]) {
        this.saveArgument(dom[key]);
      }
    }
  }
  get isNewTemplate () {
    return true;
  }
  deliverCreate () {
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
