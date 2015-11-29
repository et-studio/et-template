'use strict'

import Basic from './basic-middleware'
import _ from '../util'

class MiddlewareRebuilder extends Basic {
  run (node, options) {
    // the constuctor changed every time, the each loop is different
    // so every time changed, the loop should be restarted
    while (this.rebuildAll(node)) { }
    return node
  }
  rebuildAll (node) {
    var isChangeConstructor = false
    node.each((currentNode) => {
      switch (currentNode.nodeName) {
        case '#if':
          isChangeConstructor = this.rebuildIfNode(currentNode)
          if (isChangeConstructor) return false // break each loop
          break
        case '#html':
          isChangeConstructor = this.rebuildHtmlNode(currentNode)
          if (isChangeConstructor) return false // break each loop
          break
      }
    })
    return isChangeConstructor
  }
  rebuildIfNode (node) {
    var isChangeConstructor = false

    var children = node.children
    node.children = []
    var currentNode = node
    _.each(children, (child) => {
      if (child.nodeName === '#elseif' || child.nodeName === '#else') {
        currentNode.after(child)
        currentNode = child
        isChangeConstructor = true
      } else {
        currentNode.append(child)
      }
    })
    return isChangeConstructor
  }
  rebuildHtmlNode (node) {
    // not changed
    if (!node.children.length) return false

    // changed
    node.textContent = node.getInnerHTML()
    node.children = []
    return true
  }
}
export default new MiddlewareRebuilder()
