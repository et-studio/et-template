
import {wrap} from '../../parsers'
import {template} from './template'

export function global (node: INode, options: IOptions) {
  let requires = []
  node.dependencies.forEach((path, name) => {
    let pathStr = wrap(path)
    requires.push(`var ${name} = global[${pathStr}];`)
  })

  let moduleId = options.moduleId
  let tpName = node.name
  return `
    ;(function(global){
      ${requires.join('\n')}

      ${template(node)}

      global['${moduleId}'] = ${tpName};
    })(window);
  `
}
