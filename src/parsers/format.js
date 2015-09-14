'use strict'

import Parser from './parser'
import Machine from './machine'
import _ from '../util'
import worker from '../worker'

// @tableStart: format
var formatTableOptions = {
  states: ['header', 'body', 'start', 'method', '_h1', '_h2', '_h3', '_str1', '_str2', '_str3'],
  symbols: [/\s/, '@.', '\\\'', '\\"', '\\`', '\'', '"', '`', '(', 'function', /\w/],
  table: [
    {'0': 'header', '1': 'header', '2': 'header', '3': 'header', '4': 'header', '5': '_h1', '6': '_h2', '7': '_h3', '8': 'header', '9': 'body', '10': 'header', '-1': 'header'},
    {'0': 'body', '1': 'start', '2': 'body', '3': 'body', '4': 'body', '5': '_str1', '6': '_str2', '7': '_str3', '8': 'body', '9': 'body', '10': 'body', '-1': 'body'},
    {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': 'method', '10': 'method', '-1': ''},
    {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': 'end:body', '9': 'method', '10': 'method', '-1': ''},
    {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '_last', '6': '', '7': '', '8': '', '9': '', '10': '', '-1': ''},
    {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '_last', '7': '', '8': '', '9': '', '10': '', '-1': ''},
    {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '_last', '8': '', '9': '', '10': '', '-1': ''},
    {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '_last', '6': '', '7': '', '8': '', '9': '', '10': '', '-1': ''},
    {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '_last', '7': '', '8': '', '9': '', '10': '', '-1': ''},
    {'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '_last', '8': '', '9': '', '10': '', '-1': ''}
  ]
}
// @tableEnd
var formatMachine = new Machine(formatTableOptions)

class FormatParser extends Parser {
  parse (str) {
    var it = this.parseData(str)
    return worker.format_tp(it)
  }
  parseData (str) {
    var header = ''
    var methods = []
    var body = ''

    var method = ''
    var _this = this
    formatMachine.each(str, (state, token) => {
      switch (state) {
        case 'header':
        case '_h1':
        case '_h2':
        case '_h3':
          header += token
          break
        case 'body':
        case '_str1':
        case '_str2':
        case '_str3':
          body += token
          break
        case 'start':
          method = ''
          break
        case 'method':
          method += token
          break
        case 'end':
          methods.push(method)
          body = `${body}_tp_${method}${token}`
          break
        default:
          console.log(state)
          _this.throwError(state)
      }
    })
    return {
      header: header,
      methods: _.uniq(methods),
      body: body
    }
  }
}

export default new FormatParser()
