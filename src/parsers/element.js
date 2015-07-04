'use strict'

import Parser from './parser'
import Machine from './machine'

// @tableStart: element
var elementTableOptions = {
      states: ['start', 'name', 'scan', 'key', 'valueStart', 'value', 'value\'', 'value\"', '_str', 'valueStr', 'end'],
      symbols: ['<', '>', '\\\"', '\"', '\\\'', '\'', '=', ' ', '\r', '\n', '{{', '}}'],
      table: [
      {'0': 'start', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '', '-1': 'name'},
{'0': '', '1': 'end', '2': '', '3': '', '4': '', '5': '', '6': '', '7': 'scan', '8': 'scan', '9': 'scan', '10': '', '11': '', '-1': 'name'},
{'0': '', '1': 'end', '2': '', '3': '', '4': '', '5': '', '6': 'valueStart', '7': 'scan', '8': 'scan', '9': 'scan', '10': '', '11': '', '-1': 'key'},
{'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': 'valueStart', '7': '', '8': '', '9': '', '10': '', '11': '', '-1': 'key'},
{'0': '', '1': '', '2': '', '3': 'value\"', '4': '', '5': 'value\'', '6': '', '7': 'valueStart', '8': 'valueStart', '9': 'valueStart', '10': 'valueStr', '11': '', '-1': 'value'},
{'0': 'value', '1': 'end', '2': 'value', '3': 'value', '4': 'value', '5': 'value', '6': 'value', '7': 'scan', '8': 'scan', '9': 'scan', '10': '_str', '11': 'value', '-1': 'value'},
{'0': 'value\'', '1': 'value\'', '2': 'value\'', '3': 'value\'', '4': 'value\'', '5': 'scan', '6': 'value\'', '7': 'value\'', '8': 'value\'', '9': 'value\'', '10': '_str', '11': 'value\'', '-1': 'value\''},
{'0': 'value\"', '1': 'value\"', '2': 'value\"', '3': 'scan', '4': 'value\"', '5': 'value\"', '6': 'value\"', '7': 'value\"', '8': 'value\"', '9': 'value\"', '10': '_str', '11': 'value\"', '-1': 'value\"'},
{'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '_last', '-1': ''},
{'0': 'valueStr', '1': 'valueStr', '2': 'valueStr', '3': 'valueStr', '4': 'valueStr', '5': 'valueStr', '6': 'valueStr', '7': 'valueStr', '8': 'valueStr', '9': 'valueStr', '10': 'valueStr', '11': 'value', '-1': 'valueStr'},
{'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '', '-1': ''}
    ]
    }
// @tableEnd
var elementMachine = new Machine(elementTableOptions)

class ElementParser extends Parser {
  parse (source, options) {
    this.set('element', source, options)

    var _this = this
    var lastState

    var attrs = []
    var attrKey = ''
    var attrValue = ''
    var str = ''
    var nodeName = ''
    elementMachine.each(source, (state, token) => {
      lastState = state
      switch (state) {
        case 'start':
        case 'end':
          break
        case 'name':
          nodeName += token
          break
        case 'scan':
          if (attrKey) {
            attrs.push({
              key: attrKey
            })
            attrKey = ''
          }
          if (attrValue) {
            var attr = attrs.pop()
            if (!attr || !attr.key || attr.value) {
              _this.throwError()
            }
            attr.value = attrValue
            attrs.push(attr)
            attrValue = ''
          }
          break
        case 'key':
          attrKey += token
          break
        case 'valueStart':
          if (attrKey) {
            attrs.push({
              key: attrKey
            })
            attrKey = ''
          }
          break
        case 'value':
          if (str) {
            attrValue += str
            str = ''
          }
          attrValue += token
          break
        case "value'":
          if (str) {
            attrValue += str
            str = ''
          }
          attrValue += token
          if (attrValue.indexOf("'") === 0) {
            attrValue = attrValue.substr(1)
          }
          break
        case 'value"':
          if (str) {
            attrValue += str
            str = ''
          }
          attrValue += token
          if (attrValue.indexOf('"') === 0) {
            attrValue = attrValue.substr(1)
          }
          break
        case 'valueStr':
        case '_str':
          str += token
          break
        default:
          _this.throwError(state)
      }
    })
    if (lastState !== 'end') {
      this.throwError()
    }
    if (attrKey) {
      attrs.push({
        key: attrKey
      })
      attrKey = ''
    }
    if (attrValue) {
      var attr = attrs.pop()
      if (!attr || !attr.key || attr.value) {
        this.throwError()
      }
      attr.value = attrValue
      attrs.push(attr)
    }

    var attrMap = {}
    attrs.forEach((attr) => {
      if (!attr.key) {
        this.throwError()
      }
      attrMap[attr.key] = attr.value || ''
    })

    return {
      nodeName: nodeName.toUpperCase(),
      attributes: attrMap
    }
  }
}

export default new ElementParser()
