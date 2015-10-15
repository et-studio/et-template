'use strict'

import worker from './worker'

class Compiler {
  constructor (options) {
    this.options = options
  }
  pickData (root) {
    var options = this.options
    var dependencies = root.getDependencies()
    dependencies.unshift({
      name: options.dependencyName,
      path: options.dependencyPath
    })
    return {
      templateName: root.getTemplateName(),
      dependencies: dependencies,
      angularModuleName: options.angularModuleName,
      modelType: options.modelType,
      newDoms: root.getNewTemplateDoms()
    }
  }
  compile (dom) {
    var options = this.options
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
