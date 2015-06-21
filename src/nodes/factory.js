'use strict';

var _ = require('../util');

var nodes = {};
nodes._element = require('./element');
nodes._text = require('./text');
nodes._comment = require('./comment');
nodes._base = require('./basic');
nodes['#if'] = require('./if');
nodes['#elseif'] = require('./elseif');
nodes['#else'] = require('./else');
nodes['#for'] = require('./for');

class Factory {
  /**
   * options
   * - index
   * - parent
   * - previous
   * - expressions
   * - lineNumber
   */
  create(source, options = {}) {
    var parent = options.parent;
    var previous = options.previous;

    var Constructor = this.findConstuctor(source);
    var node = new Constructor(source, options);

    if (parent) {
      parent.children.push(node);
    }
    if (previous) {
      previous.next = node;
    }
    return node;
  }
  getNodeName(source) {
    if (!source) {
      return '';
    } else if (source.indexOf('<!--') === 0) {
      return '!--';
    } else if (source.indexOf('<') === 0) {
      var regHtml = /^<(\S*)[ >]/;
      return regHtml.exec(source)[1] || '';
    } else if (source.indexOf('[') === 0) {
      var regET = /^\[(\S*)[ \]]/;
      return regET.exec(source)[1] || '';
    }
    return '';
  }
  findConstuctor(source) {
    var nodeName = this.getNodeName(source).toLowerCase();
    var Constructor = null;

    if (!source) {
      Constructor = nodes._base;
    } else if (!nodeName) {
      Constructor = nodes._text;
    } else if (nodeName === '!--') {
      Constructor = nodes._comment;
    } else if (nodeName.indexOf('#') === 0) {
      Constructor = nodes[nodeName];
    } else {
      Constructor = nodes._element;
    }

    if (!Constructor) {
      Constructor = nodes._base;
    }
    return Constructor;
  }
}

module.exports = new Factory();
