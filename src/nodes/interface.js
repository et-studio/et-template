'use strict'

import _ from '../util'

var config = {
  'templateFunctionPrefix': 'Template_'
}

class Interface {
  constructor () {
    this._index = 0
    this._lineNumber = null
    this.valueId = 0
    this.children = []

    this.parent = null
    this.previous = null
    this.next = null
  }
  setIndex (index) {
    this._index = index
  }
  getId () {
    return this._index * 2
  }
  getLineNumber () {
    return this._lineNumber
  }
  getTemplateName () {
    var id = this.getId()
    return config.templateFunctionPrefix + id
  }
  getLineId () {
    var id = this.getId()
    return id - 1
  }
  getValueId () {
    return this.valueId++
  }
  getParentId () {
    var parent = this.parent
    if (parent && !parent.isRoot && !parent.isNewTemplate) {
      return parent.getId()
    } else {
      return null
    }
  }
  getNodeName () {
    return this.nodeName && this.nodeName.toUpperCase()
  }
  getTextContent () {
    return this.textContent || this.content || ''
  }
  getRootValueId () {
    var lastRoot = this.getLastRoot()
    if (lastRoot) {
      return lastRoot.getValueId()
    } else {
      return null
    }
  }
  getLastRoot () {
    var parent = this.parent
    while (parent) {
      if (parent.isNewTemplate || !parent.parent) {
        return parent
      }
      parent = parent.parent
    }
    return null
  }

  remove () {
    if (!this.parent) return

    var nodePrev = this.previous
    var nodeNext = this.next
    if (nodePrev) nodePrev.next = nodeNext
    if (nodeNext) nodeNext.previous = nodePrev
    this.previous = null
    this.next = null

    var newChidren = []
    var _this = this
    _.each(this.parent.children, (child) => {
      if (child.getId() !== _this.getId()) {
        newChidren.push(child)
      }
    })
    this.parent.children = newChidren
  }
  prepend (node) {
    var children = this.children

    if (children.length > 0) {
      var first = children[0]
      first.previous = node
      node.next = first
    }

    children.unshift(node)
    node.previous = null
    node.parent = this
  }
  append (node) {
    var children = this.children

    if (children.length > 0) {
      var last = children[children.length - 1]
      last.next = node
      node.previous = last
    }

    children.push(node)
    node.next = null
    node.parent = this
  }
  after (node) {
    if (!this.parent) return

    node.remove()
    node.parent = this.parent
    node.previous = this
    node.next = this.next

    var currentNext = this.next
    if (currentNext) currentNext.previous = node
    this.next = node

    var newChidren = []
    var _this = this
    _.each(this.parent.children, (child) => {
      newChidren.push(child)
      if (child.getId() === _this.getId()) {
        newChidren.push(node)
      }
    })
    this.parent.children = newChidren
  }

  checkRoot () {
    var parent = this.parent
    if (!parent) return true
    if (parent.isNewTemplate) return true
    return false
  }
}

export default Interface
