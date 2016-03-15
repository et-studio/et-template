
import {BasicNode} from './basic'
const PARAMETER_SPLIT = ' from '

export class ImportNode extends BasicNode {
  namespace = 'import';
  nodeName = '#import';

  parse () {
    let list = this.source.split(PARAMETER_SPLIT)

    let name = (list[0] || '').trim()
    let path = (list[1] || '').trim()

    let c1 = path[0]
    let c2 = path[path.length - 1]
    let isSingle = (c1 === '\'' && c2 === '\'')
    let isDouble = (c1 === '"' && c2 === '"')
    if (isSingle || isDouble) {
      path = path.slice(1, path.length - 1)
    }
    this.addDependency(name, path)
  }
}
