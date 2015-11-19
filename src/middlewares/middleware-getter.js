'use strict'

import dot from './00-dot'
import originParser from './01-origin-parser'
import sourceTrasnlator from './02-source-translator'
import nodeCreator from './03-node-creator'
import attributes from './04-attributes'
import rebuilder from './05-rebuilder'
import ngRebuilder from './06-ng-rebuilder'
import checker from './07-checker'
import compiler from './08-compiler'
import formatter from './09-formatter'

var MIDDLEWARES = {
  'dot': dot,
  'origin-parser': originParser,
  'source-translator': sourceTrasnlator,
  'node-creator': nodeCreator,
  'attributes': attributes,
  'rebuilder': rebuilder,
  'ng-rebuilder': ngRebuilder,
  'checker': checker,
  'compiler': compiler,
  'formatter': formatter
}

class MiddlewareGetter {
  get (key) {
    var middleware = MIDDLEWARES[key]
    if (!middleware) {
      throw new Error(`not found middleware: ${key}`)
    }
    return middleware
  }
  getList (...arr) {
    var results = []
    arr.map((key) => {
      results.push(this.get(key))
    })
    return results
  }
}

export default new MiddlewareGetter()
