'use strict'

import Basic from './basic'
import conditionParser from '../parsers/condition'

var NAME_SPACE = 'if'
var NODE_NAME = `#${NAME_SPACE}`
var TAG = NAME_SPACE

class IfNode extends Basic {
  constructor (origin, options) {
    super(origin, options)

    this.namespace = NAME_SPACE
    this.isNewTemplate = true
    this.nodeName = NODE_NAME
  }
  parse (source) {
    var tmp = conditionParser.parse(source, {expectNodeName: NODE_NAME})
    this.condition = tmp.condition
  }

  getTag () {
    return TAG
  }
  getConditionDoms () {
    var results = [this.translateDom(this)]

    var hasElse = false
    var current = this.next
    while (current) {
      var currentTag = current.getTag()
      if (currentTag === 'else if' || currentTag === 'else') {
        results.push(this.translateDom(current))
      }
      if (currentTag === 'else') {
        hasElse = true
      }
      if (currentTag !== 'else if') {
        break
      }
      current = current.next
    }
    if (!hasElse) results.push(this.translateDom(null))
    return results
  }
  translateDom (dom) {
    if (dom) {
      return {
        id: dom.getId(),
        templateName: dom.getTemplateName(),
        args: dom.getArguments(),
        tag: dom.getTag(),
        condition: dom.condition
      }
    } else {
      return {
        tag: 'else',
        condition: '',
        isDefaultElse: true
      }
    }
  }
  assembleWorkerData () {
    var it = this._workerData
    if (it) return it

    this._workerData = it = {
      id: this.getId(),
      lineId: this.getLineId(),
      parentId: this.getParentId(),
      valueId: this.getRootValueId(),
      saveId: this.getRootValueId(),
      isRoot: this.checkRoot(),
      doms: this.getConditionDoms()
    }
    return it
  }
}
export default IfNode
