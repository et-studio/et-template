
import {each} from 'lodash'
import {NODE_STATE} from './origin-state'

export class Node {
  state = NODE_STATE.Start
  isTextNode = false

  nodeName = ''
  header = ''
  tail = ''
  source = ''
  parent: Node

  expressions = new Array<Node>()
  children = new Array<Node>()

  constructor (isTextNode?: boolean) {
    if (isTextNode) {
      this.state = NODE_STATE.Closed
      this.isTextNode = true
    }
  }

  createChild () {
    let node = new Node()
    this.children.push(node)
    node.parent = this
    return node
  }

  addSource (token: string) {
    if (!this.parent) {// the root node
      this.addText(token)
    } else if (this.isTextNode) {
      this.source += token
    } else {
      switch (this.state) {
        case NODE_STATE.Start:
        case NODE_STATE.Header:
          this.header += token
          break
        case NODE_STATE.NodeName:
          this.header += token
          this.nodeName += token
          break
        case NODE_STATE.Source:
          this.header += token
          this.source += token
          break
        case NODE_STATE.Body:
          this.addText(token)
          break
      }
    }
  }

  closeNode (tail: string) {
    let node: Node = this
    let isMatch = this.chargeTail(tail)

    while (!isMatch && node.parent) {
      node = node.parent
      isMatch = node.chargeTail(tail)
    }

    node.tail = tail
    node.state = NODE_STATE.Closed
    node.closeAll()
    return node.parent || node
  }

  saveExpressions () {
    this.expressions = this.children.map((item) => {
      item.parent = null
      return item
    })
    this.children = []
  }

  private closeAll () {
    each(this.children, (child) => {
      child.closeAll()
    })

    if (this.parent && this.state !== NODE_STATE.Closed) {
      this.parent.children = this.parent.children.concat(this.children)
      this.state = NODE_STATE.Closed
      this.children = []
    }
    return this
  }

  private addText (token: string) {
    let len = this.children.length
    if (this.isTextNode) {
      this.source += token
    } else if (!len) {
      let last = new Node(true)
      this.children.push(last)
      last.addSource(token)
    } else {
      let last = this.children[len - 1]
      if (!last.isTextNode) {
        last = new Node(true)
        this.children.push(last)
      }
      last.addSource(token)
    }
  }

  private chargeTail (tail: string) {
    let nodeName = this.nodeName
    let tailName = tail.slice(1, tail.length - 1).trim()
    return nodeName && `/${nodeName}` === tailName
  }
}
