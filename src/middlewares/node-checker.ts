
import {eachNode} from '../util'
import {HtmlNode} from '../nodes/html'

export function check (node: INode) {
  eachNode(node, (item) => {
    if (item instanceof HtmlNode) {
      checkHtmlNode(item)
    }
  })
  return node
}

function checkHtmlNode (node: HtmlNode) {
  let message = ''
  if (!node.parent) {
    message = 'html node need a parent'
  }
  if (node.parent.nodeType !== 1) {
    message = 'the parent of html node should be element node'
  }
  if (node.parent.children.length > 1) {
    message = 'html node should not has siblings'
  }
  if (message) {
    throw new Error(message)
  }
}
