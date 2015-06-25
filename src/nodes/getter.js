'use strict';

var _ = require('../util');
var config = {
  "templateFunctionPrefix": "Template",
  "spilitMark": "_",
  "lineSuffix": "line",
  "idPrefix": "et",
  "valuePrefix": "value"
};

class Getter {
  constructor() {
    this.valueId = 0;
  }
  getId() {
    if (this._index >= 0) {
      return `${config.idPrefix}${this._index}`;
    } else {
      return null;
    }
  }
  getLineNumber() {
    return this._lineNumber;
  }
  getTemplateName() {
    var id = this.getId();
    return `${config.templateFunctionPrefix}${config.spilitMark}${id}`;
  }
  getLineId() {
    var id = this.getId();
    return `${id}${config.spilitMark}${config.lineSuffix}`;
  }
  getValueId() {
    var valueId = this.valueId++;
    return `${config.valuePrefix}${config.spilitMark}${valueId}`;
  }
  getParentId() {
    return this.parent && this.parent.getId();
  }
  getNodeName() {
    return this.nodeName && this.nodeName.toUpperCase();
  }
  getTextContent() {
    return this.textContent || this.content || '';
  }
  getRootValueId() {
    var lastRoot = this.getLastRoot();
    if (lastRoot) {
      return lastRoot.getValueId();
    } else {
      return null;
    }
  }
  getLastRoot() {
    var parent = this.parent;
    while (parent) {
      if (parent.isNewTemplate || !parent.parent) {
        return parent;
      }
      parent = parent.parent;
    }
    return null;
  }
}

module.exports = Getter;