
import {wrap} from '../../parsers'
import {template} from './template'

export function amd (node: INode, options: IOptions) {
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
    ;define('${moduleId}', [${pathStr}], function(${argsStr}){
      ${template(node)}

      return ${tpName};
    });
  `
}