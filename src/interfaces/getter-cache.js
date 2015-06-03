'use strict';

var Cache = require('./cache');
var _ = require('../util');

class Getter extends Cache {
  getId() {
    return this.id;
  }
  getLineId() {
    var config = this.config || {};
    return `${this.id}${config.spilitMark}${config.lineSuffix}`;
  }
  getValueId() {
    var config = this.config || {};
    if (!this.valueId) {
      this.valueId = 0;
    }
    this.valueId++;
    return `${config.valuePrefix}${config.spilitMark}${this.valueId}`;
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
    var doms, children, child, i, len, cacheValue, cacheKey;

    cacheKey = 'getPosterity';
    cacheValue = this.getCache(cacheKey);
    if (cacheValue) {
      return cacheValue;
    }

    doms = [];
    children = this.children || [];
    for(i = 0, len = children.length; i < len; i++) {
      child = children[i];
      if (child) {
        doms.push(child);
        _.concat(doms, child.getPosterity());
      }
    }

    this.saveCache(cacheKey, doms);
    return doms;
  }
  getLastRoot() {
    var current = this.parent;
    while (current) {
      if (current.isNewTemplate) {
        return current;
      }
      if (!current.parent) {
        return current;
      }
      current = current.parent;
    }
    return null;
  }
}

module.exports = Getter;
