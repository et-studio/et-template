var _ = require('../util')

class OriginNode {
  constructor (parent, source = '', options = {}) {
    this.rowNumber = options.rowNumber
    this.colNumber = options.colNumber
    this.isClosed = false
    this.source = source.trim()
    this.parent = parent
    this.children = []
    this.expressions = []
  }
  addSource (str) {
    this.source += str
  }
  createChild (source, options) {
    var node = new OriginNode(this, source, options)
    this.children.push(node)
    return node
  }
  saveSource (source = '', options) {
    source = source.trim()
    if (source) {
      this.createChild(source, options)
    }
  }
  closeNode (closeName) {
    var current = this
    while (current.parent) {
      if (current.matchClose(closeName)) {
        current.isClosed = true
        break
      }
      current = current.parent
    }
    current.closeAll()
    if (current.parent) {
      return current.parent
    } else {
      return current
    }
  }
  closeAll () {
    _.each(this.children, (child) => {
      child.closeAll()
    })

    if (this.parent && !this.isClosed) {
      _.concat(this.parent.children, this.children)
      this.isClosed = true
      this.children = []
    }
    return this
  }
  matchClose (closeName) {
    var start = ''
    var source = ''
    if (this.source.indexOf('<') === 0) {
      start = `<${closeName} `
      source = `<${closeName}>`
    } else if (this.source.indexOf('[#') === 0) {
      start = `[#${closeName} `
      source = `[#${closeName}]`
    } else {
      return false
    }
    var currentSource = this.source.trim()
    var isMatch = currentSource === source || currentSource.indexOf(start) === 0
    return isMatch
  }
  saveChildrenToExpressions () {
    this.expressions = this.children
    this.children = []
  }
  levelChildren () {
    var root = this
    var children = []
    while (root.parent) {
      _.concat(children, root.children)
      root.children = []
      root = root.parent
    }
    _.concat(root.children, children)
    return this
  }
  removeEmptyNode () {
    var newChildren = []
    this.children.forEach((child) => {
      if (child && child.source) {
        child.removeEmptyNode()
        newChildren.push(child)
      }
    })
    this.children = newChildren
  }
  each (callback) {
    if (typeof callback === 'function') {
      callback(this)
      this.children.forEach((child) => {
        child.each(callback)
      })
    }
  }
}

module.exports = OriginNode
