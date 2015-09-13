'use strict'

import Basic from './basic'
import worker from '../worker'
import valueParser from '../parsers/value'

class TextNode extends Basic {
  constructor (source, options = {}) {
    super(source, options)

    this.nodeType = 3
    this.isVirtualNode = false
  }
  parse (source) {
    this.textContent = source
  }

  assembleWorkerData () {
    var it = this._workerData
    if (it) return it

    it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      parentId: this.getParentId(),
      text: ''
    }
    var text = this.getTextContent()
    if (valueParser.isErratic(text)) {
      it.valueId = this.getRootValueId()
      it.valueString = valueParser.parse(text)
    } else {
      it.text = text
    }
    this._workerData = it
    return it
  }
  deliverCreate () {
    var it = this.assembleWorkerData()
    return [worker.text_create(it)]
  }
  deliverAppend () {
    var it = this.assembleWorkerData()
    return [worker.text_append(it)]
  }
  deliverUpdate () {
    var it = this.assembleWorkerData()
    if (it.valueString) {
      return [worker.text_update(it)]
    } else {
      return []
    }
  }
  deliverRemove () {
    var it = this.assembleWorkerData()
    return [worker.text_remove(it)]
  }
}

export default TextNode
