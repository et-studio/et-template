
import {each} from 'lodash'
import {BasicNode} from './basic'
import {ElseIfNode} from './elseif'
import {ElseNode} from './else'
import {parseAttributes} from '../parsers'

export class IfNode extends BasicNode {
  tag = 'if';
  isTemplate = true;

  get condition () {
    return this.source.trim()
  }

  getExpressionSource () {
    let re = ''
    each(this.children, (child) => {
      if (child.nodeType === 3) re += (' ' + child.source)
    })
    return re
  }

  getExpressions () {
    let expressions: {tag: string, condition: string, attrs: string[]}[] = []

    let current = {tag: 'if', condition: this.condition, attrs: new Array<string>()}
    each(this.children, (child) => {
      if (child instanceof ElseIfNode) {
        expressions.push(current)
        current = {tag: 'else if', condition: child.condition, attrs: new Array<string>()}
      } else if (child instanceof ElseNode) {
        expressions.push(current)
        current = {tag: 'else', condition: '', attrs: new Array<string>()}
      } else {
        parseAttributes(child.source).forEach((value, key) => current.attrs.push(key))
      }
    })
    expressions.push(current)
    return expressions
  }

  protected create () {
    let args: (string | number)[] = [this.parent.id, this.id]
    let exps: string[] = []
    this.getConditions().forEach((node, index) => {
      if (node instanceof IfNode || node instanceof ElseIfNode) {
        exps.push(`${node.tag} (${node.condition}) return [${index}, ${node.name}];`)
      } else {
        exps.push(`else return [${index}, ${node.name}];`)
      }
    })
    args.push(this.createFunction(exps.join('\n')))
    return `_dep.eif(_template, ${args.join(', ')});`
  }
  private getConditions () {
    let results: INode[] = [this]
    let current: INode = this

    while (true) {
      current = current.next
      if (current instanceof ElseIfNode || current instanceof ElseNode) {
        results.push(current)
      } else {
        break
      }
    }
    return results
  }
}
