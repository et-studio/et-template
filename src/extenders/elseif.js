'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');

module.exports = _.extend({}, _prototype, {
  isNewTemplate: true,
  deliverCreate: function compileCreate() {
    var re = [];
    var id = this.getId();
    var lineId = this.getLineId();

    re.push(`var ${id} = null;`);
    re.push(`var ${lineId} = _util.createLine();`);
    re.push(`doms.${id} = ${id};`);
    re.push(`dom.${lineId} = ${lineId};`);

    if (this.checkRoot()) {
      re.push(`rootIds.push('${id}');`);
      re.push(`root.${id} = ${id};`);
      re.push(`rootIds.push('${lineId}');`);
      re.push(`root.${lineId} = ${lineId};`);
    }
    return re;
  }
});
