
import {BasicNode} from './basic'
import {parseValue, wrap} from '../parsers'

export class HtmlNode extends BasicNode {
  nodeName = '#html'

  create (): string | ICreate {
    const result = parseValue(this.html)
    if (!result.isDynamic) {
      const args = [this.parent.id.toString()]
      args.push(wrap(this.html))
      return `_dep.html(_template, ${args.join(', ')});`
    } else {
      const args = ['_template', this.parent.id.toString()]
      const create = ''
      const set = this.getValueSet(result, '_dep.html', args)
      const patch = set.patches.join('\n')
      const update = set.updates.join('\n')
      return {create, patch, update}
    }
  }

  getCreateList () {
    return []
  }
}
