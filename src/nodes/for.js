'use strict';

var NewNode = require('./new');

class ForNode extends NewNode {
  constructor(dom, options) {
    super(dom, options);

    if (!this.itemName) {
      throw new Error('there must have itemName in #for.');
    }
    this.saveArgument(dom.itemName);

    if (this.indexName) {
      this.saveArgument(this.indexName);
    } else {
      this.indexName = 'i';
    }

    if (this.lengthName) {
      this.saveArgument(this.lengthName);
    } else {
      this.lengthName = 'len';
    }
  }
  deliverUpdate() {
    var re = [];
    var lastRoot = this.getLastRoot();
    var itemName = this.itemName;
    var indexName = this.indexName;
    var lengthName = this.lengthName;
    var condition = this.condition;

    var args = this.getArguments();
    var id = this.getId();
    var lineId = this.getLineId();
    var valueId = lastRoot.getValueId();
    
    re.push(`
      var $line = doms.${lineId};
      var lastLength = last.${valueId};
      var list = ${condition};
      var ${indexName} = 0;
      var ${lengthName} = list.length;
      var item, et;
      for (; ${indexName} < ${lengthName}; ${indexName}++) {
        ${itemName} = list[${indexName}];
        et = doms['${id}_' + ${indexName}];
        if (!et) {
          doms['${id}_' + ${indexName}] = et = new ${this.templateName}();
        }
        if (!lastLength || lastLength < ${indexName}) {
          _util.before($line, et.get());
        }
        et.update(${args.join(',')});
      }
      last.${valueId} = ${indexName};
      for (; ${indexName} < lastLength; ${indexName}++) {
        et = doms['${id}_' + ${indexName}];
        et.remove();
      }
    `);
    return re;
  }
}

module.exports = ForNode;
