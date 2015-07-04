'use strict'

import Basic from './basic'
import worker from '../worker'
import commentParser from '../parsers/comment'

class Comment extends Basic {
  constructor (source, options = {}) {
    super(source, options)
    this.nodeType = 8
  }
  parse (source) {
    this.text = commentParser.parse(source)
  }
  deliverCreate () {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      parentId: this.getParentId(),
      text: this.getTextContent()
    }
    return [worker.createComment(it)]
  }
}

export default Comment
