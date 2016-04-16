
import {each} from 'lodash'
import {BasicNode} from './basic'
import {fillTo, addMapToMap} from '../util'
import {IfNode} from './if'
import {wrap, parseAttributes, parseValue} from '../parsers'

export class ElementNode extends BasicNode {
  nodeType = 1
  namespace = 'element'
  outputs = new Map<string, string>()
  events = new Map<string, {expression: string, args: string[]}>()
  attributes = new Map<string, string>()

  parse () {
    this.attributes = parseAttributes(this.source)
    each(this.expressions, (node) => {
      if (node instanceof IfNode) {
        addMapToMap(this.attributes, parseAttributes(node.getExpressionSource()))
      }
    })
  }
  addOutput (prop: string, expression: string) {
    this.outputs.set(prop, expression)
  }
  addEvent (name: string, expression: string, args: string[]) {
    this.events.set(name, {expression, args})
  }

  protected create (): string | ICreate {
    const args: (string | number)[] = [this.parent.id, this.id, wrap(this.nodeName.toUpperCase())]

    const attrs = this.createAttributes()
    if (attrs) args.push(attrs)

    if (this.events.size || this.outputs.size) {
      fillTo(args, 4, 0)
      args.push(this.createEvent())
    }

    const create = `_dep.element(_template, ${args.join(', ')});`
    const set = this.calculateDynamic()
    if (set.patch) {
      return {create, patch: set.patch, update: set.update}
    } else {
      return create
    }
  }

  private createAttributes () {
    const attrs: string[] = []
    this.attributes.forEach((value, name) => {
      const valueResult = parseValue(value)
      if (!valueResult.isDynamic) {
        attrs.push(`[${wrap(name)}, ${wrap(value)}]`)
      }
    })

    if (attrs.length) {
      return `[${attrs.join(',\n')}]`
    } else {
      return ''
    }
  }
  private calculateDynamic () {
    const patches: string[] = []
    const updates: string[] = []

    const conditionSet = this.calculateConditions()
    if (conditionSet.patch) patches.push(conditionSet.patch)
    if (conditionSet.update) updates.push(conditionSet.update)

    this.attributes.forEach((value, key) => {
      const valueResult = parseValue(value)
      if (valueResult.isDynamic) {
        const args = ['_template', this.id.toString(), wrap(key)]
        const set = this.getValueSet(valueResult, '_dep.updateAttr', args)
        if (set.patches.length) patches.push(set.patches.join('\n'))
        if (set.updates.length) updates.push(set.updates.join('\n'))
      }
    })
    return {patch: patches.join('\n'), update: updates.join('\n')}
  }
  private calculateConditions () {
    if (this.expressions.length <= 0) {
      return {patch: '', update: ''}
    }

    const patches: string[] = []
    const updates: string[] = []
    const valueId = this.getValueId()
    each(this.expressions, (node, index) => {
      if (node instanceof IfNode) {
        const matrix: string[] = []
        patches.push('var _conditions = [];')
        each(node.getExpressions(), (item, itemIndex) => {
          if (item.tag) {
            patches.push(`${item.tag} (${item.condition}) _conditions[${index}] = ${itemIndex};`)
          } else {
            patches.push(`else _conditions[${index}] = ${itemIndex};`)
          }
          matrix.push(`[${item.attrs.map(attr => wrap(attr)).join(', ')}]`)
        })
        patches.push(`_patches[${valueId}] = _conditions;`)

        updates.push(`
          var _matrix${index} = [${matrix.join(', ')}];
          _dep.concatMatrix(_includes, _matrix${index}, _tmp[${index}]);
          _dep.concatMatrixOthers(_excludes, _matrix${index}, _tmp[${index}]);
        `)
      }
    })

    const update = `
      var _tmp = _patches[${valueId}];
      if (_cache(${valueId}, _tmp)) {
        var _includes = [];
        var _excludes = [];
        ${updates.join('\n')}
        _dep.setAttributesCondition(_template, ${this.id}, _includes, _excludes);
      }
    `
    return {patch: patches.join('\n'), update}
  }
  private createEvent () {
    let events: string[] = []
    this.events.forEach((event, type) => {
      let typeStr = wrap(type)
      let fnStr = this.createEventFunction(`return ${event.expression}(${event.args.join(', ')});`)
      events.push(`[${typeStr}, ${fnStr}]`)
    })
    if (this.outputs.size) {
      let outputs: string[] = []
      this.outputs.forEach((output, key) => {
        outputs.push(`${output} = this.${key};`)
      })
      events.push(`['change input', ${this.createEventFunction(outputs.join('\n'))}]`)
    }
    return `[${events.join(',\n')}]`
  }
}
