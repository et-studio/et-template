'use strict'

import Basic from './basic'
import conditionParser from '../parsers/condition'

var NAME_SPACE = 'elseif'
var NODE_NAME = `#${NAME_SPACE}`
var TAG = 'else if'

class ElseIfNode extends Basic {
  constructor (origin, options) {
    super(origin, options)

    this.namespace = NAME_SPACE
    this.isNewTemplate = true
    this.nodeName = NODE_NAME
  }
  parse (source) {
    var tmp = conditionParser.parse(source, {expectNodeName: NODE_NAME})
    this.condition = tmp.condition
  }
  getCondition () {
    return this.condition
  }
  getTag () {
    return TAG
  }
}
export default ElseIfNode
