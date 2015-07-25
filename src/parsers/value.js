'use strict'

import Parser from './parser'
import Machine from './machine'
import _ from '../util'

// @tableStart: value
var valueTableOptions = {
      states: ['text', 'exStart', 'exBody', 'exEnd', 'ifStart', 'ifBody', 'ifEnd'],
      symbols: ['{{', '}}', '[#if ', '[/#if]'],
      table: [
      {'0': 'exStart', '1': 'text', '2': 'ifStart', '3': '', '-1': 'text'},
{'0': 'exBody', '1': 'exEnd', '2': '', '3': '', '-1': 'exBody'},
{'0': 'exBody', '1': 'exEnd', '2': '', '3': '', '-1': 'exBody'},
{'0': 'text', '1': 'text', '2': 'ifStart', '3': '', '-1': 'text'},
{'0': 'ifBody', '1': 'ifBody', '2': '', '3': 'ifBody', '-1': 'ifBody'},
{'0': 'ifBody', '1': 'ifBody', '2': '', '3': 'ifEnd', '-1': 'ifBody'},
{'0': 'start', '1': 'text', '2': 'ifStart', '3': 'text', '-1': 'text'}
    ]
    }
// @tableStart: valueIf
var valueIfTableOptions = {
      states: ['start', 'ifCondition', 'endContition', 'ifContent', 'elseif', 'else', 'elseContent', '_value[', 'end'],
      symbols: ['[#if ', '[#elseif ', '[#else]', '[/#if]', ']', '['],
      table: [
      {'0': 'start', '1': '', '2': '', '3': '', '4': '', '5': '', '-1': 'ifCondition'},
{'0': '', '1': '', '2': '', '3': '', '4': 'endContition', '5': '_value[', '-1': 'ifCondition'},
{'0': '', '1': 'elseif', '2': 'else', '3': 'end', '4': 'ifContent', '5': 'ifContent', '-1': 'ifContent'},
{'0': '', '1': 'elseif', '2': 'else', '3': 'end', '4': 'ifContent', '5': 'ifContent', '-1': 'ifContent'},
{'0': '', '1': '', '2': '', '3': '', '4': 'ifContent', '5': '', '-1': 'ifCondition'},
{'0': '', '1': '', '2': '', '3': 'end', '4': 'elseContent', '5': 'elseContent', '-1': 'elseContent'},
{'0': '', '1': '', '2': '', '3': 'end', '4': 'elseContent', '5': 'elseContent', '-1': 'elseContent'},
{'0': '', '1': '', '2': '', '3': '', '4': '_last', '5': '_value[', '-1': ''},
{'0': '', '1': '', '2': '', '3': '', '4': '', '5': '', '-1': ''}
    ]
    }
// @tableEnd
var valueMachine = new Machine(valueTableOptions)
var valueIfMatchine = new Machine(valueIfTableOptions)

class ValueParser extends Parser {
  parse (source, options) {
    return this.parseToObject(source, options).content
  }
  isErratic (source, options) {
    return this.parseToObject(source, options).isErractic
  }
  parseToObject (str, options) {
    this.set('value', str, options)
    var re = {list: [], isErratic: false, content: `''`}

    var text = ''
    var expression = ''
    var ifCondition = ''

    var _this = this
    var lastState = 'text'
    valueMachine.each(str, (state, token) => {
      lastState = state
      switch (state) {
        case 'text':
          _this.pushExpression(re, expression)
          _this.pushIf(re, ifCondition)
          expression = ''
          ifCondition = ''
          break
        case 'exStart':
        case 'ifStart':
          _this.pushText(re, text)
          _this.pushExpression(re, expression)
          _this.pushIf(re, ifCondition)
          text = ''
          expression = ''
          ifCondition = ''
      }
      switch (state) {
        case 'exEnd':
        case 'exStart':
          break
        case 'text':
          text += token
          break
        case 'exBody':
          expression += token
          break
        case 'ifStart':
        case 'ifBody':
        case 'ifEnd':
          ifCondition += token
          break
        default:
          _this.throwError(state)
      }
    })
    if (['text', 'exEnd', 'ifEnd'].indexOf(lastState) < 0) {
      this.throwError()
    }
    this.pushText(re, text)
    this.pushExpression(re, expression)
    this.pushIf(re, ifCondition)

    if (re.list.length) re.content = re.list.join(' + ')
    return re
  }
  pushText (obj, str) {
    if (str) {
      str = _.translateMarks(str)
      obj.list.push(`'${str}'`)
    }
  }
  pushExpression (obj, str) {
    if (!str) return

    obj.list.push(str)
    obj.isErractic = true
  }
  pushIf (obj, str) {
    if (!str) return false

    var list = []
    var current = {
      type: 'if',
      condition: '',
      content: ''
    }
    var _this = this
    valueIfMatchine.each(str, (state, token) => {
      switch (state) {
        case 'start':
          list.push(current)
          break
        case 'ifCondition':
        case '_value[':
          current.condition += token
          break
        case 'ifContent':
        case 'elseContent':
          current.content += token
          break
        case 'endContition':
          break
        case 'elseif':
          current = {
            type: 'elseif',
            condition: '',
            content: ''
          }
          list.push(current)
          break
        case 'else':
          current = {
            type: 'else',
            condition: '',
            content: ''
          }
          list.push(current)
          break
        case 'end':
          break
        default:
          _this.throwError(state)
      }
    })

    var parser = new ValueParser()
    var strings = list.map((item) => {
      var content = parser.parse(item.content)
      switch (item.type) {
        case 'if':
          return `if (${item.condition || ''}) {
            return ${content || ''}
          }`
        case 'elseif':
          return ` else if (${item.condition || ''}) {
            return ${content || ''}
          }`
        default:
          return ` else {
            return ${content || ''}
          }`
      }
    })

    obj.list.push(`(function () {
      ${strings.join('')}
      return ''
    })()`)
    obj.isErractic = true
  }
}

export default new ValueParser()
