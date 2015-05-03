'use strict';
var compilers = {};
var baseCompiler = require('./base');
var textCompiler = require('./text');
compilers['#if'] = require('./if');
compilers['#elseif'] = require('./elseif');
compilers['#else'] = require('./else');
compilers['#for'] = require('./for');

module.exports = {
  getCompiler: function getCompiler(source) {
    source = source || {
        origin: '',
        tag: '',
        beginTag: '',
        children: '',
        endTag: '',
        text: ''
      };
    var compiler = null;

    if (!source.tag) {
      compiler = textCompiler;
    } else {
      compiler = compilers[source.tag];
    }
    if (!compiler) {
      compiler = baseCompiler;
    }
    return compiler;
  }
};