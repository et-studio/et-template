'use strict'

import Basic from './basic'
import worker from '../worker'
import conditionParser from '../parsers/condition'
import valueParser from '../parsers/value'

class HtmlNode extends Basic {
  parse (source) {
    var tmp = conditionParser.parse(source, {
      expectNodeName: '#html'
    })
    this.nodeName = tmp.nodeName
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
  deliverCreate () {
    var re = []
    var expression = this.expression
    if (expression && !valueParser.isErratic(expression)) {
      re.push(worker.createHtml({
        parentId: this.parent.getId(),
        expression: this.expression
      }))
    }
    return re
  }
  deliverUpdate () {
    var re = []
    var expression = this.expression
    if (valueParser.isErratic(expression)) {
      re.push(worker.updateHtml({
        parentId: this.getParentId(),
        valueId: this.getRootValueId(),
        valueString: valueParser.parse(expression)
      }))
    }
    return re
  }
}
export default HtmlNode
