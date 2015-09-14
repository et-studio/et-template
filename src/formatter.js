'use strict'

import formatParser from './parsers/format'
import worker from './worker'

var DEFAULT_TEMPLATE_ID = 'Template'

class Formatter {
  constructor (options = {}) {
    this.options = options
  }
  format (content, options = {}) {
    content = formatParser.parse(content)
    return this.wrap(content, this.options.modules, options)
  }
  wrap (content, modules, options) {
    var it = {
      content: content,
      moduleId: options.moduleId || DEFAULT_TEMPLATE_ID,
      moduleIds: options.moduleIds || []
    }
    switch (modules) {
      case 'cmd':
        return worker.format_cmd(it)
      case 'amd':
        return worker.format_amd(it)
      case 'global':
        return worker.format_global(it)
    }
    return content
  }
}

export default Formatter
