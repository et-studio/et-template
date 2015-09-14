'use strict'

import _ from '../util'

var STATE_BACK_MARK = '_last'
var STATE_ALL_MATCH = '*'
var STATE_SPLIT = ':'
var STATE_CHILD_REG = /^_/

class Machine {
  constructor (options = {}) {
    this.options = options
    this.states = options.states || []
    this.symbols = options.symbols || []
    this.table = options.table || []
    this.startState = options.startState || this.states[0]
  }
  getTokenSet (str, index) {
    var symbols = this.symbols
    var char = str[index]
    var token = char
    var symbolIndex = -1

    _.each(symbols, (symbol, i) => {
      if (symbol && typeof symbol.test === 'function') {
        if (symbol.test(char)) {
          token = char
          symbolIndex = i
          return false
        }
      } else if (symbol && symbol.length) {
        var tmp = str.substr(index, symbol.length)
        if (tmp === symbol) {
          token = symbol
          symbolIndex = i
          return false
        }
      }
    })

    return {token: token, index: symbolIndex}
  }
  switchState (currentState, symbolIndex, stateStack) {
    var stateIndex = this.states.indexOf(currentState)
    var map = this.table[stateIndex]

    var state = map[symbolIndex]
    if (!state) state = map[STATE_ALL_MATCH] || ''

    var index = state.indexOf(STATE_SPLIT)
    if (index < 0) index = state.length

    var prevState = state.substring(0, index)
    var nextState = state.substring(index + 1) || prevState
    var isCurrentAtLoop = STATE_CHILD_REG.test(currentState)

    if (STATE_CHILD_REG.test(nextState) && nextState !== STATE_BACK_MARK) {
      stateStack.push(currentState)
    }

    if ((isCurrentAtLoop && !prevState) || prevState === STATE_BACK_MARK) {
      prevState = currentState
    }

    if (isCurrentAtLoop && !nextState) {
      nextState = currentState
    } else if (nextState === STATE_BACK_MARK) {
      nextState = stateStack.pop() || ''
    }

    return {
      prevState: prevState,
      nextState: nextState
    }
  }
  each (str, callback) {
    if (!str) return

    var currentState = this.startState
    var stateStack = []
    for (var i = 0, len = str.length; i < len;) {
      var tokenSet = this.getTokenSet(str, i)
      var stateSet = this.switchState(currentState, tokenSet.index, stateStack)
      var token = tokenSet.token

      var prevState = stateSet.prevState
      var nextState = stateSet.nextState
      currentState = callback(prevState, token, i) || nextState
      i += token.length
    }
  }
}

export default Machine
