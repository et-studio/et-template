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
// @tableStart: pipe
var pipeTableOptions = {
  states: ['expression', 'pipe', 'pipeEx', '_str1', '_str2', '_str3'],
  symbols: [' | ', ',', '\'', '`', '"', '\\\'', '\\\`', '\\\"'],
  table: [
    {'0': 'pipe', '1': 'expression', '2': '_str1', '3': '_str2', '4': '_str3', '5': 'expression', '6': 'expression', '7': 'expression', '-1': 'expression'},
    {'0': 'pipe', '1': '', '2': '_str1', '3': '_str2', '4': '_str3', '5': 'pipeEx', '6': 'pipeEx', '7': 'pipeEx', '-1': 'pipeEx'},
    {'0': 'pipe', '1': 'split:pipeEx', '2': '_str1', '3': '_str2', '4': '_str3', '5': 'pipeEx', '6': 'pipeEx', '7': 'pipeEx', '-1': 'pipeEx'},
    {'0': '', '1': '', '2': '_last', '3': '', '4': '', '5': '', '6': '', '7': '', '-1': ''},
    {'0': '', '1': '', '2': '', '3': '_last', '4': '', '5': '', '6': '', '7': '', '-1': ''},
    {'0': '', '1': '', '2': '', '3': '', '4': '_last', '5': '', '6': '', '7': '', '-1': ''}
  ]
}
// @tableEnd
var valueMachine = new Machine(valueTableOptions)
var valueIfMatchine = new Machine(valueIfTableOptions)
var pipeMatchine = new Machine(pipeTableOptions)

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

    var lastState = 'text'
    valueMachine.each(str, (state, token) => {
      lastState = state
      switch (state) {
        case 'text':
          this.pushExpression(re, expression)
          this.pushIf(re, ifCondition)
          expression = ''
          ifCondition = ''
          break
        case 'exStart':
        case 'ifStart':
          this.pushText(re, text)
          this.pushExpression(re, expression)
          this.pushIf(re, ifCondition)
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
          this.throwError(state)
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

    var valueExprssion = ''
    var pipes = []
    var tmp = ''
    pipeMatchine.each(str, (state, token) => {
      switch (state) {
        case '_str1':
        case '_str2':
        case '_str3':
          tmp += token
          break
        case 'expression':
          valueExprssion += tmp
          valueExprssion += token
          tmp = ''
          break
        case 'pipe':
          if (!pipes.length) {
            valueExprssion += tmp
            tmp = ''
          } else {
            this.addStringToMatrix(pipes, tmp)
            tmp = ''
          }
          pipes.push([''])
          break
        case 'pipeEx':
          this.addStringToMatrix(pipes, tmp, token)
          tmp = ''
          break
        case 'split':
          this.addStringToMatrix(pipes, tmp)
          tmp = ''
          pipes[pipes.length - 1].push('')
          break
        default:
          this.throwError(state)
      }
    })
    if (tmp) {
      if (pipes.length) {
        var saved = pipes[pipes.length - 1].pop()
        saved += tmp
        pipes[pipes.length - 1].push(saved)
      } else {
        valueExprssion += tmp
      }
    }

    pipes.map((list) => {
      var method = list[0] || ''
      var args = list.slice(1).map(item => item.trim())
      args = _.clearArraySpace(args)

      if (!method.length) {
        // do nothing
      } else if (args.length) {
        valueExprssion = `${method}(${valueExprssion}, ${args.join(', ')})`
      } else {
        valueExprssion = `${method}(${valueExprssion})`
      }
    })

    obj.list.push(`(${valueExprssion})`)
    obj.isErractic = true
  }
  addStringToMatrix (matrix, ...strings) {
    var list = matrix.pop() || []
    var last = list.pop() || ''
    last += strings.join('')
    list.push(last)
    matrix.push(list)
  }
  pushIf (obj, str) {
    if (!str) return false

    var list = []
    var current = {
      type: 'if',
      condition: '',
      content: ''
    }
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
          this.throwError(state)
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
