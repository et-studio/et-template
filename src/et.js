'use strict'

import _ from './util'
import middle_attributes from './middlewares/attributes'
import middle_checker from './middlewares/checker'
import middle_compiler from './middlewares/compiler'
import middle_dot from './middlewares/dot'
import middle_formatter from './middlewares/formatter'
import middle_parser from './middlewares/parser'
import middle_rebuilder from './middlewares/rebuilder'
import middle_ngRebuilder from './middlewares/ng-rebuilder'

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
  middle_parser,
  middle_attributes,
  middle_rebuilder,
  middle_ngRebuilder,
  middle_checker,
  middle_compiler,
  middle_formatter
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
        middlewares = this.getMiddlewares([middle_dot])
        break
      default:
        middlewares = this.getMiddlewares([])
    }
    return this.runMiddlewares(str, middlewares, options)
  } 
  runMiddlewares (str, middlewares, runtimeOptions) {
    var options = _.extend({}, this.options, runtimeOptions)
    var result = str
    middlewares.map((middleware) => {
      result = middleware.run(result, options)
    })
    return result
  }
  getMiddlewares (array = []) {
    return _.concat(array, DEFAULT_MIDDLEWARES)
  }
}

export default ET
