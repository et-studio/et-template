'use strict'

import Basic from './basic'
import _ from '../util'
import worker from '../worker'
import conditionParser from '../parsers/condition'

var NODE_NAME = '#if'
var TAG = 'if'

var createExpression = (tag, condition, startIndex, endIndex, appendList, updateList, removeList) => {
  return {
    tag: tag,
    condition: condition || '',
    startIndex: startIndex || 0,
    endIndex: endIndex || 0,
    appendList: appendList || [],
    updateList: updateList || [],
    removeList: removeList || []
  }
}

class IfNode extends Basic {
  constructor (source, options) {
    super(source, options)
    this.nodeName = NODE_NAME
  }
  parse (source) {
    var tmp = conditionParser.parse(source, {expectNodeName: NODE_NAME})
    this.condition = tmp.condition
  }
  init () {
    // first check format
    var lastNodeName = this.nodeName
    var checkHandler = (dom, i) => {
      if (lastNodeName === '#else' && dom.nodeName === '#elseif') {
        this.throwError('The elseif node shouldn\'t show after else.')
      }
      lastNodeName = dom.nodeName
    }
    _.each(this.children, checkHandler)

    // second index the expressions
    var hasElse = false
    var expressions = []
    var expression = createExpression(TAG, this.condition)
    expressions.push(expression)

    var indexHandler = (dom, i) => {
      if (dom.nodeName === '#elseif' || dom.nodeName === '#else') {
        var tag = dom.nodeName.substr(1)
        if (tag === 'elseif') tag = 'else if'
        else hasElse = true

        expression = createExpression(tag, dom.condition, i, i)
        expressions.push(expression)
      }
      if (dom.nodeName !== '#elseif' && dom.nodeName !== '#else') {
        expression.endIndex++
      }
    }
    _.each(this.children, indexHandler)
    if (!hasElse) expressions.push(createExpression('else', '', 0, 0))

    // third get the worker list
    var _this = this
    var workerHander = (expression) => {
      var exclusions = _this.children.filter(() => { return true })
      var inclusions = exclusions.splice(expression.startIndex, expression.endIndex)

      _.each(inclusions, (dom) => {
        _.concat(expression.appendList, dom.deliverAppend())
        _.concat(expression.updateList, dom.deliverUpdate())
      })
      _.each(exclusions, (dom) => {
        _.concat(expression.removeList, dom.deliverRemove())
      })
    }
    _.each(expressions, workerHander)

    this.ifExpressions = expressions
  }

  getIfExpressions () {
    return this.ifExpressions
  }
  getIfValueId () {
    var valueId = this._valueId
    if (valueId >= 0) return valueId

    valueId = this._valueId = this.getRootValueId()
    return valueId
  }
  assembleWorkerData () {
    var it = this._workerData
    if (it) return it

    this._workerData = it = {
      id: this.getId(),
      lineId: this.getLineId(),
      parentId: this.getParentId(),
      valueId: this.getIfValueId(),
      isRoot: this.checkRoot(),
      expressions: this.getIfExpressions()
    }
    return it
  }
  deliverCreate () {
    var results = this.getChildrenCreate()
    var it = this.assembleWorkerData()
    var tmp = worker.if_create(it)
    if (tmp) results.unshift(tmp)
    return results
  }
  deliverAppend () {
    var results = []
    var it = this.assembleWorkerData()
    var tmp = worker.if_append(it)
    if (tmp) results.unshift(tmp)
    return results
  }
  deliverUpdate () {
    var it = this.assembleWorkerData()
    return [worker.if_update(it)]
  }
  deliverRemove () {
    var it = this.assembleWorkerData()
    if (it.isRoot) {
      return [worker.if_remove(it)]
    } else {
      return []
    }
  }
}
export default IfNode
