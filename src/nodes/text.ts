
import {parseValue, wrap} from '../parsers'
import {BasicNode} from './basic'

export class TextNode extends BasicNode {
  nodeType = 3

  create (): string | ICreate {
    const text = this.source
    const result = parseValue(text)

    const args = [this.parent.id.toString(), this.id.toString()]
    if (!result.isDynamic) {
      args.push(wrap(text))
      return `_dep.text(_template, ${args.join(', ')});`
    } else {
      const updateArgs = ['_template', this.id.toString()]
      const create = `_dep.text(_template, ${args.join(', ')});`
      const set = this.getValueSet(result, '_dep.updateText', updateArgs)
      const patch = set.patches.join('\n')
      const update = set.updates.join('\n')
      return {create, patch, update}
    }
  }
}
