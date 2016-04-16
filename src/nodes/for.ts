
import {BasicNode} from './basic'
import {parseFor} from '../parsers'

export class ForNode extends BasicNode {

  isTemplate = true

  forExpression = ''
  forItem = 'item'
  forIndex = '_i'
  forTrackBy = ''

  parse () {
    let result = parseFor(this.source)
    this.forExpression = result.expression

    if (result.item) {
      this.forItem = result.item
    }
    if (result.index) {
      this.forIndex = result.index
    }
    if (result.trackBy) {
      this.forTrackBy = result.trackBy
    }

    this.addArguments(result.item)
    this.addArguments(result.index)
  }

  create () {
    let args = [this.parent.id, this.id, this.name]

    args.push(this.createFunction(`return ${this.forExpression};`, false))
    if (this.forTrackBy) {
      args.push(this.createFunction(`return ${this.forTrackBy};`))
    }
    return `_dep.efor(_template, ${args.join(', ')});`
  }
}
