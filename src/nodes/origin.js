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
    this.nodeName = ''
    this.header = ''
    this.tail = ''

    this.children = []
    this.expressions = []

    this.nodeType = null
    this.attributes = null

    this.state = null
    this.isHeaderClosed = false
    this.isClosed = false
  }

  addSource (token) {
    this.source += token
    switch (this.state) {
      case 'nodeName':
        this.nodeName += token
        break
      case 'header':
        this.header += token
        break
    }
  }
  setState (state) {
    this.state = state
  }
  startNodeName (token) {
    if (token === '[#') this.nodeName = '#'
    this.addSource(token)
    this.setState('nodeName')
  }
  startHeader (token) {
    this.setState('header')
    this.addSource(token)
  }
  closeHeader (token) {
    this.setState('headerClosed')
    this.isHeaderClosed = true

    this.addSource(token)
    this.saveChildrenToExpressions()
  }
  closeNode (tail) {
    var current = this
    while (current.parent) {
      if (current.matchClose(tail)) {
        current.isClosed = true
        current.tail = tail
        break
      }
      current = current.parent
    }
    current.closeAll()
    return current.parent || current
  }

  createChild (source) {
    var node = new OriginNode(source)
    this.children.push(node)
    node.parent = this
    return node
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
    var currentNodeName = this.nodeName
    var tailNodeName = tail.slice(1, tail.length - 1).trim()
    return `/${currentNodeName}` === tailNodeName
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
