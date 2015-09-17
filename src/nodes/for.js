'use strict'

import Basic from './basic'
import worker from '../worker'
import forParser from '../parsers/for'

var defaults = {
  itemName: 'item',
  indexName: 'i',
  lengthName: 'len'
}

class ForNode extends Basic {
  constructor (source, options) {
    super(source, options)
    this.isNewTemplate = true
    this.nodeName = '#for'
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
  getId () {
    return this._index * 2 - 1
  }
  getLineId () {
    var id = this.getId()
    return id + 1
  }
  getForValueId () {
    var valueId = this._valueId
    if (valueId >= 0) return valueId

    valueId = this._valueId = this.getRootValueId()
    return valueId
  }
  checkIsImportTemplate () {
    return this.children.length === 1 && this.children[0].nodeName === '#import'
  }
  checkIsCompile () {
    return !this.checkIsImportTemplate()
  }
  assembleWorkerData () {
    var it = this._workerData
    if (it) return it

    it = {
      id: this.getId(),
      lineId: this.getLineId(),
      parentId: this.getParentId(),
      valueId: this.getForValueId(),
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
    }

    this._workerData = it
    return it
  }
  deliverCreate () {
    var it = this.assembleWorkerData()
    return [worker.for_create(it)]
  }
  deliverAppend () {
    var it = this.assembleWorkerData()
    return [worker.for_append(it)]
  }
  deliverUpdate () {
    var it = this.assembleWorkerData()
    return [worker.for_update(it)]
  }
  deliverRemove () {
    var it = this.assembleWorkerData()
    return [worker.for_remove(it)]
  }
}

export default ForNode
