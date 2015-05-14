'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');

function Constructor(dom, id, options) {
  this.init(dom, id, options);
}
_.extend(Constructor.prototype, _prototype, {});

module.exports = Constructor;