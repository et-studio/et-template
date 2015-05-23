'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');

module.exports = _.extend({}, _prototype, {
  isNewTemplate: false,
  deliverCreate: function compileCreate() {
    var re = [];
    return re;
  },
  deliverUpdate: function compileUpdate() {
    var re = [];
    return re;
  }
});
