'use strict';

var Basic = require('./basic');

class NewNode extends Basic {
  get isNewTemplate () {
    return true;
  }
  deliverCreate () {
    var re = [''];
    var id = this.getId();
    var lineId = this.getLineId();
    var parentId = this.getParentId();

    re.push(`var ${id} = null;`);
    re.push(`doms.${id} = ${id};`);
    if (this.checkRoot()) {
      re.push(`rootIds.push('${id}');`);
      re.push(`roots.${id} = ${id};`);
    }

    re.push('');
    re.push(`var ${lineId} = _util.createLine();`);
    re.push(`doms.${lineId} = ${lineId};`);
    if (this.checkRoot()) {
      re.push(`rootIds.push('${lineId}');`);
      re.push(`roots.${lineId} = ${lineId};`);
    } else {
      re.push(`_util.appendChild(${parentId}, ${lineId});`);
    }
    return re;
  }
}
module.exports = NewNode;
