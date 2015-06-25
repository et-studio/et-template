'use strict';

var Basic = require('./basic');
var worker = require('../worker');
var conditionParser = require('../parsers/condition');

class ElseIfNode extends Basic {
  constructor(source, options) {
    super(source, options);
    this.isNewTemplate = true;
  }
  parse(source) {
    var tmp = conditionParser.parse(source, {
      expectNodeName: '#elseif'
    });
    this.nodeName = tmp.nodeName;
    this.condition = tmp.condition;
  }
  deliverCreate() {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot()
    };
    return [worker.createNull(it)];
  }
}
module.exports = ElseIfNode;
