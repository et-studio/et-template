'use strict'

import Basic from './basic'
import conditionParser from '../parsers/condition'

var NAME_SPACE = 'else'
var NODE_NAME = `#${NAME_SPACE}`
var TAG = NAME_SPACE

class ElseNode extends Basic {
  constructor (source, options) {
    super(source, options)

    this.namespace = 'else'
    this.isNewTemplate = true
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
