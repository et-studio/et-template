'use strict'

import Basic from './basic'
import conditionParser from '../parsers/condition'

var NODE_NAME = '#elseif'
var TAG = 'else if'

class ElseIfNode extends Basic {
  constructor (source, options) {
    super(source, options)
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
