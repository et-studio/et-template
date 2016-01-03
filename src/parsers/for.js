'use strict'

import Parser from './parser'
import Machine from './machine'

// @tableStart: for
var forTableOptions = {
  states: ['start', 'header', 'item', 'index', 'expression', 'trackBy'],
  symbols: ['[', /\s/, /[,;]/, ' in ', ' track by '],
  table: [
    {'0': 'start', '1': '', '2': '', '3': '', '4': '', '-1': 'header'},
    {'0': '', '1': 'item', '2': '', '3': '', '4': '', '-1': 'header'},
    {'0': '', '1': 'item', '2': 'ignore:index', '3': 'ignore:expression', '4': '', '-1': 'item'},
    {'0': '', '1': 'index', '2': '', '3': 'ignore:expression', '4': '', '-1': 'index'},
    {'0': 'expression', '1': 'expression', '2': 'expression', '3': 'expression', '4': 'ignore:trackBy', '-1': 'expression'},
    {'0': 'trackBy', '1': 'trackBy', '2': 'trackBy', '3': 'trackBy', '4': 'trackBy', '-1': 'trackBy'}
  ]
}
// @tableEnd
var forMachine = new Machine(forTableOptions)

class ForParser extends Parser {
  parse (source, options) {
    this.set('#for', source, options)

    var nodeName = ''
    var itemName = ''
    var indexName = ''
    var expression = ''
    var lastToken = ''
    var trackBy = ''
    forMachine.each(source, (state, token) => {
      lastToken = token
      switch (state) {
        case 'start':
        case 'ignore':
          break
        case 'header':
          nodeName += token
          break
        case 'item':
          itemName += token
          break
        case 'index':
          indexName += token
          break
        case 'expression':
          expression += token
          break
        case 'trackBy':
          trackBy += token
          break
        default:
          this.throwError(state)
      }
    })
    if (lastToken !== ']') {
      this.throwError()
    }
    nodeName = nodeName.trim().toLowerCase()
    itemName = itemName.trim()
    indexName = indexName.trim()
    expression = expression.trim().replace(/\]$/, '')
    trackBy = trackBy.trim().replace(/\]$/, '')

    if (nodeName !== '#for') {
      this.throwError()
    }
    if (!itemName) {
      this.throwError()
    }
    if (!expression) {
      this.throwError()
    }

    return {
      nodeName: nodeName,
      itemName: itemName,
      indexName: indexName,
      expression: expression,
      trackBy: trackBy
    }
  }
}

export default new ForParser()
