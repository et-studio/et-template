'use strict'

import _ from './util'
import originParser from './parsers/origin'
import dotParser from './parsers/dot'
import factory from './nodes/factory'

class Parser {
  constructor (options = {}) {
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

      var node = factory.create(source, _.extend({}, this.options, options))
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
