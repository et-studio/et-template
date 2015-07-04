'use strict'

import Basic from './basic'
import worker from '../worker'
import valueParser from '../parsers/value'

class TextNode extends Basic {
  constructor (source, options = {}) {
    super(source, options)
    this.nodeType = 3
  }
  parse (source) {
    this.textContent = source
  }
  deliverCreate () {
    var text = this.getTextContent()
    if (this.isErraticValue(text)) {
      text = ''
    }
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      lineId: this.getLineId(),
      parentId: this.getParentId(),
      text: text
    }
    return [worker.createText(it)]
  }
  deliverUpdate () {
    var text = this.getTextContent()
    if (this.isErraticValue(text)) {
      var it = {
        id: this.getId(),
        isRoot: this.checkRoot(),
        lineId: this.getLineId(),
        parentId: this.getParentId(),
        valueId: this.getRootValueId(),
        valueString: valueParser.parse(text)
      }
      return [worker.updateText(it)]
    } else {
      return []
    }
  }
}

export default TextNode
