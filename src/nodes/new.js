'use strict';

var Basic = require('./basic');
var worker = require('../worker');

class NewNode extends Basic {
  get isNewTemplate () {
    return true;
  }
  deliverCreate () {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      lineId: this.getLineId(),
      parentId: this.getParentId()
    }
    var re = [];
    re.push(worker.createNull(it));
    re.push(worker.createLine(it))
    return re;
  }
}
module.exports = NewNode;
