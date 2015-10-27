'use strict'

import Basic from './basic-middleware'

class MiddlewareNgRebuilder extends Basic {
  run (last, options) {
    return last
  }
}
export default new MiddlewareNgRebuilder()
