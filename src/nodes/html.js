'use strict'

import Basic from './basic'
import valueParser from '../parsers/value'

var NAME_SPACE = 'html'
var NODE_NAME = `#${NAME_SPACE}`

class HtmlNode extends Basic {
  parse (source) {
    this.namespace = NAME_SPACE
    this.nodeName = NODE_NAME
    this.textContent = ''
  }

  assembleWorkerData () {
    var it = this._workerData
    if (it) return it

    var textContent = this.textContent
    it = {
      parentId: this.getParentId(),
      isErratic: valueParser.isErratic(textContent),
      textContent: textContent
    }

    if (it.isErratic) {
      it.valueId = this.getRootValueId()
      it.valueString = valueParser.parse(textContent)
    }

    this._workerData = it
    return it
  }
}
export default HtmlNode
