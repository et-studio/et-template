'use strict'

import Basic from './basic'
import forParser from '../parsers/for'

var NAME_SPACE = 'for'
var NODE_NAME = `#${NAME_SPACE}`
var defaults = {
  itemName: 'item',
  indexName: 'i',
  lengthName: 'len'
}

class ForNode extends Basic {
  constructor (origin, options) {
    super(origin, options)

    this.namespace = NAME_SPACE
    this.isNewTemplate = true
    this.nodeName = NODE_NAME
  }
  parse (source) {
    var tmp = forParser.parse(source)

    this.itemName = tmp.itemName
    this.indexName = tmp.indexName
    this.expression = tmp.expression
    if (tmp.indexName) {
      this.saveArgument(tmp.itemName, tmp.indexName)
    } else {
      this.saveArgument(tmp.itemName)
    }
  }
  checkIsImportTemplate () {
    return this.children.length === 1 && this.children[0].nodeName === '#import'
  }
  assembleWorkerData () {
    var it = this._workerData
    if (it) return it

    it = {
      id: this.getId(),
      lineId: this.getLineId(),
      parentId: this.getParentId(),
      valueId: this.getRootValueId(),
      isRoot: this.checkRoot(),
      expression: this.expression || this.condition,
      indexName: this.indexName || defaults.indexName,
      itemName: this.itemName || defaults.itemName,
      templateName: this.getTemplateName(),
      args: this.getArguments()
    }

    if (this.checkIsImportTemplate()) {
      var child = this.children[0]
      it.templateName = child.getTemplateName()
      it.args = child.getArguments()
      it.context = child.getContext()
    }

    this._workerData = it
    return it
  }
}

export default ForNode
