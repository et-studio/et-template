
import {clone, each} from 'lodash'
import {eachNode} from '../util'
import {IfNode} from '../nodes/if'
import {ElseIfNode} from '../nodes/elseif'
import {ElseNode} from '../nodes/else'

export function rebuild (node: INode) {
  eachNode(node, (item) => {
    if (item instanceof IfNode) {
      rebuildIf(item)
    }
  })
  return node
}

function rebuildIf (node: IfNode) {
  let isChange = false
  let duplicate = clone(node.children)
  let currentNode: INode = node

  each(duplicate, (child) => {
    if (child instanceof ElseIfNode || child instanceof ElseNode) {
      currentNode.after(child)
      currentNode = child
      isChange = true
    } else {
      currentNode.append(child)
    }
  })
  return isChange
}
