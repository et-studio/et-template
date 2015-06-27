'use strict'

var Basic = require('./basic')
var worker = require('../worker')

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
module.exports = ElseNode
