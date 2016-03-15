
import {extend, each, pick, uniq} from 'lodash'
import {OriginNode} from './origin'
import {wrap} from '../parsers'

export class BasicNode extends OriginNode implements INode {
  id = 0
  name = 'Template_0'
  isTemplate = false

  previous: BasicNode
  next: BasicNode
  parent: BasicNode
  origin: IOriginNode

  attributes = new Map<string, string>()
  arguments = new Array<string>()
  dependencies = new Map<string, string>()
  expressions = new Array<BasicNode>();
  children = new Array<BasicNode>()

  private valueId = 0

  constructor (origin?: IOriginNode) {
    super()
    this.origin = origin
    if (!origin) return this

    let props = [
      'nodeType',
      'nodeName',
      'source',
      'html',
      'tail'
    ]
    extend(this, pick(origin, props))
  }

  parse () {
    // to be override
  }
  setIndex (index: number) {
    this.id = index
    this.name = 'Template_' + this.id
  }
  addDependency (variable: string, path: string) {
    let root = this.getRoot()
    root.dependencies.set(variable, path)
  }
  getArguments () {
    let args = this.arguments
    let last = this.getLastTemplate()
    if (last) {
      args = last.getArguments().concat(args)
    }
    return uniq(args)
  }
  getCreateList () {
    let results: (string | ICreate)[] = []
    each(this.children, (child) => {
      let tmp = child.create()
      if (tmp) results.push(tmp)

      if (!child.isTemplate) {
        results = results.concat(child.getCreateList())
      }
    })
    return results.filter(item => {
      if (typeof item === 'string') {
        return !!item.trim()
      }
      return true
    })
  }

  protected checkRoot () {
    let parent = this.parent
    if (!parent) return true
    if (parent.id === 0) return true
    if (parent.isTemplate) return true
    return false
  }

  protected addArguments (...list: string[]) {
    let args = this.arguments
    each(list, (item) => {
      if (args.indexOf(item) < 0) {
        args.push(item)
      }
    })
  }

  protected getLastTemplate () {
    if (!this.parent) return null

    let root = this.parent
    while (root.parent && !root.isTemplate) {
      root = root.parent
    }
    return root
  }
  protected getRoot () {
    let root: BasicNode = this
    while (root.parent) {
      root = root.parent
    }
    return root
  }
  protected createFunction (expression: string, isIncludeSelf?: boolean) {
    let argExps: string[]
    if (isIncludeSelf === false) {
      argExps = this.parent.getArguments().map((arg, index) => {
        return `var ${arg} = _args[${index}];`
      })
    } else {
      argExps = this.getArguments().map((arg, index) => {
        return `var ${arg} = _args[${index}];`
      })
    }

    return `function (it, _args) {
      ${argExps.join('\n')}

      ${expression}
    }`
  }
  protected getValueSet (valueResult: IValueResult, updateExp: string, updateArgs: string[]) {
    const patches: string[] = []
    const updates: string[] = []
    if (!valueResult.isDynamic) return {patches, updates}

    const valueId = this.getValueId()
    const dynamicValues: {expression: string, pipes: string[][]}[] = []
    each(valueResult.values, value => {
      if (typeof value !== 'string') dynamicValues.push(value)
    })

    if (dynamicValues.length === 1) {
      const value = dynamicValues[0]
      patches.push(`_patches[${valueId}] = ${value.expression};`)

      const pipes: string[] = []
      each(value.pipes, pipe => {
        const args = pipe.slice(0)
        const method = args.shift()
        args.unshift('_tmp')
        pipes.push(`_tmp = ${method}(${args.join(', ')});`)
      })
      updates.push(`
        var _tmp = _patches[${valueId}];
        if (_cache(${valueId}, _tmp)) {
          ${pipes.join('\n')}
          ${updateExp}(${updateArgs.join(', ')}, ${this.translateValue(valueResult, dynamicValues)});
        }
      `)
    } else if (dynamicValues.length > 1) {
      const exps = dynamicValues.map(item => item.expression)
      patches.push(`_patches[${valueId}] = [${exps.join(', ')}];`)

      const pipes: string[] = []
      each(dynamicValues, (value, valueIndex) => {
        pipes.push(`var _value${valueIndex} = _tmp[${valueIndex}];`)
        each(value.pipes, pipe => {
          const args = pipe.slice(0)
          const method = args.shift()
          args.unshift(`_value${valueIndex}`)
          pipes.push(`_value${valueIndex} = ${method}(${args.join(', ')});`)
        })
      })
      updates.push(`
        var _tmp = _patches[${valueId}];
        if (_cache(${valueId}, _tmp)) {
          ${pipes.join('\n')}
          ${updateExp}(${updateArgs.join(', ')}, ${this.translateValue(valueResult, dynamicValues)});
        }
      `)
    }
    return {patches, updates}
  }
  protected createEventFunction (expression: string) {
    let argExps = this.getArguments().map((arg, index) => {
      return `var ${arg} = _args[${index}];`
    })

    return `function ($event, it, _args) {
      ${argExps.join('\n')}

      ${expression}
    }`
  }
  protected create (): string | ICreate {
    // to be override
    return ''
  }

  protected getValueId () {
    let last = this.getLastTemplate()
    if (last) {
      return last.valueId++
    } else {
      return this.valueId++
    }
  }
  protected translateValue (valueResult: IValueResult, dynamicValues: {expression: string, pipes: string[][]}[]) {
    let results: string[] = []
    each(valueResult.values, item => {
      if (typeof item === 'string') {
        results.push(wrap(item))
      } else {
        if (dynamicValues.length === 1) {
          results.push(`_tmp`)
        } else {
          results.push(`_value${dynamicValues.indexOf(item)}`)
        }
      }
    })
    return results.join(' + ')
  }
}
