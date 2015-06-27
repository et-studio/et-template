'use strict'

var formatParser = require('./parsers/format')
var esformatter = require('esformatter')

class Formatter {
  constructor (options = {}) {
    this.options = options
  }
  format (str) {
    str = formatParser.parse(str)
    return esformatter.format(str, this.options)
  }
}

module.exports = Formatter
