'use strict'

import Basic from './basic-middleware'

class MiddlewareAttributes extends Basic {
  run (last, options) {
    return last
  }
}
export default new MiddlewareAttributes()
