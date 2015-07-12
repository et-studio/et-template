'use strict'

import Basic from './basic'
import worker from '../worker'
import conditionParser from '../parsers/condition'

class ImportNode extends Basic {
  parse (source) {
    var tmp = conditionParser.parse(source, {
      expectNodeName: '#import'
    })
    this.nodeName = tmp.nodeName
    var list = tmp.condition.split(',')
    this.importPath = list[0] || ''
    this.importPath = this.importPath.slice(1, this.importPath.length - 1)
    this.importArgs = []
    for (var i = 1, len = list.length; i < len; i++) {
      var str = list[i] || ''
      this.importArgs.push(str.trim())
    }
    if (!this.importArgs.length) {
      this.importArgs.push('it')
    }
  }
  deliverCreate () {
    var re = []
    re.push(worker.createImport({
      id: this.getId(),
      parentId: this.getParentId(),
      isRoot: this.checkRoot(),
      path: this.importPath
    }))
    return re
  }
  deliverUpdate () {
    var re = []
    re.push(worker.updateImport({
      id: this.getId(),
      args: this.importArgs
    }))
    return re
  }
}
export default ImportNode
