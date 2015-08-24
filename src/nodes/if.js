'use strict'

import Basic from './basic'
import _ from '../util'
import worker from '../worker'
import conditionParser from '../parsers/condition'

class IfNode extends Basic {
  constructor (source, options) {
    super(source, options)
    this.isNewTemplate = true
  }
  parse (source) {
    var tmp = conditionParser.parse(source, {
      expectNodeName: '#if'
    })
    this.nodeName = tmp.nodeName
    this.condition = tmp.condition
  }
  init () {
    // 调整elseif 和 else的树形关系
    var children = this.children
    this.children = []

    var currentNode = this
    _.each(children, (child) => {
      if (child.nodeName === '#elseif' || child.nodeName === '#else') {
        currentNode.after(child)
        currentNode = child
      } else {
        currentNode.appendChild(child)
      }
    })
  }
  deliverCreate () {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      lineId: this.getLineId(),
      parentId: this.getParentId()
    }
    var re = []
    re.push(worker.createLine(it))
    re.push(worker.createNull(it))
    return re
  }
  deliverUpdate () {
    var lastRoot = this.getLastRoot()
    var it = {
      id: this.getId(),
      lineId: this.getLineId(),
      isRoot: this.checkRoot(),
      indexValueId: lastRoot.getValueId(),
      doms: this.getConditionDoms()
    }
    return [worker.updateIf(it)]
  }
  getConditionDoms () {
    var re = [this.translateDom(this)]

    var hasElse = false
    var current = this.next
    while (current) {
      if (current.nodeName === '#elseif' || current.nodeName === '#else') {
        re.push(this.translateDom(current))
      }
      if (current.nodeName === '#else') {
        hasElse = true
      }
      if (current.nodeName !== '#elseif') {
        break
      }
      current = current.next
    }
    if (!hasElse) {
      var defaultElse = {
        tag: 'else',
        isDefaultElse: true
      }
      defaultElse.siblings = _.concat([], re)
      re.push(defaultElse)
    }

    var self = this
    _.each(re, (dom) => {
      dom.siblings = self.pickSiblings(re, dom)
    })
    return re
  }
  translateDom (dom) {
    return {
      id: dom.getId(),
      isRoot: dom.checkRoot(),
      lineId: dom.getLineId(),
      parentId: dom.getParentId(),
      templateName: dom.getTemplateName(),
      args: dom.getArguments(),
      condition: dom.condition,
      tag: this.getTag(dom.nodeName)
    }
  }
  pickSiblings (doms, current) {
    var siblings = []
    _.each(doms, (dom) => {
      if (dom.id && dom.id !== current.id) {
        siblings.push(dom)
      }
    })
    return siblings
  }
  getTag (nodeName) {
    switch (nodeName) {
      case '#if':
        return 'if'
      case '#elseif':
        return 'else if'
      default:
        return 'else'
    }
  }
}
export default IfNode
