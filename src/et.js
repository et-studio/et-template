'use strict'

import _ from './util'
import middlewareGetter from './middlewares/middleware-getter'

var DEFAULTS = {
  compiledTemplate: null, // ['dot', null]
  modules: 'common', // ['common', 'cmd', 'amd', 'global', 'angular']
  dependencyName: '_dep',
  dependencyPath: 'et-dependency',
  modelType: 'event' // ['model', 'object', 'event']
}

var DEFAULT_COMPILE_OPTIONS = {
  moduleId: 'Template'
}

var DEFAULT_MIDDLEWARES = [
  'origin-parser',
  'source-translator',
  'node-creator',
  'attributes',
  'rebuilder',
  'ng-rebuilder',
  'checker',
  'compiler',
  'formatter'
]

class ET {
  constructor (options) {
    this.options = _.extend({}, DEFAULTS, options)
  }
  compile (str, runtimeOptions) {
    var options = _.extend({}, DEFAULT_COMPILE_OPTIONS, runtimeOptions)
    var middlewares = []
    switch (this.options.compiledTemplate) {
      case 'dot':
        middlewares = this.getMiddlewares(['dot'])
        break
      default:
        middlewares = this.getMiddlewares([])
    }
    return this.runMiddlewares(str, middlewares, options)
  }
  runMiddlewares (str, middlewares, runtimeOptions) {
    var options = _.extend({}, this.options, runtimeOptions)
    var result = str
    middlewares.map((name) => {
      var middleware = middlewareGetter.get(name)
      result = middleware.run(result, options)
    })
    return result
  }
  getMiddlewares (array = []) {
    return _.concat(array, DEFAULT_MIDDLEWARES)
  }
}

export default ET
