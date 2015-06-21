'use strict';

var _ = require('../util');
var worker = require('../worker');
var NewNode = require('./new');

class ElseNode extends NewNode {
  constructor(source, options) {
    super(source, options);
    this.nodeName = '#else';
  }
}
module.exports = ElseNode;
