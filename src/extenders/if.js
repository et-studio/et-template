'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');

module.exports = _.extend({}, _prototype, {
  isNewTemplate: true,
  deliverCreate: function compileCreate() {
    var re = [];
    var id = this.getId();

    re.push(`var ${id} = null;`);
    re.push(`doms.${id} = ${id};`);

    if (this.checkRoot()) {
      re.push(`rootIds.push('${id}');`);
      re.push(`root.${id} = ${id};`);
    }
    return re;
  },
  deliverUpdate: function compileUpdate() {
    var re = [];
    return re;
  },
  hasNextCondition: function hasNextCondition() {

  }
});
