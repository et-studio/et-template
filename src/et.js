'use strict'

import Parser from './parser'
import Compiler from './compiler'
import Formatter from './formatter'

class ET {
  constructor (options = {}) {
    this.options = options
    this.parser = new Parser(options)
    this.compiler = new Compiler(options)
    this.formatter = new Formatter(options)
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
