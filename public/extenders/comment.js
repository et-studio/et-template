'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');

module.exports = _.extend({}, _prototype, {
  deliverCreate: function compileCreate() {
    var re = [];
    var id = this.getId();
    var text = this.textContent;

    re.push('var ' + id + ' = _util.createComment(\'' + text + '\');');
    re.push('doms.' + id + ' = ' + id);

    if (this.checkRoot()) {
      re.push('rootIds.push(\'' + id + '\');');
      re.push('root.' + id + ' = ' + id);
    }
    return re;
  }
});