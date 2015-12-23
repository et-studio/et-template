'use strict'

import NodeElement from './element'
import NodeText from './text'
import NodeBasic from './basic'
import NodeIf from './if'
import NodeElseif from './elseif'
import NodeElse from './else'
import NodeFor from './for'
import NodeHtml from './html'
import NodeChild from './child'
import NodeImport from './import'

var nodes = {
  '_element': NodeElement,
  '_text': NodeText,
  '_base': NodeBasic,
  '#if': NodeIf,
  '#elseif': NodeElseif,
  '#else': NodeElse,
  '#for': NodeFor,
  '#html': NodeHtml,
  '#child': NodeChild,
  '#import': NodeImport
}

class Factory {
  create (originNode = {}, options) {
    var Constructor = this.findConstuctor(originNode.nodeType, originNode.nodeName)
    var node = new Constructor(originNode, options)
    return node
  }
  findConstuctor (nodeType, nodeName) {
    switch (nodeType) {
      case 1:
        return nodes._element
      case 3:
        return nodes._text
      default:
        return nodes[nodeName] || nodes._base
    }
  }
}

export default new Factory()
