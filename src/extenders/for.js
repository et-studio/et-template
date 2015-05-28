'use strict';
var _ = require('underscore');
var _prototype = require('./prototype');

module.exports = _.extend({}, _prototype, {
  isNewTemplate: true,
  init: function init(){
    if (!this.itemName) {
      throw new Error('there must have itemName in #for.');
    }
    this.saveArgument(this.itemName);

    if (this.indexName) {
      this.saveArgument(this.indexName);
    }
    if (this.lengthName) {
      this.saveArgument(this.lengthName);
    }
  },
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
  },
  deliverUpdate: function compileUpdate() {
    var re = [];
    var itemName = this.getItemName();
    var indexName = this.getIndexName();
    var lengthName = this.getLengthName();
    var lastRoot = this.getLastRoot();

    var args = this.getArguments();
    var id = this.getId();
    var valueId = lastRoot.getValueId();
    var lineId = this.getLineId();

    re.push(`
      var $line = doms.${lineId};
      var lastIndex = last.${valueId};
      var tmp, ${indexName}, ${itemName}, ${lengthName}, list = ${this.condition};
      for (${indexName} = 0, ${lengthName} = list.length; ${indexName} < ${lengthName}; ${indexName}++) {
        ${itemName} = list[${indexName}];
        tmp = doms['${id}_' + ${indexName}];
        if (!tmp) {
          doms['${id}_' + ${indexName}] = tmp = new ${this.templateName}();
        }
        if (!lastIndex && lastIndex < ${indexName}) {
          _util.before($line, tmp.get());
        }
        tmp.update(${args.join(',')});
      }
      last.${valueId} = ${indexName};
      for (; ${indexName} < lastIndex; ${indexName}++) {
        tmp = doms['${id}_' + ${indexName}];
        tmp.remove();
      }
    `);
    return re;
  },
  getItemName: function getItemName() {
    return this.itemName;
  },
  getIndexName: function getIndexName() {
    return this.indexName || 'i';
  },
  getLengthName: function getLengthName() {
    return this.lengthName || 'len';
  }
});
