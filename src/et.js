'use strict'

import _ from './util'
import Parser from './parser'
import Compiler from './compiler'
import Formatter from './formatter'

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

class ET {
  constructor (options) {
    options = _.extend({}, DEFAULTS, options)
    this.options = options
    this.parser = new Parser(options)
    this.compiler = new Compiler(options)
    this.formatter = new Formatter(options)
  }
  compile (str, compileOptions) {
    compileOptions = _.extend({}, DEFAULT_COMPILE_OPTIONS, compileOptions)
    switch (this.options.compiledTemplate) {
      case 'dot': return this.compileDot(str, compileOptions)
      default: return this.compileET(str, compileOptions)
    }
  }
  compileET (str, compileOptions) {
    var dom = this.parser.parse(str)
    var result = this.compiler.compile(dom, compileOptions)
    return this.formatter.format(result)
  }
  compileDot (str, compileOptions) {
    var dom = this.parser.parseDot(str)
    var result = this.compiler.compile(dom, compileOptions)
    return this.formatter.format(result)
  }
}

export default ET
