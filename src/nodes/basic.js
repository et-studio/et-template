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

var NodeInterface = require('./getter');
var _ = require('../util');

class Basic extends NodeInterface {
  constructor(source, options = {}) {
    super(source, options);

    this._source = source;
    this._lineNumber = options.lineNumber;
    this._index = options.index;
    this.isNewTemplate = false;
    this.args = [];
    this.nodeType = 'ET';
    this.parent = options.parent;
    this.previous = options.previous;
    this.next = null;
    this.isRoot = !this.parent;
    this.children = [];
    this.parse(source);
  }
  getNewTemplateDoms() {
    var re = [];
    this.each((dom) => {
      if (dom.isRoot || dom.isNewTemplate) {
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
    re = _.uniq(re);
    return _.clearArraySpace(re);
  }

  checkRoot() {
    var parent = this.parent;
    // 当不存在nodeType的时候也认为是root
    if (!parent || parent.isRoot || parent.isNewTemplate) {
      return true;
    } else {
      return false;
    }
  }
  isErraticValue(str) {
    if (!str) {
      return false;
    }
    var start = str.indexOf('{{');
    var end = str.lastIndexOf('}}');
    return 0 <= start && start < end;
  }
  saveArgument(...list) {
    _.concat(this.args, list);
    return this;
  }
  after(node) {
    if (this.isRoot) {
      return;
    }

    var nodePrev = node.previous;
    var nodeNext = node.next;
    if (nodePrev) {
      nodePrev.next = nodeNext;
    }
    if (nodeNext) {
      nodeNext.previous = nodePrev;
    }

    node.parent = this.parent;
    node.previous = this;
    node.next = this.next;

    var currentNext = this.next;
    if (currentNext) {
      currentNext.previous = node;
    }
    this.next = node;

    var newChidren = [];
    var _this = this;
    _.each(this.parent.children, (child) => {
      newChidren.push(child);
      if (child.getId() === _this.getId()) {
        newChidren.push(node);
      }
    });
    this.parent.children = newChidren;
  }
  appendChild(node) {
    var children = this.children;

    if (children.length > 0) {
      var last = children[children.length - 1];
      last.next = node;
      node.previous = last;
    }

    children.push(node);
    node.next = null;
    node.parent = this;
  }
  each(callback) {
    if (typeof callback === 'function') {
      callback(this);
      if (this.children.length) {
        this.children[0].each(callback);
      }
      if (this.next) {
        this.next.each(callback);
      }
    }
  }
  initAll() {
    this.each((dom) => {
      dom.init();
    });
  }

  // attributes or functions could be override
  parse(source) {
    // be called in constructor
  }
  init() {
    // should be called after the whole Tree created
  }
  deliverCreate() {
    return [];
  }
  deliverUpdate() {
    return [];
  }
}

module.exports = Basic;
