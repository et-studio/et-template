'use strict'

import Basic from './basic'
import conditionParser from '../parsers/condition'

var NAME_SPACE = 'import'
var NODE_NAME = `#${NAME_SPACE}`
var PARAMETER_SPLIT = ' from '

class ImportNode extends Basic {
  constructor (origin, options) {
    super(origin, options)

    this.namespace = NAME_SPACE
    this.nodeName = NODE_NAME
  }
  parse (source) {
    var tmp = conditionParser.parse(source, {expectNodeName: NODE_NAME})
    var list = tmp.condition.split(PARAMETER_SPLIT)

    var name = (list[0] || '').trim()
    var path = (list[1] || '').trim()

    var isSingleQuotation = path[0] === '\'' && path[path.length - 1] === '\''
    var isDoubleQuotation = path[0] === '"' && path[path.length - 1] === '"'
    if (isSingleQuotation || isDoubleQuotation) {
      path = path.slice(1, path.length - 1)
    }

    this.importPath = path
    this.importName = name
  }

  deliverDependencies () {
    if (this.importPath && this.importName) {
      return [{
        name: this.importName,
        path: this.importPath
      }]
    } else {
      return []
    }
  }
}
export default ImportNode
