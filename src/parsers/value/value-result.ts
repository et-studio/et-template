
import {each} from 'lodash'
import {VALUE_STATES} from './value-states'
import {ValueItem} from './value-item'

export class ValueResult {
  isDynamic = false
  hasPipe = false
  state = VALUE_STATES.text
  values: (string | ValueItem)[] = []

  addToken (token: string) {
    if (this.state === VALUE_STATES.text) {
      this.addText(token)
    } else if (this.state === VALUE_STATES.value) {
      this.addValue(token)
    } else if (this.state === VALUE_STATES.pipe) {
      this.addPipe(token)
    }
  }
  addText (token: string) {
    if (!this.values.length) {
      this.values.push(token)
      return
    }

    let last = this.values.pop()
    if (typeof last === 'string') {
      last += token
      this.values.push(last)
      return
    } else {
      this.values.push(last)
      this.values.push(token)
    }
  }
  addValue (token: string) {
    if (!this.values.length) {
      this.values.push(this.createItem(token))
      return
    }

    let last = this.values.pop()
    if (typeof last === 'string') {
      this.values.push(last)
      this.values.push(this.createItem(token))
      return
    } else {
      last.addExpression(token)
      this.values.push(last)
    }
  }
  addPipe (token: string) {
    let last = this.values[this.values.length - 1]
    if (typeof last === 'string') {
      throw new Error('Pipe must follow a method!')
    } else {
      last.addPipe(token)
    }
  }
  cancel () {
    let last = this.values.pop()
    if (typeof last === 'string') {
      this.values.push(last)
    } else {
      this.addText('{{' + last.toString())
    }
  }
  splitPipe () {
    let last = this.values[this.values.length - 1]
    if (typeof last === 'string') {
      throw new Error('Pipe must follow a method!')
    } else {
      last.createPipeItem()
    }
  }
  createPipe () {
    let last = this.values[this.values.length - 1]
    if (typeof last === 'string') {
      throw new Error('Pipe must follow a method!')
    } else {
      last.createPipe()
    }
  }
  createItem (token: string) {
    let item = new ValueItem()
    item.addExpression(token)
    return item
  }
  format () {
    let isDynamic = false
    let hasPipe = false
    let values: (string | {expression: string, pipes: string[][]})[] = []

    each(this.values, (item) => {
      if (typeof item === 'string' || !item.expression.trim()) {
        this.mergeItem(values, item)
      } else {
        isDynamic = true
        if (!hasPipe) hasPipe = item.pipes.length > 0

        values.push({
          expression: item.expression.trim(),
          pipes: item.pipes.map((item) => {
            return item.map(item2 => item2.trim())
          })
        })
      }
    })

    return {isDynamic, hasPipe, values}
  }

  private mergeItem<T> (arr: (string | T)[], item: (string | T)) {
    let value = typeof item === 'string' ? item : (`{{${item}}}`)

    if (!arr.length) {
      arr.push(value)
      return arr
    }

    let last = arr.pop()
    if (typeof last === 'string') {
      last += value
      arr.push(last)
    } else {
      arr.push(last)
      arr.push(value)
    }
  }
}
