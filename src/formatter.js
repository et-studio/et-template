'use strict'

import formatParser from './parsers/format'

var LINE_SPLIT = '\n'

class Formatter {
  format (content, options = {}) {
    content = formatParser.parse(content)
    content = this.removeComments(content)
    return content
  }
  removeComments (content) {
    var list = content.split(LINE_SPLIT)
    var results = []
    for (var i = 0, len = list.length; i < len; i++) {
      var item = list[i].trim()
      if (!item.startsWith('//')) results.push(item)
    }
    return results.join(LINE_SPLIT)
  }
}

export default Formatter
