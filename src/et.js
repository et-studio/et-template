'use strict'

import _ from './util'
import Parser from './parser'
import Compiler from './compiler'
import Formatter from './formatter'

var DEFAULTS = {
  dependency: 'et-dependency'
}

class ET {
  constructor (options = {}) {
    this.options = _.extend({}, DEFAULTS, options)
    this.parser = new Parser(this.options)
    this.compiler = new Compiler(this.options)
    this.formatter = new Formatter(this.options)
  }
  compile (str) {
    var dom = this.parser.parse(str)
    var result = this.compiler.compile(dom)
    return this.formatter.format(result)
  }
  compileDot (str) {
    var dom = this.parser.parseDot(str)
    var result = this.compiler.compile(dom)
    return this.formatter.format(result)
  }
}

export default ET
