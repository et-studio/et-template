'use strict';

var _ = require('./util');

var nodes = {};
nodes._element   = require('./nodes/element');
nodes._text  = require('./nodes/text');
nodes._comment   = require('./nodes/comment');
nodes._base   = require('./nodes/basic');
nodes['#if']     = require('./nodes/if');
nodes['#elseif'] = require('./nodes/new');
nodes['#else']   = require('./nodes/new');
nodes['#for']    = require('./nodes/for');

class Factory {
  constructor() {
    this.index = 0;
  }
  getIndex() {
    return this.index++;
  }
  findNode(nodeType, nodeName) {
    var re;

    if (nodeName) {
      nodeName = nodeName.toLowerCase();
    }

    if (!nodeType || nodeType === 'root') {
      re = nodes._base;
    } else if (nodeType === 3) {
      re = nodes._text;
    } else if (nodeType === 8) {
      re = nodes._comment;
    } else {
      re = nodes[nodeName];
    }

    if (!re) {
      re = nodes._element;
    }

    return re;
  }
  create(dom, options = {}) {
    var parent = options.parent;
    var previousSibling = options.previousSibling;
    var nextSibling = options.nextSibling;

    var Constructor = this.findNode(dom.nodeType, dom.nodeName);
    var re = new Constructor(dom, _.extend({}, options, {index: this.getIndex()}));

    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(re);
    }
    if (previousSibling) {
      previousSibling.nextSibling = re;
    }
    if (nextSibling) {
      nextSibling.previousSibling = re;
    }
    this.createChildren(re, dom.children);
    return re;
  }
  createChildren(parent, children) {
    var current, previousSibling;
    _.each(children, this, (child) => {
      current = this.create(child, {
        parent: parent,
        previousSibling: previousSibling
      });
      previousSibling = current;
    });
  }
}

module.exports = Factory;
