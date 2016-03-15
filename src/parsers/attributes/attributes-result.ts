
import {each} from 'lodash'
import {ATTRIBUTES_STATE} from './attributes-state'

export class AttributesResult {
  list = new Array<{key: string, value: string}>()
  state = ATTRIBUTES_STATE.Scan

  addToken (token: string) {
    switch (this.state) {
      case ATTRIBUTES_STATE.Key:
        this.addKey(token)
        break
      case ATTRIBUTES_STATE.Value:
        this.addValue(token)
        break
    }
  }
  createOne () {
    this.list.push({key: '', value: ''})
  }
  getAttributes () {
    let attrs = new Map<string, string>()
    each(this.list, (item) => {
      attrs.set(item.key, item.value)
    })
    return attrs
  }

  private addKey (token: string) {
    let last = this.getLastOne()
    last.key += token
  }
  private addValue (token: string) {
    let last = this.getLastOne()
    last.value += token
  }
  private getLastOne () {
    let len = this.list.length
    if (len) {
      return this.list[len - 1]
    } else {
      this.createOne()
      return this.list[0]
    }
  }
}
