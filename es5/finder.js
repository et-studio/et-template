'use strict';

var nodes = {};
nodes._element = require('./nodes/element');
nodes._text = require('./nodes/text');
nodes._comment = require('./nodes/comment');
nodes._base = require('./nodes/basic');
nodes['#if'] = require('./nodes/if');
nodes['#elseif'] = require('./nodes/new');
nodes['#else'] = require('./nodes/new');
nodes['#for'] = require('./nodes/for');

module.exports = {
  findNode: function findNode(nodeType, nodeName) {
    var re;

    if (nodeName) {
      nodeName = nodeName.toLowerCase();
    }

    if (nodeType === 'root') {
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
  },
  create: function create(dom, options, config) {
    var parent = options.parent;
    var previousSibling = options.previousSibling;
    var nextSibling = options.nextSibling;

    var Constructor = this.findNode(dom.nodeType, dom.nodeName);
    var re = new Constructor(dom, options, config);

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
    return re;
  }
};