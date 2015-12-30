'use strict'

import Parser from './parser'
import Machine from './machine'

// @tableStart: for
var forTableOptions = {
  states: ['start', 'header', 'headerEnd', 'itemName', 'itemEnd', 'indexName', 'indexEnd', 'exStart', 'expression'],
  symbols: ['[', ' in ', ' ', '\r', '\n', ',', ';'],
  table: [
    {'0': 'start', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '-1': 'header'},
    {'0': '', '1': '', '2': 'headerEnd', '3': 'headerEnd', '4': 'headerEnd', '5': '', '6': '', '-1': 'header'},
    {'0': '', '1': '', '2': 'headerEnd', '3': 'headerEnd', '4': 'headerEnd', '5': '', '6': '', '-1': 'itemName'},
    {'0': 'text', '1': 'exStart', '2': 'itemEnd', '3': 'itemEnd', '4': 'itemEnd', '5': 'itemEnd', '6': 'itemEnd', '-1': 'itemName'},
    {'0': '', '1': 'exStart', '2': 'itemEnd', '3': 'itemEnd', '4': 'itemEnd', '5': '', '6': '', '-1': 'indexName'},
    {'0': '', '1': 'exStart', '2': 'indexEnd', '3': 'indexEnd', '4': 'indexEnd', '5': 'indexEnd', '6': 'indexEnd', '-1': 'indexName'},
    {'0': '', '1': 'exStart', '2': 'indexEnd', '3': 'indexEnd', '4': 'indexEnd', '5': '', '6': '', '-1': ''},
    {'0': '', '1': '', '2': 'exStart', '3': 'exStart', '4': 'exStart', '5': '', '6': '', '-1': 'expression'},
    {'0': 'expression', '1': 'expression', '2': 'expression', '3': 'expression', '4': 'expression', '5': 'expression', '6': 'expression', '-1': 'expression'}
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
    forMachine.each(source, (state, token) => {
      lastToken = token
      switch (state) {
        case 'start':
        case 'headerEnd':
        case 'itemEnd':
        case 'indexEnd':
        case 'exStart':
          break
        case 'header':
          nodeName += token
          break
        case 'itemName':
          itemName += token
          break
        case 'indexName':
          indexName += token
          break
        case 'expression':
          expression += token
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
    expression = expression.substr(0, expression.length - 1).trim()

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
      expression: expression
    }
  }
}

export default new ForParser()
