'use strict'

import Parser from './parser'
import Machine from './machine'

// @tableStart: condition
var conditionTableOptions = {
  states: ['start', 'name', 'condition'],
  symbols: ['[', ' ', '\r', '\n'],
  table: [
    {'0': 'start', '1': '', '2': '', '3': '', '-1': 'name'},
    {'0': '', '1': 'condition', '2': 'condition', '3': 'condition', '-1': 'name'},
    {'0': 'condition', '1': 'condition', '2': 'condition', '3': 'condition', '-1': 'condition'}
  ]
}
// @tableEnd

var conditionMachine = new Machine(conditionTableOptions)

class ConditionParser extends Parser {
  parse (source, options = {}) {
    var expectNodeName = options.expectNodeName
    this.set(expectNodeName, source, options)

    var _this = this
    var tag = ''
    var nodeName = ''
    var condition = ''
    var lastToken = ''
    conditionMachine.each(source, (state, token) => {
      lastToken = token
      switch (state) {
        case 'start':
          break
        case 'name':
          nodeName += token
          break
        case 'condition':
          condition += token
          break
        default:
          _this.throwError(state)
      }
    })
    if (lastToken !== ']') {
      this.throwError()
    }
    if (expectNodeName && nodeName.toLowerCase() !== expectNodeName) {
      this.throwError()
    }
    if (condition) {
      condition = condition.substr(0, condition.length - 1)
      condition = condition.trim()
    } else {
      nodeName = nodeName.substr(0, nodeName.length - 1)
    }

    if (nodeName === '#elseif') {
      tag = 'else if'
    } else {
      tag = nodeName.substr(1)
    }

    return {
      tag: tag,
      nodeName: nodeName,
      condition: condition
    }
  }
}

export default new ConditionParser()
