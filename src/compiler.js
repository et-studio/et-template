'use strict'

import worker from './worker'

class Compiler {
  constructor (options) {
    this.options = options
  }
  pickData (root, compileOptions) {
    var options = this.options
    var dependencies = root.getDependencies()
    dependencies.unshift({
      name: options.dependencyName,
      path: options.dependencyPath
    })
    return {
      templateName: root.getTemplateName(),
      dependencies: dependencies,
      moduleId: compileOptions.moduleId,
      angularModuleName: compileOptions.angularModuleName,
      modelType: options.modelType,
      newDoms: root.getNewTemplateDoms()
    }
  }
  compile (dom, compileOptions) {
    var options = this.options
    var it = this.pickData(dom, compileOptions)
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
