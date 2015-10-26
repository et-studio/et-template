'use strict'

import _ from './util'

class Checker {
  check (node) {
    node.each(this.checkHandler.bind(this))
    return node
  }
  checkHandler (node) {
    switch (node.nodeName) {
      case '#html':
        this.checkHtml(node)
        break
    }
    // if (node.expressions) this.checkExpressions(node, node.expressions)
  }
  checkExpressions (node, expressions) {
    _.each(expressions, (expressionNode) => {
      if (expressionNode.nodeName !== '#if') {
        this.throwError(node, 'The attributes expression just support if, else and elseif.')
      }

      var lastTag = 'if'
      _.each(expressionNode.children, (childNode) => {
        var isET = childNode.nodeType === 'ET'
        var isElse = childNode.nodeName === '#else'
        var isElseIf = childNode.nodeName === '#elseif'

        if (isET && !isElseIf && !isElse) {
          this.throwError(node, 'The attributes expression just support if, else and elseif.')
        } else if (isElseIf && lastTag === 'else') {
          this.throwError(node, 'The elseif node shouldn\'t show after else.')
        } else if (isElseIf) {
          lastTag = 'elseif'
        } else if (isElse) {
          lastTag = 'else'
        } else {
          lastTag = ''
        }
      })
    })
  }
  checkHtml (node) {
    if (!node.parent) {
      this.throwError(node, 'html node need a parent')
    }
    if (node.parent.nodeType !== 1) {
      this.throwError(node, 'the parent of html node should be element node')
    }
    if (node.parent.children.length > 1) {
      this.throwError(node, 'html node should not has siblings')
    }
  }
  throwError (node, message) {
    throw new Error(message)
  }
}

export default new Checker()
