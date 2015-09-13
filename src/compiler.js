'use strict'

import _ from './util'
import worker from './worker'

class Compiler {
  constructor (options = {}) {
    this.options = options
  }
  pickData (root) {
    var re = {
      dependency: this.options.dependency,
      modelType: this.options.modelType,
      requires: root.getAllRequire(),
      templateName: root.getTemplateName(),
      newDoms: []
    }
    _.each(root.getNewTemplateDoms(), (dom) => {
      re.newDoms.push({
        templateName: dom.getTemplateName(),
        createList: dom.getChildrenCreate(),
        appendList: dom.getChildrenAppend(),
        updateList: dom.getChildrenUpdate(),
        args: dom.getArguments()
      })
    })
    return re
  }
  compile (dom) {
    var it = this.pickData(dom)
    return worker.template(it)
  }
}

export default Compiler
