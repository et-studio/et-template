'use strict'

var Parser = require('./parser')
var Compiler = require('./compiler')
var Formatter = require('./formatter')

class ET {
  constructor (options = {}) {
    this.options = options
    this.parser = new Parser(options.parser)
    this.compiler = new Compiler(options.compiler)
    this.formatter = new Formatter(options.formatter)
  }
  translate (str) {
    var dom = this.parse(str)
    var result = this.compile(dom)
    return this.format(result)
  }
  parse (str) {
    return this.parser.parse(str)
  }
  compile (dom) {
    return this.compiler.compile(dom)
  }
  format (str) {
    return this.formatter.format(str)
  }
}

module.exports = ET
