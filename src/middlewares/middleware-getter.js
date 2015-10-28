'use strict'

import attributes from './attributes'
import checker from './checker'
import compiler from './compiler'
import dot from './dot'
import formatter from './formatter'
import rebuilder from './rebuilder'
import ngRebuilder from './ng-rebuilder'
import nodeCreator from './node-creator'
import originParser from './origin-parser'
import sourceTrasnlator from './source-translator'

var MIDDLEWARES = {
  'attributes': attributes,
  'checker': checker,
  'compiler': compiler,
  'dot': dot,
  'formatter': formatter,
  'rebuilder': rebuilder,
  'ng-rebuilder': ngRebuilder,
  'node-creator': nodeCreator,
  'origin-parser': originParser,
  'source-translator': sourceTrasnlator
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
