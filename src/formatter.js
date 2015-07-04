'use strict'

import formatParser from './parsers/format'
import esformatter from 'esformatter'

class Formatter {
  constructor (options = {}) {
    this.options = options
  }
  format (str, options = {}) {
    str = formatParser.parse(str)
    str = esformatter.format(str, this.options)
    switch (this.options.modules) {
      case 'cmd':
        str = this.wrapCMD(str)
        break
      case 'amd':
        str = this.wrapAMD(str, options.moduleId, options.moduleIds)
        break
      case 'global':
        str = this.wrapGlobal(str, options.moduleId)
        break
    }
    return str
  }
  wrapCMD (str) {
    return `define(function(require, exports, module){
      ${str}
    });`
  }
  wrapAMD (str, moduleId = 'Template', moduleIds = []) {
    var ids = moduleIds.map((item) => {
      return `'${item}'`
    })
    return `define('${moduleId}', [${ids.join(',')}], function([${moduleIds.join(',')}]){
      var module = {};
      ${str}
      return module.exports;
    });`
  }
  wrapGlobal (str, moduleId = 'Template') {
    return `;(function(global){
      var module = {};
      ${str}
      global.${moduleId} = module.exports;
    })(window);`
  }
}

export default Formatter
