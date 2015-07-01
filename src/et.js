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
  compile (str) {
    var dom = this.parser.parse(str)
    var result = this.compiler.compile(dom)
    return this.formatter.format(result)
  }
}

module.exports = ET
