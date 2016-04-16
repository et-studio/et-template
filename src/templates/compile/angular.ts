
import {wrap} from '../../parsers'
import {template} from './template'

export function angular (node: INode, options: IOptions) {
  let paths = []
  let args = []
  node.dependencies.forEach((path, name) => {
    paths.push(wrap(path))
    args.push(name)
  })

  let moduleId = options.moduleId
  let tpName = node.name
  let pathStr = paths.join(', ')
  let argsStr = args.join(', ')
  return `
    angular.module('et.template').factory('${moduleId}', [${pathStr}, function(${argsStr}) {
      ${template(node)}

      return function (option) {
        return new ${tpName}(option);
      }
    }]);
  `
}
