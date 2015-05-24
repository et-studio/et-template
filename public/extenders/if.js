'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');

module.exports = _.extend({}, _prototype, {
  isNewTemplate: true,
  deliverCreate: function compileCreate() {
    var re = [];
    return re;
  },
  deliverUpdate: function compileUpdate() {
    var re = [];
    return re;
  }
});