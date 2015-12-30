'use strict'

import Parser from './parser'
import Machine from './machine'

// @tableStart: condition
var conditionTableOptions = {
  states: ['name', 'condition'],
  symbols: [/\s/],
  table: [
    {'0': 'condition', '-1': 'name'},
    {'0': 'condition', '-1': 'condition'}
  ]
}
// @tableEnd

var conditionMachine = new Machine(conditionTableOptions)
var CONDITION_REG = /^\[[\s\S]*\]$/

class ConditionParser extends Parser {
  parse (source, options = {}) {
    var expectNodeName = options.expectNodeName
    this.set(expectNodeName, source, options)

    if (!CONDITION_REG.test(source)) {
      this.throwError('Wrong condition source specification.')
    }

    var tag = ''
    var nodeName = ''
    var condition = ''
    conditionMachine.each(source.substr(1, source.length - 2), (state, token) => {
      switch (state) {
        case 'name':
          nodeName += token
          break
        case 'condition':
          condition += token
          break
        default:
          this.throwError(state)
      }
    })
    if (expectNodeName && nodeName.toLowerCase() !== expectNodeName) {
      this.throwError()
    }

    if (nodeName === '#elseif') {
      tag = 'else if'
    } else {
      tag = nodeName.substr(1)
    }

    return {
      tag: tag,
      nodeName: nodeName,
      condition: condition.trim()
    }
  }
}

export default new ConditionParser()
