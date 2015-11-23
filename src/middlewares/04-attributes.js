'use strict'

import Basic from './basic-middleware'

const VALUE_BIND_KEY = '[(value)]'
const EVENT_PREFIX = 'on-'
const EVENT_LEFT_BRACKET = '('
const EVENT_RIGHT_BRACKET = ')'
const EVENT_SPLIT = ','
const OUTPUT_LEFT_BRACKET = '['
const OUTPUT_RIGHT_BRACKET = ']'

class MiddlewareAttributes extends Basic {
  run (last, options) {
    last.each(this.checkNode.bind(this))
    return last
  }
  checkNode (node) {
    if (node.nodeType === 1) {
      this.translateValueBind(node)
      this.translateElementAttributes(node)
      this.translateOutputAttributes(node)
    }
  }
  translateValueBind (element) {
    var attributes = element.attributes
    for (var key in attributes) {
      var expression = attributes[key]
      if (this.chargeIsValueBind(key)) {
        delete attributes[key]
        attributes['value'] = `{{${expression}}}`
        attributes['[value]'] = expression
      }
    }
  }
  translateElementAttributes (element) {
    var attributes = element.attributes || {}
    for (var key in attributes) {
      var expression = attributes[key]
      var eventName = this.getEventFromKey(key)
      var expressions = this.parseEventExpression(expression)

      if (eventName) {
        delete attributes[key]
        element.setEvent(eventName, expressions[0], expressions.slice(1))
      }
    }
  }
  translateOutputAttributes (element) {
    var attributes = element.attributes || {}
    for (var key in attributes) {
      var outputName = this.getOutputFromKey(key)
      var expression = attributes[key]
      if (outputName) {
        delete attributes[key]
        element.addOutput(outputName, expression)
      }
    }
  }
  chargeIsValueBind (key) {
    return key === VALUE_BIND_KEY
  }
  getEventFromKey (key) {
    var isLeftMatch = key.indexOf(EVENT_LEFT_BRACKET) === 0
    var isRightMatch = key.indexOf(EVENT_RIGHT_BRACKET) === (key.length - 1)

    if (key.indexOf(EVENT_PREFIX) === 0) {
      // parse string like 'on-click'
      return key.substr(EVENT_PREFIX.length)
    } else if (isLeftMatch && isRightMatch) {
      // parse string like (click)
      return key.substr(1, key.length - 2)
    }
    return null
  }
  parseEventExpression (expression) {
    var results = expression.split(EVENT_SPLIT)
    return results.map(item => item.trim())
  }
  getOutputFromKey (key) {
    var isLeftMatch = key.indexOf(OUTPUT_LEFT_BRACKET) === 0
    var isRightMatch = key.indexOf(OUTPUT_RIGHT_BRACKET) === (key.length - 1)

    if (isLeftMatch && isRightMatch) {
      // parse string like [value]
      return key.substr(1, key.length - 2)
    }
    return null
  }
}
export default new MiddlewareAttributes()
