'use strict'

import Parser from './parser'
import Machine from './machine'

// @tableStart: comment
var commentTableOptions = {
      states: ['start', 'header', 'text', 'end'],
      symbols: ['<!--', '-->'],
      table: [
      {'0': 'header', '1': '', '-1': ''},
{'0': '', '1': '', '-1': 'text'},
{'0': 'text', '1': 'end', '-1': 'text'},
{'0': '', '1': '', '-1': ''}
    ]
    }
// @tableEnd

var commentMachine = new Machine(commentTableOptions)

class CommentParser extends Parser {
  parse (source, options) {
    this.set('comment', source, options)
    var _this = this
    var text = ''
    commentMachine.each(source, (state, token) => {
      switch (state) {
        case 'header':
        case 'end':
          break
        case 'text':
          text += token
          break
        default:
          _this.throwError(state)
      }
    })

    return text
  }
}

export default new CommentParser()
