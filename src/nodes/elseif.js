'use strict';

var NewNode = require('./new');
var worker = require('../worker');
var conditionParser = require('../parsers/condition');

class IfNode extends NewNode {
  parseSource(source) {
    var tmp = conditionParser.parse(source, {
      expectNodeName: '#elseif'
    });
    this.nodeName = tmp.nodeName;
    this.condition = tmp.condition;
  }
}
module.exports = IfNode;
