'use strict'

import Basic from './basic-middleware'
import worker from '../worker'

class MiddlewareCompiler extends Basic {
  run (node, options) {
    var it = this.pickData(node, options)
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
  pickData (root, options) {
    var dependencies = root.getDependencies()
    dependencies.push({
      name: options.dependencyName,
      path: options.dependencyPath
    })
    return {
      templateName: root.getTemplateName(),
      dependencies: dependencies,
      moduleId: options.moduleId,
      newDoms: root.getNewTemplateDoms()
    }
  }
}
export default new MiddlewareCompiler()
