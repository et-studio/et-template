'use strict'

class BasicParser {
  constructor (source, options) {
    this.name = 'basic'
    this.source = source
    this.rowNumber = 0
    this.colNumber = 0
  }
  set (name, source, options = {}) {
    this.name = name
    this.source = source
    this.rowNumber = options.rowNumber || 0
    this.colNumber = options.colNumber || 0
  }
  getErrorMessage (code) {
    return ''
  }
  throwError (code) {
    var source = this.source
    var message = this.getErrorMessage(code)
    throw new Error(`${message} ===> ${source}`)
  }
}

export default BasicParser
