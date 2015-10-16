'use strict'

import Basic from './basic'
import conditionParser from '../parsers/condition'
import valueParser from '../parsers/value'

var NAME_SPACE = 'html'
var NODE_NAME = `#${NAME_SPACE}`

class HtmlNode extends Basic {
  parse (source) {
    var tmp = conditionParser.parse(source, {expectNodeName: NODE_NAME})

    this.namespace = NAME_SPACE
    this.nodeName = NODE_NAME
    var expression = tmp.condition
    this.expression = expression.slice(1, expression.length - 1)
  }
  init () {
    if (!this.parent) {
      this.throwError('html node need a parent')
    }
    if (this.parent.nodeType !== 1) {
      this.throwError('the parent of html node should be element node')
    }
    if (this.parent.children.length > 1) {
      this.throwError('html node should not has siblings')
    }
  }

  assembleWorkerData () {
    var it = this._workerData
    if (it) return it

    var expression = this.expression
    it = {
      parentId: this.getParentId(),
      isErratic: valueParser.isErratic(expression),
      expression: this.expression
    }

    if (it.isErratic) {
      it.valueId = this.getRootValueId()
      it.valueString = valueParser.parse(expression)
    }

    this._workerData = it
    return it
  }
}
export default HtmlNode
