
import * as compiler from '../templates/compile'

export function compile (root: INode, options: IOptions) {
  switch (options.modules) {
    case 'angular':
      return compiler.angular(root, options)
    case 'cmd':
      return compiler.cmd(root, options)
    case 'amd':
      return compiler.amd(root, options)
    case 'global':
      return compiler.global(root, options)
    default:
      return compiler.common(root, options)
  }
}
