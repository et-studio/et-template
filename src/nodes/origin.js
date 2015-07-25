import _ from '../util'

var transMap = {
  '&quot;': '\\"',
  '&amp;': '\\&',
  '&lt;': '\\<',
  '&gt;': '\\>',
  '&nbsp;': ' '
}

class OriginNode {
  constructor (parent, source = '', options = {}) {
    this.rowNumber = options.rowNumber
    this.colNumber = options.colNumber

    this.nodeType = options.nodeType
    this.source = source
    this.parent = parent
    this.children = []
    this.expressions = []

    this.isHeaderClosed = false
    this.isClosed = false
  }
  addSource (str) {
    this.source += str
  }
  createChild (source, options) {
    var parent = this.parent || this
    if (this.nodeType === 'HTML' || this.nodeType === 'ET') {
      parent = this
    }
    var node = new OriginNode(parent, source, options)
    parent.children.push(node)
    return node
  }
  saveText (text = '', options) {
    if (text) {
      this.createChild(text, options)
    }
    return this
  }
  closeHeader (token) {
    this.addSource(token)
    this.saveChildrenToExpressions()
    this.isHeaderClosed = true
  }
  closeNode (tail) {
    var current = this
    while (current.parent) {
      if (current.matchClose(tail)) {
        current.transSource()
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
      this.transSource()
      _.concat(this.parent.children, this.children)
      this.isClosed = true
      this.children = []
    }
    return this
  }
  matchClose (tail = '') {
    var start = (tail.slice(0, 1) + tail.slice(2, tail.length - 1)).trim()
    var source = this.source.trim()
    return source.indexOf(start) === 0
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
  transSource () {
    var source = this.source || ''
    source = source.trim().replace(/\s+/g, ' ')
    for (var key in transMap) {
      source = source.replace(new RegExp(key, 'g'), transMap[key])
    }
    this.source = source
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

export default OriginNode
