'use strict';

/**
 * Dom 的结构
 *  - nodeName        {String}
 *  - children        {Array[Dom]}
 *  - expressions     {Array[Expression]} 在属性上面的表达式数组
 *  - parent          {Dom}
 *  - previous        {Dom}
 *  - next            {Dom}
 *  - attributes      {Map<String, String>}
 *  - textContent     {String}
 *  - nodeType        {number} root: root dom, 1: element, 3:textNode, 8:commentNode
 *
 * Expression
 *  - condition       {String} 属性显示条件
 *  - attributes      {Map<String, String>}
 *
 * #if 节点
 *  - condition       {String} 判断条件
 *
 * #elseif
 *  - condition
 *
 * #for 节点
 *  - expression
 *  - itemName
 *  - indexName
 */

var NodeInterface = require('../interfaces/getter');
var _ = require('../util');

class Basic extends NodeInterface {
  constructor(dom, options = {}) {
    super(dom, options);

    _.extend(this, dom);
    this._index = options.index;
    this.options = options;
    this.parent = options.parent;
    this.previous = options.previous;
    this.next = options.next;
    this.children = options.children || [];
  }
  getNewTemplateDoms() {
    var re = [this];
    _.each(this.getPosterity(), (dom) => {
      if (dom && dom.isNewTemplate) {
        re.push(dom);
      }
    });
    return re;
  }
  getCreateList() {
    var re = [];
    _.each(this.children, (child) => {
      _.concat(re, child.deliverCreate());
      if (!child.isNewTemplate) {
        _.concat(re, child.getCreateList());
      }
    });
    return _.clearArraySpace(re);
  }
  getUpdateList() {
    var re = [];
    _.each(this.children, (child) => {
      _.concat(re, child.deliverUpdate());
      if (!child.isNewTemplate) {
        _.concat(re, child.getUpdateList());
      }
    });
    return _.clearArraySpace(re);
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

  getPosterity() {
    var doms = [];
    _.each(this.children, (child) => {
      if (child) {
        doms.push(child);
        _.concat(doms, child.getPosterity());
      }
    });
    return doms;
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
