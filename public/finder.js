'use strict';

var extenders = {};
extenders._element = require('./extenders/element');
extenders._text = require('./extenders/text');
extenders._comment = require('./extenders/comment');
extenders['#if'] = require('./extenders/if');
extenders['#elseif'] = require('./extenders/elseif');
extenders['#else'] = require('./extenders/else');
extenders['#for'] = require('./extenders/for');

module.exports = {
  findExtender: function findExtender(dom, id, options) {
    var Constructor, nodeName;

    nodeName = dom.nodeName || '';
    nodeName = nodeName.toLowerCase();

    if (nodeName === '--') {
      Constructor = extenders._comment;
    } else if (dom.textContent) {
      Constructor = extenders._text;
    } else {
      Constructor = extenders[nodeName];
    }

    if (!Constructor) {
      Constructor = extenders._element;
    }

    return new Constructor(dom, id, options);
  }
};