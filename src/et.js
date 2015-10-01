'use strict'

import _ from './util'
import Parser from './parser'
import Compiler from './compiler'
import Formatter from './formatter'

var DEFAULTS = {
  modules: 'common', // ['common', 'cmd', 'amd', 'global', 'angular']
  dependency: 'et-dependency',
  modelType: 'event', // ['model', 'object', 'event']
  moduleId: 'Template',
  angularModuleName: 'moduleName'
}

class ET {
  constructor (initOptions = {}) {
    this.initOptions = _.extend({}, DEFAULTS, initOptions)
    this.parser = new Parser(this.initOptions)
    this.compiler = new Compiler(this.initOptions)
    this.formatter = new Formatter(this.initOptions)
  }
  compile (str, compileOptions) {
    var options = _.extend({}, this.initOptions, compileOptions)
    var dom = this.parser.parse(str, options)
    var result = this.compiler.compile(dom, options)
    return this.formatter.format(result, options)
  }
  compileDot (str, compileOptions) {
    var options = _.extend({}, this.initOptions, compileOptions)
    var dom = this.parser.parseDot(str, options)
    var result = this.compiler.compile(dom, options)
    return this.formatter.format(result, options)
  }
}

export default ET
