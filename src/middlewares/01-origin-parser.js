'use strict'

import Basic from './basic-middleware'
import originParser from '../parsers/origin'

class MiddlewareParser extends Basic {
  run (str, options) {
    return originParser.parse(str)
  }
}
export default new MiddlewareParser()
