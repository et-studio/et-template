
import {BasicNode} from './basic'

export class ElseIfNode extends BasicNode {
  tag = 'else if'
  isTemplate = true

  get condition () {
    return this.source.trim()
  }

}
