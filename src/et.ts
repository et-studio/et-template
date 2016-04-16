
import {pick, extend} from 'lodash';
import {parseOrigin} from './parsers'
import {create as createNode} from './middlewares/node-creator'
import {translate as translateAttributes} from './middlewares/attributes-translator'
import {rebuild as rebuildNode} from './middlewares/node-rebuilder'
import {check as checkNode} from './middlewares/node-checker'
import {compile as compileNode} from './middlewares/node-compiler'
import {format as formatResult} from './middlewares/node-formatter'
import {eachNode} from './util'

const PROP_LIST = ['modules', 'depName', 'depPath']
const PROP_DEFAULT = {
  modules: 'common', // ['common', 'cmd', 'amd', 'global', 'angular']
  depName: '_dep',
  depPath: 'et-dependency',
  moduleId: 'Template'
}

export function compile (source: string, options: IOptions) {
  options = extend({}, PROP_DEFAULT, options)

  // parse string to origin node tree
  let origin = parseOrigin(source)

  // handle node tree
  let root = createNode(origin, options)
  eachNode(root, node => node.parse())
  root.addDependency(options.depName, options.depPath)
  root = translateAttributes(root)
  root = rebuildNode(root)
  root = checkNode(root)

  // handle string
  let result = compileNode(root, options)
  result = formatResult(result)

  return result
}
