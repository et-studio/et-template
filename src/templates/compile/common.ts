
import {wrap} from '../../parsers'
import {template} from './template'

export function common (node: INode, options: IOptions) {
  let requires = []
  node.dependencies.forEach((path, name) => {
    let pathStr = wrap(path)
    requires.push(`var ${name} = require(${pathStr});`)
  })

  let tpName = node.name
  return `
    'use strict'

    ${requires.join('\n')}

    ${template(node)}

    module.exports = ${tpName};
  `
}
