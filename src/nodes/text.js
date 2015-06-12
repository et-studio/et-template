'use strict';

var valueHandler = require('./value');
var Basic = require('./basic');
var worker = require('../worker');

class TextNode extends Basic {
  deliverCreate() {
    var text = this.getTextContent();
    if (valueHandler.isErraticValue(text)) {
      text = '';
    }
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      lineId: this.getLineId(),
      parentId: this.getParentId(),
      text: text
    }
    return [worker.createText(it)];
  }
  deliverUpdate() {
    var text = this.getTextContent();
    if (valueHandler.isErraticValue(text)) {
      var it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        lineId: this.getLineId(),
        parentId: this.getParentId(),
        valueId: this.getRootValueId(),
        valueString: valueHandler.compileValue(text)
      }
      return [worker.updateText(it)];
    } else {
      return [];
    }
  }
}

module.exports = TextNode;
