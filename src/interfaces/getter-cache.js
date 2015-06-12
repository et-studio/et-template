'use strict';

var Cache = require('./cache');
var _ = require('../util');
var config = {
  "templateFunctionPrefix": "Template",
  "spilitMark": "_",
  "lineSuffix": "line",
  "idPrefix": "et",
  "valuePrefix": "value"
};

class Getter extends Cache {
  getId() {
    if (this._index >= 0) {
      return `${config.idPrefix}${this._index}`;
    } else {
      return null;
    }
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
    if (this.valueId == null) {
      this.valueId = 0;
    }
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
    return this.textContent || this.content;
  }
  getPosterity() {
    var cacheKey = 'getPosterity';
    var cacheValue = this.getCache(cacheKey);
    if (cacheValue) {
      return cacheValue;
    }

    var doms = [];
    _.each(this.children, (child) => {
      if (child) {
        doms.push(child);
        _.concat(doms, child.getPosterity());
      }
    });

    this.saveCache(cacheKey, doms);
    return doms;
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
