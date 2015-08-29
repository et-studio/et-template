'use strict'

import _ from './util'
import worker from './worker'

class Compiler {
  constructor (options = {}) {
    this.options = options
  }
  pickData (root) {
    var newDoms = root.getNewTemplateDoms()
    var re = {
      templateName: root.getTemplateName(),
      hasFor: false,
      modelType: this.options.modelType,
      hasModelKey: false,
      newDoms: []
    }
    _.each(newDoms, (dom) => {
      if (dom.nodeName === '#for') {
        re.hasFor = true
      }
      re.hasModelKey = dom.checkHasModelKey()
      re.newDoms.push({
        templateName: dom.getTemplateName(),
        createList: dom.getCreateList(),
        updateList: dom.getUpdateList(),
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
