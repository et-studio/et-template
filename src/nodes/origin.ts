
import {removeAt, insertAfter, insertBefore} from '../util'

export class OriginNode implements IOriginNode {
  nodeType: string | number = 'ET';
  nodeName = '';
  source = '';
  header = '';
  html = '';
  tail = '';

  parent: OriginNode = null;
  previous: OriginNode = null;
  next: OriginNode = null;
  expressions = new Array<OriginNode>();
  children = new Array<OriginNode>();

  append (childNode: OriginNode) {
    childNode.remove()

    let children = this.children
    if (children.length > 0) {
      let last = children[children.length - 1]
      last.next = childNode
      childNode.previous = last
    }

    children.push(childNode)
    childNode.next = null
    childNode.parent = this
  }
  prepend (childNode: OriginNode) {
    childNode.remove()

    let children = this.children
    if (children.length > 0) {
      let first = children[0]
      first.previous = childNode
      childNode.next = first
    }

    children.unshift(childNode)
    childNode.previous = null
    childNode.parent = this
  }
  after (nextNode: OriginNode) {
    if (!this.parent) return

    if (!this.next) {
      return this.parent.append(nextNode)
    }

    nextNode.remove()
    nextNode.parent = this.parent
    nextNode.previous = this
    nextNode.next = this.next

    let currentNext = this.next
    if (currentNext) currentNext.previous = nextNode
    this.next = nextNode

    insertAfter(this.parent.children, this, nextNode)
  }
  before (previousNode: OriginNode) {
    if (!this.parent) return

    if (!this.previous) {
      return this.parent.prepend(previousNode)
    }

    previousNode.remove()
    previousNode.parent = this.parent
    previousNode.next = this
    previousNode.previous = this.previous

    let currentPrevious = this.previous
    if (currentPrevious) currentPrevious.next = previousNode
    this.previous = previousNode

    insertBefore(this.parent.children, this, previousNode)
  }
  remove () {
    let previous = this.previous
    let next = this.next
    if (previous) previous.next = next
    if (next) next.previous = previous

    if (this.parent) {
      removeAt(this.parent.children, this)
    }
  }
  getOuterHTML () {
    switch (this.nodeType) {
      case 1:
        let results: string[] = [];
        results.push(this.header)
        results.push(this.html)
        results.push(this.tail)
        return results.join('')
      case 3:
        return this.getInnerHTML()
    }
  }
  getInnerHTML () {
    return this.html
  }
}
