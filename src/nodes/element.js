'use strict'

import Basic from './basic'

import _ from '../util'
import worker from '../worker'
import elementParser from '../parsers/element'
import valueParser from '../parsers/value'
import conditionParser from '../parsers/condition'

var ET_MODEL = 'et-model'

class Element extends Basic {
  constructor (source, options = {}) {
    super(source, options)
    this.nodeType = 1
    this.expressions = []
    this.parseExpresions(options.expressions)
  }
  parse (source) {
    var tinyNode = elementParser.parse(source, this.options)
    this.modelKey = tinyNode.attributes[ET_MODEL]
    if (this.modelKey) {
      var isObject = this.options.modelType === 'object'
      var isMiddleBrackets = this.modelKey[0] !== '[' &&
      this.modelKey[this.modelKey.lenth - 1] !== ']'

      if (isObject && !isMiddleBrackets) {
        this.modelKey = '.' + this.modelKey
      }
    }

    if (this.modelKey) delete tinyNode.attributes[ET_MODEL]
    this.attributes = tinyNode.attributes
    this.nodeName = tinyNode.nodeName
  }
  parseExpresions (expressions) {
    var newExpressions = []
    var _this = this
    _.each(expressions, (expression) => {
      if (expression.children.length === 1) {
        var items1 = _this.parseSingleExpresion(expression)
        if (items1.length) newExpressions.push(items1)
      } else if (expression.children.length > 1) {
        var items2 = _this.parseMultipleExpresion(expression)
        if (items2.length) newExpressions.push(items2)
      }
    })
    this.expressions = newExpressions
  }
  parseSingleExpresion (expression) {
    var items = []
    var child = expression.children[0]
    var source = (child && child.source) || ''
    var tinyNode = elementParser.parse(`<div ${source}>`, this.options)
    var conditionNode = conditionParser.parse(expression.source)

    if (!_.isEmpty(tinyNode.attributes)) {
      items.push({
        tag: 'if',
        condition: conditionNode.condition,
        attributes: tinyNode.attributes
      })
      items.push({
        tag: 'else',
        exclusions: Object.keys(tinyNode.attributes)
      })
    }
    return items
  }
  parseMultipleExpresion (expression) {
    var items = []
    var hasElse = false
    var allAttributes = {}

    var source = null
    var tinyNode = null
    var conditionNode = conditionParser.parse(expression.source)
    _.each(expression.children, (child, i) => {
      if (i % 2) {
        conditionNode = conditionParser.parse(child.source)
      } else {
        source = (child && child.source) || ''
        tinyNode = elementParser.parse(`<div ${source}>`)
        _.extend(allAttributes, tinyNode.attributes)

        if (conditionNode.tag === 'else') hasElse = true
        items.push({
          tag: conditionNode.tag,
          condition: conditionNode.condition,
          attributes: tinyNode.attributes
        })
      }
    })
    _.each(items, (item) => {
      item.exclusions = Object.keys(_.omit(allAttributes, item.attributes))
    })
    if (!hasElse) {
      items.push({
        tag: 'else',
        exclusions: allAttributes
      })
    }
    return items
  }
  deliverCreate () {
    var it = {
      id: this.getId(),
      isRoot: this.checkRoot(),
      parentId: this.getParentId(),
      nodeName: this.getNodeName(),
      attributes: this.getAttributesMap(),
      modelKey: this.modelKey,
      modelType: this.options.modelType
    }
    return [worker.createElement(it)]
  }
  getAttributesMap () {
    var re = {}
    var isEmpty = true
    var attrs = this.attributes
    for (var key in attrs) {
      var value = attrs[key]
      if (!valueParser.isErratic(value)) {
        re[key] = value
        isEmpty = false
      }
    }
    if (isEmpty) {
      return null
    } else {
      return re
    }
  }
  deliverUpdate () {
    var it = {
      id: this.getId(),
      erraticAttributes: this.getErraticAttributes(),
      expressions: this.translateExpressions()
    }
    return [worker.updateAttributes(it)]
  }
  getErraticAttributes () {
    var attrs = this.attributes
    var erracticMap = {}
    for (var key in attrs) {
      var value = attrs[key]
      if (valueParser.isErratic(value)) {
        erracticMap[key] = value
      }
    }
    return this.translateAttributesToExpressions(erracticMap)
  }
  translateExpressions () {
    var re = []
    var _this = this
    _.each(this.expressions, (items) => {
      var newItems = []
      var valueId = _this.getRootValueId()
      _.each(items, (item) => {
        var obj = _.pick(item, 'tag', 'exclusions', 'condition')
        obj.valueId = valueId
        obj.attributes = _this.translateAttributesToExpressions(item.attributes)
        newItems.push(obj)
      })
      re.push(newItems)
    })
    return re
  }
  translateAttributesToExpressions (attrs) {
    var re = []
    for (var key in attrs) {
      var value = attrs[key]
      var tmp = {
        key: key,
        isErratic: valueParser.isErratic(value),
        value: value,
        valueString: valueParser.parse(value)
      }
      if (tmp.isErratic) {
        tmp.valueId = this.getRootValueId()
      }
      re.push(tmp)
    }
    return re
  }
  hasModelKey () {
    return !!this.modelKey
  }
}

export default Element
