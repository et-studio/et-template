'use strict'

import _ from '../util'
import conditionParser from '../parsers/condition'
import elementParser from '../parsers/element'

// It is just support the if expression.
var handler = {
  parse (expressions) {
    var results = []
    _.each(expressions, (expression) => {
      var cNode = conditionParser.parse(expression.source)

      if (expression.children.length === 1) {
        var items1 = this.parseSingle(cNode.condition, expression.children[0])
        if (items1.length) results.push(items1)
      } else if (expression.children.length > 1) {
        var items2 = this.parseMultiple(cNode.condition, expression.children)
        if (items2.length) results.push(items2)
      }
    })
    return results
  },
  createItem (tag, condition, attributes, exclusions) {
    return {
      tag: tag,
      condition: condition || '',
      attributes: attributes || {},
      exclusions: exclusions || []
    }
  },
  parseSingle (condition, node) {
    var items = []
    var source = node.source || ''
    var tNode = elementParser.parse(`<div ${source}>`, this.options)

    var attrs = tNode.attributes
    var attrKeys = Object.keys(attrs)
    if (attrKeys.length) {
      items.push(this.createItem('if', condition, attrs))
      items.push(this.createItem('else', null, null, attrKeys))
    }
    return items
  },
  parseMultiple (condition, nodes) {
    var results = []
    var hasElse = false
    var allAttributes = {}

    // parse all attributes
    var item = this.createItem('if', condition)
    results.push(item)
    var parseHandler = (node) => {
      if (node.source.indexOf('[#') === 0) {
        var cNode = conditionParser.parse(node.source)
        if (cNode.tag === 'else') {
          item = this.createItem(cNode.tag)
          hasElse = true
        } else {
          item = this.createItem(cNode.tag, cNode.condition)
        }
        results.push(item)
      } else {
        var tNode = elementParser.parse(`<div ${node.source}>`)
        _.extend(allAttributes, tNode.attributes)
        _.extend(item.attributes, tNode.attributes)
      }
    }
    _.each(nodes, parseHandler)
    if (!hasElse) item.push(this.createItem('else'))

    // calculete exclusions
    var exclusionHandler = (item) => {
      item.exclusions = Object.keys(_.omit(allAttributes, item.attributes))
    }
    _.each(results, exclusionHandler)
    return results
  }
}

export default handler
