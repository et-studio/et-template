'use strict';

var Basic = require('./basic');
var worker = require('../worker');

class Comment extends Basic {
  deliverCreate() {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      parentId: this.getParentId(),
      text: this.textContent || ''
    }
    return [worker.createComment(it)];
  }
}

module.exports = Comment;
