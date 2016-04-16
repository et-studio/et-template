
import {BasicNode} from './basic';
const PARAMETER_SPLIT = ',';

export class ChildNode extends BasicNode {

  childContext = ''

  parse () {
    let list = this.source.split(PARAMETER_SPLIT)

    let path = (list[0] || '').trim()
    let c1 = path[0]
    let c2 = path[path.length - 1]
    let isSingleQuotation = (c1 === '\'' && c2 === '\'')
    let isDoubleQuotation = (c1 === '"' && c2 === '"')
    if (isSingleQuotation || isDoubleQuotation) {
      path = path.slice(1, path.length - 1)
    }

    this.childContext = (list[1] || '').trim()
    this.addDependency(this.name, path)
  }
  create () {
    let context = this.childContext
    let args = [this.parent.id, this.id, this.name]
    if (this.childContext) {
      args.push(this.createFunction(`return ${context};`))
    }
    return `_dep.child(_template, ${args.join(', ')});`
  }
}
