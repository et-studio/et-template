'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');

function Constructor(dom, id, options) {
  this.init(dom, id, options);
}
_.extend(Constructor.prototype, _prototype, {
  isNewTemplate: true,

  compileCreate: function compileCreate() {
    var re = [];
    return re;
  },

  compileUpdate: function compileUpdate() {
    var re = [];
    return re;
  }
});

module.exports = Constructor;