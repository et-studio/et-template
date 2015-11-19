'use strict'

import Basic from './basic-middleware'

const VALUE_BIND_KEY = '[(value)]'
const OUTPUT_KEY = 'et-output'
const EVENT_PREFIX = 'on-'
const EVENT_LEFT_BRACKET = '('
const EVENT_RIGHT_BRACKET = ')'
const EVENT_SPLIT = ','

class MiddlewareAttributes extends Basic {
  run (last, options) {
    last.each(this.checkNode.bind(this))
    return last
  }
  checkNode (node) {
    if (node.nodeType === 1) {
      this.translateValueBind(node)
      this.translateElementAttributes(node)
    }
  }
  translateValueBind (element) {
    var attributes = element.attributes
    for (var key in attributes) {
      var expression = attributes[key]
      if (this.chargeIsValueBind(key)) {
        delete attributes[key]
        attributes['value'] = `{{${expression}}}`
        attributes['et-output'] = expression
      }
    }
  }
  translateElementAttributes (element) {
    var attributes = element.attributes || {}
    for (var key in attributes) {
      var expression = attributes[key]
      var eventName = this.getEventFromKey(key)
      var expressionList = expression.split(EVENT_SPLIT)

      if (this.chargeIsOutput(key)) {
        delete attributes[key]
        element.setOutput(expression)
      } else if (eventName) {
        delete attributes[key]
        element.setEvent(eventName, expressionList[0], expressionList.slice(1))
      }
    }
  }
  chargeIsValueBind (key) {
    return key === VALUE_BIND_KEY
  }
  chargeIsOutput (key) {
    return key === OUTPUT_KEY
  }
  getEventFromKey (key) {
    var isLeftMatch = key.indexOf(EVENT_LEFT_BRACKET) === 0
    var isRightMatch = key.indexOf(EVENT_RIGHT_BRACKET) === (key.length - 1)

    if (key.indexOf(EVENT_PREFIX) === 0) {
      return key.substr(EVENT_PREFIX.length)
    } else if (isLeftMatch && isRightMatch) {
      return key.substr(1, key.length - 2)
    }
    return null
  }
}
export default new MiddlewareAttributes()
