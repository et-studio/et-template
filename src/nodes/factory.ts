'use strict'

import {ElementNode} from './element'
import {TextNode} from './text'
import {BasicNode} from './basic'
import {IfNode} from './if'
import {ElseIfNode} from './elseif'
import {ElseNode} from './else'
import {ForNode} from './for'
import {HtmlNode} from './html'
import {ChildNode} from './child'
import {ImportNode} from './import'

export function createNode (origin: IOriginNode, options: IOptions) {
  let result: BasicNode
  if (!origin) {
    result = new BasicNode()
  } else if (origin.nodeType === 'ET') {
    switch (origin.nodeName) {
      case '#if':
        result = new IfNode(origin)
        break
      case '#elseif':
        result = new ElseIfNode(origin)
        break
      case '#else':
        result = new ElseNode(origin)
        break
      case '#for':
        result = new ForNode(origin)
        break
      case '#html':
        result = new HtmlNode(origin)
        break
      case '#child':
        result = new ChildNode(origin)
        break
      case '#import':
        result = new ImportNode(origin)
        break
    }
  } else {
    switch (origin.nodeType) {
      case 1:
        result = new ElementNode(origin)
        break
      case 3:
        result = new TextNode(origin)
        break
    }
  }
  return result
}
