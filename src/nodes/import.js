'use strict'

import Basic from './basic'
import conditionParser from '../parsers/condition'

var NAME_SPACE = 'import'
var NODE_NAME = `#${NAME_SPACE}`
var PARAMETER_SPLIT = ','

class ImportNode extends Basic {
  constructor (origin, options) {
    super(origin, options)

    this.namespace = NAME_SPACE
    this.nodeName = NODE_NAME
  }
  parse (source) {
    var tmp = conditionParser.parse(source, {expectNodeName: NODE_NAME})
    var list = tmp.condition.split(PARAMETER_SPLIT)

    var path = list[0] || ''
    var isSingleQuotation = path[0] === '\'' && path[path.length - 1] === '\''
    var isDoubleQuotation = path[0] === '"' && path[path.length - 1] === '"'
    if (isSingleQuotation || isDoubleQuotation) {
      path = path.slice(1, path.length - 1)
    }
    this.importPath = path

    var args = []
    for (var i = 1, len = list.length; i < len; i++) {
      var str = list[i] || ''
      str = str.trim()
      if (str) args.push(str)
    }
    // if (!args.length) args.push('it')
    this.importArgs = args
  }
  getPath () {
    return this.importPath
  }
  getArguments () {
    return this.importArgs
  }

  assembleWorkerData () {
    var it = this._workerData
    if (it) return it

    this._workerData = it = {
      id: this.getId(),
      lineId: this.getLineId(),
      parentId: this.getParentId(),
      args: this.getArguments(),
      path: this.getPath(),
      templateName: this.getTemplateName()
    }

    return it
  }
  deliverDependencies () {
    return [{
      name: this.getTemplateName(),
      path: this.getPath()
    }]
  }
}
export default ImportNode
