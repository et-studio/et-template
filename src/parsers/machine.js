'use strict'

import _ from '../util'

class Machine {
  constructor (options = {}) {
    this.options = options
    this.states = options.states || []
    this.symbols = options.symbols || []
    this.table = options.table || []
    this.startState = options.startState || this.states[0]
  }
  getToken (str, index) {
    var symbols = this.symbols
    var char = str[index]
    var token = ''
    _.each(symbols, (symbol) => {

      if (symbol && typeof symbol.test === 'function') {
        if (symbol.test(char)) {
          token = char
          return false
        }
      } else if (symbol && symbol.length) {
        var tmp = str.substr(index, symbol.length)
        if (tmp === symbol) {
          token = symbol
          return false
        }
      }
    })
    if (!token) {
      token = str[index]
    }
    return token
  }
  switchState (state, symbol) {
    var stateIndex = this.states.indexOf(state)
    var symbolIndex = this.symbols.indexOf(symbol)

    var map = this.table[stateIndex]
    var re = map[symbolIndex]
    if (!re) {
      re = map['*']
    }
    return re
  }
  each (str, callback) {
    if (!str) return

    var lastState = this.startState
    var stateStack = []
    for (var i = 0, len = str.length; i < len;) {
      var token = this.getToken(str, i)
      var state = this.switchState(lastState, token)

      if (lastState.indexOf('_') === 0 && !state) {
        state = lastState
      } else if (state && state !== '_last' && state.indexOf('_') === 0) {
        stateStack.push(lastState)
      }

      if (state === '_last') {
        lastState = callback(lastState, token, i) || stateStack.pop()
      } else {
        lastState = callback(state, token, i) || state
      }
      i += token.length
    }
  }
}

export default Machine
