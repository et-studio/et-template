'use strict'

import _ from './util'
import originParser from './parsers/origin'
import dotParser from './parsers/dot'
import factory from './nodes/factory'

class Parser {
  constructor (options) {
    this.options = options
  }
  parse (str) {
    var originNode = originParser.parse(str)
    return this.createDom(originNode)
  }
  parseDot (str) {
    str = dotParser.parse(str)
    return this.parse(str)
  }
  createDom (originNode) {
    var options = this.options
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
    }

    var root = createNode()
    createChildren(root, originNode)
    root.initAll()
    return root
  }
}

export default Parser
