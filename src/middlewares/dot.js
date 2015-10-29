'use strict'

import Basic from './basic-middleware'
import dotParser from '../parsers/dot'

class MiddlewareDot extends Basic {
  run (str, options) {
    return dotParser.parse(str)
  }
}
export default new MiddlewareDot()
