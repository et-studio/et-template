'use strict'

import Basic from './basic'
import worker from '../worker'

class ElseNode extends Basic {
  constructor (source, options) {
    super(source, options)
    this.isNewTemplate = true
    this.nodeName = '#else'
  }
  deliverCreate () {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot()
    }
    return [worker.createNull(it)]
  }
}
export default ElseNode
