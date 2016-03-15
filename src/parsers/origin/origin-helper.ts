
import {each} from 'lodash'
import {OriginNode} from '../../nodes/origin'
import {Node} from './origin-node'

// help methods to translate node
export function getHtml (node: Node) {
  let html = ''
  each(node.children, (child) => {
    if (child.isTextNode) {
      html += child.source.trim()
    } else {
      html += child.header
      html += getHtml(child)
      html += child.tail
    }
  })
  return html
}

export function translateChildren (parent: OriginNode, children: Node[]) {
  let resuts = new Array<OriginNode>()
  let last = null

  each(children, (child) => {
    if (!child.nodeName && !child.source.trim()) {
      return
    }
    let current = translateNode(child)
    current.parent = parent
    current.previous = last
    if (last) last.next = current

    resuts.push(current)
    last = current
  })
  return resuts
}

export function translateNode (node: Node, isRoot?: boolean) {
  let result = new OriginNode()
  result.nodeName = node.nodeName
  result.source = node.source.trim()
  result.header = node.header
  result.html = getHtml(node)
  result.tail = node.tail
  result.children = translateChildren(result, node.children)
  result.expressions = translateChildren(result, node.expressions)

  if (!isRoot) {
    let nodeName = result.nodeName
    if (!nodeName) {
      result.nodeType = 3 // text
    } else if (nodeName.indexOf('#') === 0) {
      result.nodeType = 'ET'
    } else if (nodeName === '<!--') {
      result.nodeType = 8 // comment
    } else {
      result.nodeType = 1 // elment
    }
  }
  return result
}
