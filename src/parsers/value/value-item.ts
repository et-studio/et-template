
import {each} from 'lodash'

export class ValueItem {
  expression = ''
  pipes: string[][] = []

  addExpression (token: string) {
    this.expression += token
  }
  addPipe (token: string) {
    let pipe = this.getlastPipe()
    if (!pipe.length) {
      pipe.push(token)
    } else {
      let last = pipe.pop()
      last += token
      pipe.push(last)
    }
  }
  getlastPipe () {
    if (!this.pipes.length) {
      return this.createPipe()
    } else {
      return this.pipes[this.pipes.length - 1]
    }
  }
  createPipe () {
    let pipe: string[] = []
    this.pipes.push(pipe)
    return pipe
  }
  createPipeItem () {
    let pipe = this.getlastPipe()
    pipe.push('')
  }
  toString () {
    let arr = [this.expression]
    each(this.pipes, pipe => arr.push(pipe.join(', ')))
    return arr.join(' | ')
  }
}
