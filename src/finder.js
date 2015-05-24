'use strict';

var extenders = {};
extenders._element   = require('./extenders/element');
extenders._text  = require('./extenders/text');
extenders._comment   = require('./extenders/comment');
extenders._base   = require('./extenders/prototype');
extenders['#if']     = require('./extenders/if');
extenders['#elseif'] = require('./extenders/elseif');
extenders['#else']   = require('./extenders/else');
extenders['#for']    = require('./extenders/for');

module.exports = {
  findExtender: function findExtender(dom) {
    var extender, nodeName;

    nodeName = dom.nodeName || '';
    nodeName = nodeName.toLowerCase();

    if (!nodeName && !dom.textContent) {
      // this is a root dom.
      extender = extenders._base;
    }if (nodeName === '!--') {
      extender = extenders._comment;
    } else if (dom.textContent) {
      extender = extenders._text;
    } else {
      extender = extenders[nodeName];
    }

    if (!extender) {
      extender = extenders._element;
    }

    return extender;
  }
};
