'use strict';

var Basic = require('./basic');

class Comment extends Basic {
  deliverCreate() {
    var re = [''];
    var id = this.getId();
    var text = this.textContent;
    var parentId = this.getParentId();

    re.push(`var ${id} = _util.createComment('${text}');`);
    re.push(`doms.${id} = ${id}`);

    if (this.checkRoot()) {
      re.push(`rootIds.push('${id}');`);
      re.push(`roots.${id} = ${id}`);
    } else {
      re.push(`_util.appendChild(${parentId}, ${id});`);
    }
    return re;
  }
}

module.exports = Comment;
