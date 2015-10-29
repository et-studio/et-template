'use strict'

import Basic from './basic'
import valueParser from '../parsers/value'

var NAME_SPACE = 'text'

class TextNode extends Basic {
  constructor (origin, options = {}) {
    super(origin, options)

    this.namespace = NAME_SPACE
    this.nodeType = 3
  }
  parse (source) {
    this.textContent = source
  }

  assembleWorkerData () {
    var it = this._workerData
    if (it) return it

    var text = this.getTextContent()
    it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      parentId: this.getParentId(),
      isErratic: valueParser.isErratic(text),
      text: text
    }
    if (it.isErratic) {
      it.valueId = this.getRootValueId()
      it.valueString = valueParser.parse(text)
    }

    this._workerData = it
    return it
  }
}

export default TextNode
