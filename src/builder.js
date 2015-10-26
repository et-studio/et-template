'use strict'

import _ from './util'

class Builder {
  rebuild (node) {
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
}

export default new Builder()
