'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');
var valueHandler = require('./value');

module.exports = _.extend({}, _prototype, {
  deliverCreate: function compileCreate() {
    var re = [];
    var id = this.getId();
    var text = this.textContent;

    if (valueHandler.checkErraticValue(text)) {
      re.push(`var ${id} = _util.createTextNode('');`);
    } else {
      re.push(`var ${id} = _util.createTextNode('${text}');`);
    }
    re.push(`doms.${id} = ${id};`);

    if (this.checkRoot()) {
      re.push(`rootIds.push('${id}');`);
      re.push(`root.${id} = ${id};`);
    }
    return re;
  },
  deliverUpdate: function deliverUpdate() {
    var re = [];
    var lastRoot = this.getLastRoot();
    var text = this.textContent;
    var id = this.getId();

    if (valueHandler.checkErraticValue(text)) {
      var valueId = lastRoot.getValueId();
      var valueString = valueHandler.compileValue(text);
      re.push(`
        var ${id} = doms.${id};
        var tmpValue = ${valueString};
        if (last.${valueId} !== tmpValue) {
          last.${valueId} = tmpValue;
          _util.text(${id}, tmpValue);
        }
      `);
    }
    return re;
  }
});
