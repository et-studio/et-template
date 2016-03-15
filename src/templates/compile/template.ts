
import {each} from 'lodash'
import {eachNode} from '../../util'
import {parseDep} from '../../parsers'
import {ForNode} from '../../nodes/for'

export function template (node: INode) {
  let rs: string[] = []
  pickTemplates(node).forEach((node) => {
    const templateName = node.name
    const createList = node.getCreateList()
    const argExps = node.getArguments().map((arg, index) => {
      return `var ${arg} = _args[${index}];`
    })
    const creates: string[] = []
    const patches: string[] = []
    const updates: string[] = []
    each(createList, item => {
      if (typeof item === 'string') {
        creates.push(item)
      } else {
        if (item.create) creates.push(item.create)
        if (item.patch) patches.push(item.patch)
        if (item.update) updates.push(item.update)
      }
    })
    const fns: string[] = []
    fns.push(`function (_template) { ${creates.join('\n')}}`)
    if (patches.length) {
      fns.push(`function (it, _args) {
        ${argExps.join('\n')}

        var _patches = [];
        ${patches.join('\n')}
        return _patches;
      }`)
    }
    if (updates.length) {
      fns.push(`function (_template, it, _args, _patches, _cache) {
        ${argExps.join('\n')}

        ${updates.join('\n')}
      }`)
    }
    rs.push(`var ${templateName} = _dep.template(${fns.join(', ')});`)
  })

  return parseDep(rs.join('\n'))
}

function pickTemplates (node: INode) {
  let results: INode[] = []
  eachNode(node, (item) => {
    if (!item.parent || item.isTemplate) {
      results.push(item)
    }
  })
  return results
}