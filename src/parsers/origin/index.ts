
import {Parser} from 'et-parser'
import {NODE_STATE} from './origin-state'
import {Node} from './origin-node'
import {translateNode} from './origin-helper'

const parser = new Parser(`
         | text    | start | name           | source       | tail         | etStart | etName             | etSource   | etTail         | _str[ | _str{{ | _str1 | _str2 | _ignore
  ------ | ----    | ----- | ----           | ------       | ----         | ------- | ------             | --------   | ------         | ----- | ------ | ----- | ----- | --------
  <      | start   |       |                | source       |              |         |                    | etSource   |                |       |        |       |       |
  </     | tail    |       |                | source       |              |         |                    | etSource   |                |       |        |       |       |
  >      | text    |       | nodeEnd:text   | nodeEnd:text | tailEnd:text |         |                    | etSource   |                |       |        |       |       |
  />     | text    |       | nodeEnd:text   | nodeEnd:text | tailEnd:text |         |                    | etSource   |                |       |        |       |       |
  [#     | etStart |       |                | etStart      |              |         |                    | etSource   |                |       |        |       |       |
  [/#    | etTail  |       |                | source       |              |         |                    | etSource   |                |       |        |       |       |
  ]      | text    |       |                | source       |              |         | etEnd:text         | etEnd:text | etTailEnd:text | _     |        |       |       |
  [      | text    |       |                | source       |              |         |                    | _str[      |                | _str[ |        |       |       |
  '      | text    |       |                | _str1        |              |         |                    | _str1      |                |       |        | _     |       |
  "      | text    |       |                | _str2        |              |         |                    | _str2      |                |       |        |       | _     |
  {{     | _str{{  |       |                | _str{{       |              |         |                    | etSource   |                |       |        |       |       |
  \\'    | text    |       |                | source       |              |         |                    | etSource   |                |       |        |       |       |
  \\"    | text    |       |                | source       |              |         |                    | etSource   |                |       |        |       |       |
  }}     | text    |       |                | source       |              |         |                    | etSource   |                |       | _      |       |       |
  :[\\s] | text    |       | nameEnd:source | source       |              |         | etNameEnd:etSource | etSource   |                |       |        |       |       |
  :[\\S] | text    | name  | name           | source       | tail         | etName  | etName             | etSource   | etTail         |       |        |       |       |
  <!--   | _ignore |       |                | source       |              |         |                    | etSource   |                |       |        |       |       |
  -->    | text    |       |                | source       |              |         |                    | etSource   |                |       |        |       |       | _
         | text    |       |                | source       |              |         |                    | etSource   |                |       |        |       |       |
`)

// 1. token归属到 nodeName header tail 中去
// 2. 当前节点几个状态 [header, body, closed]
// 3. html ＝ header ＋ 子辈html + tail
export function parseOrigin (source: string) {
  let root = new Node()
  let current = root
  let tail = ''

  parser.parse(source, (state: string, token: string, index: number) => {
    switch (state) {
      case '_ignore':
        break
      case 'text':
      case '_str[':
      case '_str{{':
      case '_str1':
      case '_str2':
      case 'name':
      case 'source':
      case 'etName':
      case 'etSource':
        current.addSource(token)
        break
      case 'start':
        current = current.createChild()
        current.addSource(token)
        current.state = 1
        break
      case 'etStart':
        current = current.createChild()
        current.addSource(token)
        current.nodeName = '#'
        current.state = NODE_STATE.NodeName
        break
      case 'nameEnd':
      case 'etNameEnd':
        current.state = NODE_STATE.Source
        current.addSource(token)
        break
      case 'nodeEnd':
      case 'etEnd':
        current.state = NODE_STATE.Header
        current.addSource(token)
        current.state = NODE_STATE.Body
        break
      case 'tail':
      case 'etTail':
        tail += token
        break
      case 'tailEnd':
        current = current.closeNode(tail + token)
        tail = ''
        break
      case 'etTailEnd':
        current = current.closeNode(tail + token)
        tail = ''
        if (current.state === NODE_STATE.Source) {
          // 如果关闭之后的父节点头还没有读完
          // 证明这是一个从中间分离出去的
          current.saveExpressions()
          return 'source'
        }
        break
      default:
        throw new Error(`The state: '${state}' is not defined.`)
    }
  })
  root.closeNode('')
  return translateNode(root, true)
}



