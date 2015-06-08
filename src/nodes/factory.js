'use strict';

var _ = require('../util');

var nodes = {};
nodes._element   = require('./element');
nodes._text  = require('./text');
nodes._comment   = require('./comment');
nodes._base   = require('./basic');
nodes['#if']     = require('./if');
nodes['#elseif'] = require('./new');
nodes['#else']   = require('./new');
nodes['#for']    = require('./for');

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
    var previous = options.previous;
    var next = options.next;

    var Constructor = this.findNode(dom.nodeType, dom.nodeName);
    var re = new Constructor(dom, _.extend({}, options, {index: this.getIndex()}));

    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(re);
    }
    if (previous) {
      previous.next = re;
    }
    if (next) {
      next.previous = re;
    }
    this.createChildren(re, dom.children);
    return re;
  }
  createChildren(parent, children) {
    var current, previous;
    _.each(children, this, (child) => {
      current = this.create(child, {
        parent: parent,
        previous: previous
      });
      previous = current;
    });
  }
}

module.exports = Factory;
