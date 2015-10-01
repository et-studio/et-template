'use strict'

import _ from './util'
import worker from './worker'

class Compiler {
  pickData (root, options) {
    var re = {
      moduleId: options.moduleId,
      dependency: options.dependency,
      angularModuleName: options.angularModuleName,
      modelType: options.modelType,
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
  compile (dom, options) {
    var it = this.pickData(dom, options)
    switch (options.modules) {
      case 'angular':
        return worker.compile_angular(it)
      case 'cmd':
        return worker.compile_cmd(it)
      case 'amd':
        return worker.compile_amd(it)
      case 'global':
        return worker.compile_global(it)
      default:
        return worker.compile_common(it)
    }
  }
}

export default Compiler
