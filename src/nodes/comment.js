'use strict';

var Basic = require('./basic');
var worker = require('../worker');
var commentParser = require('../parsers/comment');

class Comment extends Basic {
  constructor(source, options = {}) {
    super(source, options);
    this.nodeType = 8;
  }
  parseSource(source) {
    this.text = commentParser.parse(source);
  }
  deliverCreate() {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      parentId: this.getParentId(),
      text: this.getTextContent()
    }
    return [worker.createComment(it)];
  }
}

module.exports = Comment;
