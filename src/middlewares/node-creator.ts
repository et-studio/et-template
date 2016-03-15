
import {each} from 'lodash'
import {BasicNode} from '../nodes/basic'
import {createNode as createFromOrigin} from '../nodes/factory'

export function create (last: IOriginNode, options: IOptions) {
  let index = 0
  function createNode (origin?: IOriginNode, isExpression?: boolean) {
    let result: BasicNode
    if (origin) {
      result = createFromOrigin(origin, options)
      if (!isExpression) result.setIndex(index++)
    } else {
      result = createFromOrigin(null, options)
      if (!isExpression) index++
    }
    return result
  }
  function createChildren (parent: INode, origin: IOriginNode) {
    each(origin.children, (child) => {
      let node = createNode(child)
      parent.append(node)
      createChildren(node, child)
    })
    each(origin.expressions, (item) => {
      let expNode = createNode(item, true)
      parent.expressions.push(expNode)
      createChildren(expNode, item)
    })
    return parent
  }

  let root = createNode()
  return createChildren(root, last)
}
