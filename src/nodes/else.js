'use strict'

import Basic from './basic'
import conditionParser from '../parsers/condition'

var NODE_NAME = '#else'
var TAG = 'else'

class ElseNode extends Basic {
  constructor (source, options) {
    super(source, options)
    this.nodeName = NODE_NAME
  }
  parse (source) {
    conditionParser.parse(source, {expectNodeName: NODE_NAME})
  }
  getTag () {
    return TAG
  }
}
export default ElseNode
