'use strict'

import NodeElement from './element'
import NodeText from './text'
import NodeComment from './comment'
import NodeBasic from './basic'
import NodeIf from './if'
import NodeElseif from './elseif'
import NodeElse from './else'
import NodeFor from './for'
import NodeHtml from './html'
import NodeImport from './import'

var nodes = {
  '_element': NodeElement,
  '_text': NodeText,
  '_comment': NodeComment,
  '_base': NodeBasic,
  '#if': NodeIf,
  '#elseif': NodeElseif,
  '#else': NodeElse,
  '#for': NodeFor,
  '#html': NodeHtml,
  '#import': NodeImport
}

class Factory {
  /**
   * options
   * - index
   * - parent
   * - previous
   * - expressions
   * - lineNumber
   */
  create (source, options = {}) {
    var parent = options.parent
    var previous = options.previous

    var Constructor = this.findConstuctor(source)
    var node = new Constructor(source, options)

    if (parent) {
      parent.children.push(node)
    }
    if (previous) {
      previous.next = node
    }
    return node
  }
  getNodeName (source) {
    if (!source) {
      return ''
    } else if (source.indexOf('<!--') === 0) {
      return '!--'
    } else if (source.indexOf('<') === 0) {
      var regHtml = /^<(\S*)[ >]/
      return regHtml.exec(source)[1] || ''
    } else if (source.indexOf('[') === 0) {
      var regET = /^\[(\S*)[ \]]/
      return regET.exec(source)[1] || ''
    }
    return ''
  }
  findConstuctor (source) {
    var nodeName = this.getNodeName(source).toLowerCase()
    var Constructor = null

    if (!source) {
      Constructor = nodes._base
    } else if (!nodeName) {
      Constructor = nodes._text
    } else if (nodeName === '!--') {
      Constructor = nodes._comment
    } else if (nodeName.indexOf('#') === 0) {
      Constructor = nodes[nodeName]
    } else {
      Constructor = nodes._element
    }

    if (!Constructor) {
      Constructor = nodes._base
    }
    return Constructor
  }
}

export default new Factory()
