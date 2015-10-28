import _ from '../util'

// OriginNode first parse
// - source
// - children
// - expressions
//
// OriginNode second parse
// - nodeName
// - header
// - nodeType     [1, 3, 'ET']
//
// OriginNode second parse
// - attributes   {key, value}
//
class OriginNode {
  constructor (source) {
    this.source = source || ''
    this.children = []
    this.expressions = []

    this.nodeName = null
    this.header = null
    this.nodeType = null
    this.attributes = null

    this.isHeaderClosed = false
    this.isClosed = false
  }

  addSource (str) {
    this.source += str
  }
  createChild (source) {
    var node = new OriginNode(source)
    this.children.push(node)
    node.parent = this
    return node
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
        current.isClosed = true
        break
      }
      current = current.parent
    }
    current.closeAll()
    return current.parent || current
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
    this.children.map((child) => {
      if (child && child.source.trim()) {
        child.removeEmptyNode()
        newChildren.push(child)
      }
    })
    this.children = newChildren
  }
  each (callback) {
    callback(this)
    this.children.map((child) => {
      child.each(callback)
    })
  }
}

export default OriginNode
