'use strict'

import _ from './util'
import originParser from './parsers/origin'
import dotParser from './parsers/dot'
import factory from './nodes/factory'

class Parser {
  parse (str, options) {
    var originNode = originParser.parse(str)
    return this.createDom(originNode, options)
  }
  parseDot (str, options) {
    str = dotParser.parse(str)
    return this.parse(str, options)
  }
  createDom (originNode, createOptions) {
    var index = 0
    var createNode = (source, parent, previous, origin) => {
      var options = {
        index: index++,
        parent: parent,
        previous: previous
      }
      if (origin) {
        options.lineNumber = origin.lineNumber
        options.expressions = origin.expressions
      }

      var node = factory.create(source, _.extend({}, createOptions, options))
      return node
    }
    var createChildren = (children = [], parent) => {
      var current = null
      _.each(children, (child) => {
        current = createNode(child.source, parent, current, child)
        createChildren(child.children, current)
      })
      return parent
    }
    var root = createNode()
    createChildren(originNode.children, root)
    root.initAll()
    return root
  }
}

export default Parser
