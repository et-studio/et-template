'use strict';

module.exports = {
  getNewTemplateDoms: function getNewTemplateDoms() {
    var re, doms, i, len, dom, cacheKey, cacheValue;

    cacheKey = 'getNewTemplateDoms';
    cacheValue = this.getCache(cacheKey);
    if (cacheValue) {
      return cacheValue;
    }

    re = [this];
    doms = this.getPosterity();

    for (i = 0, len = doms.length; i < len; i++) {
      dom = doms[i];
      if (dom.isNewTemplate) {
        re.push(dom);
      }
    }

    this.saveCache(cacheKey, re);
    return re;
  },
  getCreateString: function getCreateString() {
    return this.getCreateDeliverys().join('\n');
  },
  getUpdateString: function getUpdateString() {
    return this.getUpdateDeliverys().join('\n');
  },
  getArguments: function getArguments() {
    var re = ['it'];
    var lastRoot = this.getLastRoot();
    if (lastRoot === this) {
      if (this.args) {
        re = re.concat(lastRoot.args);
      }
    } else {
      re = re.concat(lastRoot.getArguments());
    }
    return re;
  },

  getCreateDeliverys: function getCreateDeliverys() {
    var re, children, child, i, len;

    re = [];
    children = this.children || [];
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      re = re.concat(child.deliverCreate());
    }

    return re;
  },
  getUpdateDeliverys: function getUpdateDeliverys() {
    var re, children, child, i, len;

    re = [];
    children = this.children || [];
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      re = re.concat(child.deliverUpdate());
    }

    return re;
  },

  checkRoot: function checkRoot() {
    var current = this.parent;
    while (current && !current.isNewTemplate) {
      if (current.nodeName.indexOf('#') !== 0) {
        return false;
      }
      current = current.parent;
    }
    return true;
  },
  getPosterity: function getPosterity() {
    var doms, children, child, i, len, cacheValue, cacheKey;

    cacheKey = 'getPosterity';
    cacheValue = this.getCache(cacheKey);
    if (cacheValue) {
      return cacheValue;
    }

    doms = [];
    children = this.children || [];
    for (i = 0, len = children.length; i < len; i++) {
      child = children[i];
      if (child) {
        doms.push(child);
        doms = doms.concat(child.getPosterity());
      }
    }

    this.saveCache(cacheKey, doms);
    return doms;
  },
  getLastRoot: function getLastRoot() {
    var current = this;
    while (current.parent) {
      if (current.parent.isNewTemplate) {
        return current.parent;
      }
      current = current.parent;
    }
    return current;
  },
  saveArgument: function saveArguments(arg) {
    if (!this.args) {
      this.args = [];
    }
    this.args.push(arg);
    return this;
  },

  saveCache: function saveCache(key, value) {
    if (!this.cache) {
      this.cache = {};
    }
    this.cache[key] = value;
    return this;
  },
  getCache: function getCache(key) {
    if (this.cache) {
      return this.cache[key];
    }
    return null;
  },

  // attributes or functions could be override
  isNewTemplate: false,
  init: function init() {},
  deliverCreate: function compileCreate() {
    return this.getCreateDeliverys();
  },
  deliverUpdate: function compileUpdate() {
    return this.getUpdateDeliverys();
  }
};