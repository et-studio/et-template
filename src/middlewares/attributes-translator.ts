
import {eachNode} from '../util'
import {ElementNode} from '../nodes/element'

const TWO_WAY_KEY = '[(value)]'
const EVENT_REG = /^\(([\s\S]*)\)$|^on-([\s\S]*)/
const OUTPUT_REG = /^\[([\s\S]*)\]$/
const METHOD_LEFT = '('
const METHOD_RIGHT = ')'
const EVENT_SPLIT = ','

export function translate (last: INode) {
  eachNode(last, (node) => {
    if (node.nodeType === 1 && node instanceof ElementNode) {
      translateTwoWayBind(node)
      translateElementAttributes(node)
    }
  })
  return last
}

function translateTwoWayBind (element: ElementNode) {
  let attrs = element.attributes
  attrs.forEach((value, key) => {
    if (key === TWO_WAY_KEY) {
      attrs.delete(key)
      attrs.set('value', `{{${value}}}`)
      attrs.set('[value]', value)
    }
  })
}
function translateElementAttributes (element: ElementNode) {
  let attrs = element.attributes
  attrs.forEach((value, key) => {
    let eventName = getEventFromKey(key)
    let outputName = getOutputFromKey(key)

    if (eventName) {
      let event = parseEventFromExpression(value)
      element.addEvent(eventName, event.expression, event.args)
      attrs.delete(key)
    } else if (outputName) {
      element.addOutput(outputName, value)
      attrs.delete(key)
    }
  })
}

function getEventFromKey (key: string) {
  let matches = EVENT_REG.exec(key)
  // parse event like: on-click or (click)
  if (matches) {
    return matches[1] || matches[2] || null
  } else {
    return null
  }
}
function parseEventFromExpression (value: string) {
  let startIndex = value.indexOf(METHOD_LEFT)
  let endIndex = value.lastIndexOf(METHOD_RIGHT)

  if (!(startIndex < endIndex)) {
    return {expression: value, args: []}
  }

  let methodExprssion = value.substring(0, startIndex)
  let argsExpression = value.substring(startIndex + 1, endIndex)
  let args = []
  argsExpression.split(EVENT_SPLIT).map((item) => {
    let tmp = item.trim()
    if (tmp) args.push(tmp)
  })
  return {expression: methodExprssion, args}
}
function getOutputFromKey (key: string) {
  let matches = OUTPUT_REG.exec(key)

  if (matches) {
    return matches[1] || null
  } else {
    return null
  }
}
