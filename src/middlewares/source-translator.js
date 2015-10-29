'use strict'

import Basic from './basic-middleware'

var TRANSLATE_MAP = {
  '&quot;': '\\"',
  '&amp;': '\\&',
  '&lt;': '\\<',
  '&gt;': '\\>',
  '&nbsp;': ' '
}

class MiddlewareSourceTranslator extends Basic {
  run (origin, options) {
    origin.each((node) => {
      var nodeName = node.nodeName
      var source = node.source.trim()
      var header = node.header.trim()

      node.header = this.translateSource(header)
      node.source = this.translateSource(source)
      node.nodeType = this.getNodeType(nodeName, source)
    })
    return origin
  }
  translateSource (source) {
    source = source.trim().replace(/\s+/g, ' ')
    for (var key in TRANSLATE_MAP) {
      var value = TRANSLATE_MAP[key]
      source = source.replace(new RegExp(key, 'g'), value)
    }
    return source
  }
  getNodeType (nodeName, source) {
    if (nodeName.indexOf('#') === 0 || !source) {
      return 'ET'
    } else if (nodeName) {
      return 1
    } else {
      return 3
    }
  }
}

export default new MiddlewareSourceTranslator()
