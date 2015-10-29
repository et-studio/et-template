'use strict'

import Basic from './basic-middleware'
import _ from '../util'
import factory from '../nodes/factory'

class MiddlewareParser extends Basic {
  run (origin, options) {
    return this.createNode(origin, options)
  }
  createNode (originNode, options) {
    var index = 0
    var createNode = (originNode) => {
      var node = factory.create(originNode, options)
      node.setIndex(index++)
      return node
    }
    var createChildren = (parent, origin) => {
      var children = origin.children || []
      _.each(children, (originNode) => {
        var node = createNode(originNode)
        createChildren(node, originNode)
        parent.append(node)
      })
      return parent
    }

    var root = createNode()
    return createChildren(root, originNode)
  }
}
export default new MiddlewareParser()
