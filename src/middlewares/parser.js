'use strict'

import Basic from './basic-middleware'
import _ from '../util'
import originParser from '../parsers/origin'
import factory from '../nodes/factory'

class MiddlewareParser extends Basic {
  run (str, options) {
    var originNode = originParser.parse(str)
    var node = this.createDom(originNode, options)
    return node
  }
  createDom (originNode, options) {
    var index = 0
    var createNode = (source, expressions) => {
      var node = factory.create(source, options, expressions)
      node.setIndex(index++)
      return node
    }
    var createChildren = (parent, origin) => {
      var children = origin.children || []
      _.each(children, (child) => {
        var node = createNode(child.source, child.expressions)
        createChildren(node, child)
        parent.append(node)
      })
      return parent
    }

    var root = createNode()
    return createChildren(root, originNode)
  }
}
export default new MiddlewareParser()
