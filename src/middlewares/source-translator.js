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
      var source = node.source.trim()
      node.source = this.translateSource(source)
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
}

export default new MiddlewareSourceTranslator()
