'use strict';

/**
 * Dom 的结构
 *  - nodeName        {String}
 *  - children        {Array[Dom]}
 *  - expressions     {Array[Expression]} 在属性上面的表达式数组
 *  - parent          {Dom}
 *  - previousSibling {Dom}
 *  - nextSibling     {Dom}
 *  - attributes      {Map<String, String>}
 *  - textContent     {String}
 *  - nodeType        {number} root: root dom, 1: element, 3:textNode, 8:commentNode
 *
 * Expression
 *  - condition       {String} 触发条件，如果没有条件就认为一直有
 *  - attributes      {Map<String, String>}
 *
 * #if 节点
 *  - condition       {String} 判断条件
 *
 * #elseif
 *  - condition
 *
 * #for 节点
 *  - condition
 *  - itemName
 *  - indexName
 */

var NodeInterface = require('../interfaces/getter-cache');
var _ = require('../util');

var CONFIG = {
  'templateFunctionPrefix': 'Template',
  'spilitMark': '_',
  'lineSuffix': 'line',
  'idPrefix': 'et',
  'valuePrefix': 'value'
};

class Basic extends NodeInterface {
  constructor(dom, options) {
    super(dom, options);

    _.extend(this, dom);
    this.config = CONFIG;
    this.options = options;
    this.parent = options.parent;
    this.previousSibling = options.previousSibling;
    this.nextSibling = options.nextSibling;
    if (options.children) {
      this.children = options.children;
    } else {
      this.children = [];
    }

    var config = this.config;
    this.id = `${config.idPrefix}${options.index}`;
    this.templateName = `${config.templateFunctionPrefix}${config.spilitMark}${this.id}`;

  }
  getNewTemplateDoms() {
    var re, cacheKey, cacheValue;

    cacheKey = 'getNewTemplateDoms';
    cacheValue = this.getCache(cacheKey);
    if (cacheValue) {
      re = cacheValue;
    } else {
      re = [this];
      _.each(this.getPosterity(), null, (dom) => {
        if (dom && dom.isNewTemplate) {
          re.push(dom);
        }
      });
      this.saveCache(cacheKey, re);
    }
    return re;
  }
  getCreateString() {
    return this.getCreateDeliverys().join('\n');
  }
  getUpdateString() {
    return this.getUpdateDeliverys().join('\n');
  }
  getArguments() {
    var re = ['it'];

    var lastRoot = this.getLastRoot();
    if (lastRoot) {
      _.concat(re, lastRoot.getArguments());
    }
    if (this.args) {
      _.concat(re, this.args);
    }
    return _.uniq(re);
  }

  getCreateDeliverys() {
    var re = [];
    _.each(this.children, null, (child) => {
      _.concat(re, child.deliverCreate());
      if (!child.isNewTemplate) {
        _.concat(re, child.getCreateDeliverys());
      }
    });
    return re;
  }
  getUpdateDeliverys() {
    var re = [];
    _.each(this.children, null, (child) => {
      _.concat(re, child.deliverUpdate());
      if (!child.isNewTemplate) {
        _.concat(re, child.getUpdateDeliverys());
      }
    });
    return re;
  }
  checkRoot() {
    var parent = this.parent;
    // 当不存在nodeType的时候也认为是root
    if (!parent || !parent.nodeType || parent.nodeType === 'root' || parent.isNewTemplate) {
      return true;
    } else {
      return false;
    }
  }
  saveArgument(arg) {
    if (!this.args) {
      this.args = [];
    }
    this.args.push(arg);
    return this;
  }

  // attributes or functions could be override
  get isNewTemplate(){
    return false;
  }
  init() {
    return this;
  }
  deliverCreate() {
    return [];
  }
  deliverUpdate() {
    return [];
  }
}

module.exports = Basic;
